const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const zod = require("zod");
var cors = require('cors');
const jwtpass = "123"
 app.use(cors());
 async function poo(){
    await mongoose.connect('mongodb+srv://paras027:paras1032@cluster0.s2rwujw.mongodb.net/Paytm');
    console.log("connected")
 }
 poo();

const data = mongoose.model('users', { fname: String, lname: String, password: String });
const account = mongoose.model('Paytm',{userId: String, money: Number}, 'Paytm');

const z = zod.object({
    fname: zod.string(),
    lname: zod.string(),
    password: zod.string(),
})

app.post("/signup", async function (req, res) {
    const {fname,lname,password} = req.body;
    const {success} = z.safeParse({fname, lname,password});

    if(!success)
    {
        return res.status(411).json({
            message:"Inputs Invalid"
        })
    }
    const val = new data({ fname: fname, lname: lname, password: password })

    const check = await data.findOne({ fname: fname });
    if(check)
    {
        return res.status(411).json({
            message:"Already there"
        })
    }

    val.save();
    const idd = val._id;
    const gg = new account({userId:idd,money:500});
    gg.save();
    const token = jwt.sign({ idd }, jwtpass);
    res.json({
        token,
        message: "User Created",
        gg,
    });
});


app.post("/signin", async (req, res) => {
    const user = await data.findOne({
        fname: req.body.fname,
        lname:req.body.lname,
        password: req.body.password
    });

    if (user) {
        const idd = user._id
        const token = jwt.sign({
            idd
        }, jwtpass);
  
        return res.json({
            token: token
        })
        
    }
    return res.status(411).json({
        message: "Error while logging in"
    })
})

app.get('/getbalance', async function (req, res) {
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, jwtpass);
        const datagot = await account.findOne({
            userId: decode.idd
        });

        return res.json({money:datagot.money});
    }
    catch (err) {
        console.log("not happening");
    }
})
app.put("/addmoney",async function(req,res){
    const tok = req.headers.authorization;
    try {
        console.log(req.body.money);
        const decode = jwt.verify(tok, jwtpass);
        console.log("d1");
        const datagot = await account.findOne({
            userId: decode.idd
            
        });
        console.log("d2");
        console.log(datagot)
        console.log(typeof(datagot))
        console.log(typeof(req.body.money))
        const updatedUser = await account.findByIdAndUpdate(
            datagot._id, 
            { money:datagot.money+req.body.money },
            { new: true } // Return the updated document
          );
        console.log(updatedUser)
        return res.json({money:updatedUser.money});
    }
    catch (err) {
        console.log(err.message);
    }
})
app.put("/sendmoney",async function(req,res){
    const tok = req.headers.authorization;
    const idd = req.body.to;
    try {
        console.log(req.body.money);
        const decode = jwt.verify(tok, jwtpass);
        if(decode){
        console.log("d1");
        const datagot = await account.findOne({
            userId: idd
            
        });
        const mainidguymoney = await account.findOne({
            userId: decode.idd
        });
        const updatedtmainuser = await account.findByIdAndUpdate(
            mainidguymoney._id, 
            { money:mainidguymoney.money-req.body.money },
            { new: true } // Return the updated document
          );
        console.log("d2");
        console.log(datagot)
        console.log(typeof(datagot))
        console.log(typeof(req.body.money))
        const updatedUser = await account.findByIdAndUpdate(
            datagot._id, 
            { money:datagot.money+req.body.money },
            { new: true } // Return the updated document
          );
        console.log(updatedUser)
        return res.json({money:updatedUser.money,money2:updatedtmainuser.money});
        }
        else
        {
            return res.status(411).json({
                message:"Not Authorized"
            })
        }
    }
    catch (err) {
        console.log(err.message);
    }
})
app.put("/update", async function (req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const password = req.body.password;

    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, jwtpass);
        const datagot = await data.findOne({
            _id: decode.idd
        });
        const updatedUser = await data.findByIdAndUpdate(
            datagot._id, 
            { fname:firstname, lname:lastname, password:password },
            { new: true } // Return the updated document
          );
      
        res.send(updatedUser);
    }
    catch (err) {
        console.log("not happening");
    }
});

app.get('/getperson',async (req, res) => {
    const namee = req.query.filter;
    console.log(namee)
    const vall = await data.find({
        $or: [{
            fname: {
                "$regex": namee
            }
        }, {
            lname: {
                "$regex": namee
            }
        }]
    })
    
    return res.json({
        user: vall.map(user => ({
            fname: user.fname,
            lname: user.lname,
            _id: user._id
        }))
    })
});

app.put('/transaction',async (req, res) => {
    const to = req.body._id;
    const tok = req.headers.authorization;
    const amount = req.body.amount;
    try {
        const decode = jwt.verify(tok, jwtpass);
        const datagot = await account.findOne({
            userId: decode.idd
        });

        if(amount >datagot.money) {
            return res.json({ nessage:"Not enough money"});
        }
        const updatedUser = await account.findByIdAndUpdate(
            datagot._id, 
            { money:datagot.money-amount},
            { new: true } // Return the updated document
          );
          
          const updatedUser2 = await account.findByIdAndUpdate(
            to ,
            { money:datagot.money+amount},
            { new: true } // Return the updated document
          );

        res.json({
            updatedUser,
            updatedUser2
        })
    }
    catch (err) {
        console.log("not happening");
    }
});

app.listen(5000,"www.parasjodd.com", () => {
    console.log(`Server is running on http://www.parasjodd.com:${PORT}`);
});

