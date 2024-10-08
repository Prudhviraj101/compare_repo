import axios from "axios";
import { useEffect, useState } from "react";

export default function Compare(){

    const lst={...localStorage};
    const tl=Object.values(lst);

    const [product1,setProduct1]=useState([{Model:"",Display:"",Processor:"",Storage:"",Camera:"",Battery:"",mobile_images:""}]);
    const [product2,setProduct2]=useState({Model:"dd",Display:"",Processor:"",Storage:"",Camera:"",Battery:"",mobile_images:""});

    useEffect(()=>{

        axios.get(`http://localhost:8000/pdt/${tl}`).then((res)=>{
            setProduct2(res.data.one[0]);
            setProduct1(res.data.two[0]);
        })

    })

    return(
        <div>

            <div id="mainmobilediv">
                <div id="mobilediv1">
                    <img src={'http://localhost:8000/images/'+product1.mobile_images} alt="no img"/>
                    <h2>{product1.Model}</h2>
                    <h3>Display : {product1.Display}</h3>
                    <h3>Processor: {product1.Processor}</h3>
                    <h3>Storage : {product1.Storage}</h3>
                    <h3>Camera : {product1.Camera}</h3>
                    <h3>Battery : {product1.Battery}</h3>
                </div>

                <div id="linediv"></div>

                <div id="mobilediv1">
                    <img src={'http://localhost:8000/images/'+product2.mobile_images} alt="no img"/>
                    <h2>{product2.Model}</h2>
                    <h3>Display : {product2.Display}</h3>
                    <h3>Processor: {product2.Processor}</h3>
                    <h3>Storage : {product2.Storage}</h3>
                    <h3>Camera : {product2.Camera}</h3>
                    <h3>Battery : {product2.Battery}</h3>
                </div>

            </div>

        </div>

    );
    
};