import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    
  return( 
  <div>
  <div className='flex bg-teal-200 h-20 p-4'>
  <div className=" flex  justify-center items-center  mx-auto">
  <div className="text-4xl  font-bold ">PayingUp</div>
  </div>
  <div className='flex justify-end'>
  <button className='bg-teal-500 rounded-lg text-2xl px-5 py-1' onClick={function(){
    navigate('/signup');
}}>Signup </button>
  </div>
</div>
<div className='flex flex-col  items-center p-28  h-screen '>
<div className='text-9xl text-teal-500 font-bold'>Welcome!</div><br></br>
<div className='text-2xl  font- '>Here You can send and recieve money safely</div>
<div className='text-2xl  font-bold'>with your friends, family and merchants</div>
<button className='btn mt-28 rounded-lg bg-teal-500 text-3xl font-semibold p-4' onClick={function(){
    navigate('/signup');
}}>Get Started</button>
</div>
  </div>
  );
}

export default Home;
