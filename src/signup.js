import axios from 'axios'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Projectsign() {
  const usenav=useNavigate();
 const [data,setdata]=useState(
    {username:'',email:'',password:''}
 )
 const handler=(g)=>{
    const{name,value}=g.target
    setdata((prevState)=>(
        ({...prevState,[name]:value})
    ))
 }

 const submit=()=>{
    const user={Username:data.username,Email:data.email,Password:data.password}
    if(user.Username!=='' && user.Email!=='' && user.Password!==''){
      axios.post('http://localhost:8000/signup',user).then((res)=>{
        if (res.data==="no err") {
          usenav('/');
          localStorage.setItem("username",data.username);
          localStorage.setItem('email',data.email);
        }
        else{
          alert("user already exist !!");
        }
      })
    }
    else{
        alert('please fillout all the fields !!')
    }
   } 

  const [password,setpassword]=useState('Password')
  const change=()=>{
    if(password==='Password'){
      setpassword('text')
    }
    else{
      setpassword('Password')
    }
  }
    
  return (
    <div>
      <section>
        <div id='signup_main'>
            <h2>SIGN-UP</h2>
            <input onChange={handler} id='input1' className='input' type='text' placeholder='Username' name='username'/><br/>
            <input onChange={handler} id='input2' className='input' type='email' placeholder='Email' name='email'/><br/>
            <input onChange={handler} id='input3' className='input' type={password} placeholder='Password' name='password'/><input id='signup_check' onClick={change} type="checkbox" name='checkbox'/><br/>
            <button id='signup_btn' onClick={submit}>SIGN UP</button>
        </div>
      </section>
    </div>
  )
}