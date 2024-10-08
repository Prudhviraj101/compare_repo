import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const usenav=useNavigate();
    const [logindta,setlogindta]=useState({username:"",email:"",password:""});

    const store=(b)=>{
        const {name,value}=b.target;
        setlogindta((prevstate)=>(
            {...prevstate,[name]:value}
        ));
    }

    const gologin=()=>{
        const logindata={username:logindta.username,email:logindta.email,password:logindta.password};
        if(logindta.username!=="" && logindta.password!==""){
            axios.post('http://localhost:8000/weblogin',logindata).then((res)=>{
                if(res.data.length!==0){
                    usenav('/');
                    localStorage.setItem('username',res.data[0].username);
                    localStorage.setItem('email',res.data[0].email);
                }
                else{
                    alert("user didn`t exist !!");
                }
            })
        }
        else{
            alert("please fill all the fields !!");
        }
    }

    const [password,setpassword]=useState('Password');

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
            <div id="login_main">
                <h1 id="login_head">LOGIN</h1>
                <input id="login_usr" placeholder='Username or Email' onChange={store} name='username' type="text"/>
                <input id="login_pwd" placeholder='Password' onChange={store} name='password' type={password}/><input id='login_check' onClick={change} type="checkbox" name='checkbox'/>
                <h3 id="login_fp">forgot password?</h3><br/>
                <button id="login_btn"onClick={gologin}>login</button>
            </div>
        </div>
    );
};
