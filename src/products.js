import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GrStorage } from "react-icons/gr";
import { FaMicrochip } from "react-icons/fa6";
import { PiBatteryChargingVerticalBold } from "react-icons/pi";
import { CgHomeScreen } from "react-icons/cg";
import { CgRemove } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa6";



export default function Product(){
    const prm=useParams();
    const [dbdata,setDbdata]=useState([]);
    const [kys,setKys]=useState(["",""]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/productdata/${prm.id}`).then((res)=>{
            setDbdata(res.data);
        })
        
    })

    const pdtdata=(models,ids)=>{
        let somevar={...localStorage};
        let lngvar=Object.keys(somevar);

        if(lngvar.length < 2){
            localStorage.setItem(models,ids);
            let somevar2={...localStorage};
            let lngvar2=Object.keys(somevar2);
            setKys(lngvar2);
            if(lngvar2.length>1){
                document.getElementById('comparebtn').style.display="block";
            }
            if(lngvar2.length>0){
                document.getElementById('mobiless').style.display="block";
            }
            if(lngvar2.length>=1){
                document.getElementById('rmv1').style.display="block";
            }
            if(lngvar2.length===2){
                document.getElementById('rmv2').style.display="block";
            }
        }
    }

    const rmvone=()=>{
        localStorage.removeItem(kys[0]);
        document.getElementById("keyname1").innerHTML="";
        document.getElementById("rmv1").style.display="none";
    }

    const rmvtwo=()=>{
        localStorage.removeItem(kys[1]);
        document.getElementById("keyname2").innerHTML="";
        document.getElementById("rmv2").style.display="none";
    }

    const reload=()=>{
        localStorage.clear();
    }

    return(
        <div onLoad={reload}>
            <div id="loop">
                {dbdata.map((todisplay)=><>
                <div id="loopmain">
                    <div id="pdtmain">
                        <div id="mobileimg">
                            <img id="pdtimg" src={"http://localhost:8000/images/"+todisplay.mobile_images} alt="noimg"/>
                        </div>
                        <div id="mobiletxt">
                            <label id="pdttxt">{todisplay.Model}</label><br/>
                            <div id="screen">
                                <CgHomeScreen id="displayicon"/><label id="pdttxt2">{todisplay.Display}</label><br/>
                            </div>
                            <div id="chip">
                                <FaMicrochip id="chipicon" /><label id="pdttxt3">{todisplay.Processor}</label><br/>
                            </div>
                            <div id="storage">
                                <GrStorage id="ramicon" /><label id="pdttxt4">{todisplay.Storage}</label><br/>
                            </div>
                            <div id="battery">
                                <PiBatteryChargingVerticalBold id="baticon" /><label id="pdttxt5">{todisplay.Battery}</label>
                            </div>
                            <button onClick={()=>pdtdata(todisplay.Model,todisplay.id)}>Add <FaArrowRight /></button>

                        </div>
                    </div>
                </div>
                </>)}
            </div>


            <div id="comaprebtndiv">
                
                <div id="mobiless">
                    <div id="key1">
                        <label id="keyname1">{kys[0]}</label><span onClick={rmvone}><CgRemove id="rmv1"/></span>
                    </div>
                    <div id="key1">
                        <label id="keyname2">{kys[1]}</label><span onClick={rmvtwo}><CgRemove id="rmv2"/></span>
                    </div>
                </div>

                <Link to={'compare'}><button id="comparebtn">COMPARE</button></Link>
            </div>



        </div>
    );
};