import React from 'react'
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard({handleLogout}) {
  const navigate = useNavigate();
  const [wallmoney,setWallmoney] = useState(0);
  const [value,setValue] = useState(0);
  const [boxv,setBoxv] = useState(0);
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    async function getdaa(){
    const res =  await axios.get("https://payingup.onrender.com/getbalance",{
      headers: {
        "Content-Type": "application/json",
        'Authorization': authToken,
      }
    })
    console.log(res.data.money);
    console.log(value);
    setWallmoney(res.data.money);
  }
  getdaa();
  },[value]);

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  return( 
  <div>
  <div className='flex bg-teal-200 h-20 p-4'>
  <div className=" flex justify-center items-center  mx-auto">
  <div className="text-4xl  font-bold ">PayingUp</div>
  </div>
  <div className='flex justify-end space-x-4'>
  <div className='text-3xl font-serif pt-2'>Rs</div>
  <div className='text-3xl font-serif pt-1'>{wallmoney}</div>
  <div className="text-4xl justify-self-end font-bold "><FontAwesomeIcon icon={faWallet} /></div>
  <button className="text-4xl justify-self-end font-bold " onClick={()=>{
    lhandleLogout();
     navigate("/login" )}}><FontAwesomeIcon icon={faRightFromBracket}/></button>
  </div>
</div>
<br/>
<div className='flex px-5'>
<input type="number" className='border-dotted border-black border-2 rounded-lg w-64 h-15' onChange={e => {
  setBoxv(e.target.value);}}/>
<button className=' bg-teal-200 rounded-lg text-2xl font-mono px-7 py-1 ml-3' onClick={async function(){
  const res = await axios.put('https://payingup.onrender.com/addmoney',{
    money: parseInt(boxv),
  },
  {headers: {'Content-Type': 'application/json','Authorization': authToken,
}});
  setValue(res.data.money);
  console.log(value);
}}>Add Money</button>
</div>
<br></br>
<div className='ml-5 '>
    <div>Send Money to Users</div>
    <div className='flex'>
    <input type='text' className='border-dotted border-black border-2 rounded-lg w-1/4 h-15 p-2' onChange={(e) => {
      setFilter(e.target.value)
  }}/>
    <button className=' bg-teal-200 rounded-lg text-2xl font-mono px-7 py-1 ml-3' onClick={async function() {
     const resp = await axios.get("https://payingup.onrender.com/getperson?filter=" + filter)
              setUsers(resp.data.user)
        }} >Search</button>
        {console.log(users)}
        <br></br>
        </div>
    {users.map(function(user){
      return(
        <div className="flex justify-between m-5">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.fname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.fname} {user.lname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful bg-teal-200 rounded-lg text-xl font-mono px-2 py-1 ml-3 ">
            <button onClick={function(){
              navigate("/send?id=" + user._id + "&name=" + user.fname+"&val="+wallmoney)
              console.log("chla");
            }} >Send Money</button>
        </div>
    </div>
      )
    })}
    </div>




  </div>
  );
}

export default Dashboard
