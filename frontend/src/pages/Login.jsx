import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login({handleLogin}){
    const [fname, setFname] = React.useState('');
    const [lname, setLname] = React.useState('');
    const [password, setPassword] = React.useState('');
const navigate = useNavigate();
return (<div>
    <div className='flex bg-teal-200 h-20 p-4'>
  <div className=" flex  justify-center items-center  mx-auto">
  <div className="text-4xl  font-bold ">PayingUp</div>
  </div>
  </div>
  <div className='flex flex-col  items-center p-10'>
  <div className='text-4xl font-semibold'>Login</div>
  <div className='text-gray-500 text-md pt-2'>Already have an account</div>
  <br></br>
  <input type="text" className='border-dotted border-black border-2 rounded-lg w-64 h-15 p-2' placeholder='FirstName' onChange={e => {
    setFname(e.target.value);
  }} />
<br></br>
<input type="text" className='border-dotted border-black border-2 rounded-lg w-64 h-15 p-2' placeholder='LastName' onChange={e => {
    setLname(e.target.value);
  }}/>
<br></br>
<input type="password" className='border-dotted border-black border-2 rounded-lg w-64 h-15 p-2' placeholder='Password' onChange={e => {
    setPassword(e.target.value);
  }}/>
<br></br>
<button className='bg-teal-200 rounded-lg text-2xl font-mono px-5 py-1' onClick={async function(){
    const resp = await axios.post("https://payingup.onrender.com/signin",{fname,lname,password});
    console.log(resp);
    const mm = localStorage.setItem("token", resp.data.token)
    handleLogin(mm);
    navigate('/dashboard');
    console.log("logged in");
}}>Login</button>
<br></br>
<div className='flex '>
<div >Don't have an account?</div>
<div className='pl-3'onClick={()=>{navigate('/signup')}}> SignUp</div>
</div>
  </div>
    </div>)
}

export default Login;