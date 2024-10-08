import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
export default function Homepage() {

  const usenav=useNavigate();
  const suggestions=["mobile","cameras","laptops","smartwatches","headsets","tablets","speakers"];
  const [searchdata, setSearchdata] = useState("");
  const [keynav, setKeynav] = useState(-1);
  const [tonav, setTonav] = useState("");
  const onsearch=(a)=>{
    setSearchdata(a.target.value);
  }

  useEffect(() => {
    var tostore= suggestions.filter(items=> items.startsWith(searchdata));
    setTonav(tostore);
  }, [searchdata])
  
  
  const handlekey=(a)=>{
    if(searchdata.length>0){
      if(a.key==="ArrowDown" && keynav<tonav.length-1){
        setKeynav(keynav+1);
      }
      else if(a.key==="ArrowUp" && keynav>0){
        setKeynav(keynav-1);
      }
      else if(a.key==="Enter" && keynav>=0){
        usenav(`/products/${tonav[keynav]}`);
      }
      else if(a.key==="Enter" && keynav<0){
        for(var i=0;i<suggestions.length;i++){
          var var1=suggestions[i];
          var var2=searchdata.toLowerCase();
          if(var1===var2){
            usenav(`/products/${suggestions[i]}`);
          }
        }
      }
      else if(a.key==="Backspace"){
        setKeynav(-1);
      }
    }
  }

  return (
    <div>
      <div id='homepage_main'>
        <p>WELCOME EXPLORE AND COMPARE YOUR DESIRED ELECTRONICS</p>
        <div id='search_main'>
          <div id='search'>
            <div className='search_bar'>
              <span id='search_icon'><IoSearch /></span>
              <input className='home_input' type='search' placeholder='search' onChange={onsearch} onKeyDown={handlekey} value={searchdata}/>
            </div>
            <div id='suggest'>
              {
                searchdata &&
              suggestions.filter(items=> items.startsWith(searchdata)).map((items,index)=><>
              <Link id='items' to={`/products/${items}`}><div id={index===keynav?"item2":"item1"} key={index}>{items}</div></Link>
              </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};


