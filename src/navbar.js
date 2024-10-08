import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import weblogo from './weblogo2.png';

export default function Navbar() {
  const usenav=useNavigate();
  const local=()=>{
    localStorage.clear();
    usenav('/');
  }

  const nme=localStorage.getItem('username');
  const eml=localStorage.getItem('email');

  const [css,setcss]=useState('noinfo');
  const info=()=>{
    if(nme!==null){
      setcss('userinfo');
    }
    else{
      setcss('noinfo');
      alert("please login first");
    }
  }
  const noinfo=()=>{
    setcss('noinfo');
  }

  return (
    <div id='navbar_main'>
      <span id='logo'><Link id='logo_link' to={'/'}><img id='weblogo' src={weblogo} alt='weblogo'/></Link></span>
      <div id='list'>
        <ul class="navbar_list">
          <li><Link className='navbar_li' id='nav_hme' to={'/'}>HOME</Link></li>
          {localStorage.getItem('username')==null?<li><Link className='navbar_li' id='nav_sig' to={'signup'}>SIGN-UP</Link></li>:""}
          {localStorage.getItem('username')==null?<li><Link className='navbar_li' id='nav_log' to={'login'}>LOGIN</Link></li>:""}
          <li><Link className='navbar_li' id='nav_cnt' to={'categories'}>CATEGORIES</Link></li>
          {localStorage.getItem('username')!=null?<li onClick={local}><Link className='navbar_li' id='nav_lot' to={'/'}>LOGOUT</Link></li>:""}
        </ul>
      </div>
      <div id='profile'>
        <div id='user' onClick={info} onMouseLeave={noinfo}>
          < CgProfile />
        </div>
        <div id={css}>
          <span>Username : {nme}</span><br/>
          <span>Email : {eml}</span>
        </div>
      </div>
    </div>
  );
};
