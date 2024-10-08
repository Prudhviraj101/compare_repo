import smartphone from './smartphone.png';
import camera from './camera.png';
import headset from './headset.png';
import tablet from './tablet.png';
import laptop from './laptop.png';
import smartwatch from './smartwatch.png';
import speaker from './speaker.png';
import { Link } from 'react-router-dom';
import React from 'react';


export const acontext=React.createContext();

export default function Categories(){
    
    return(
        <div id='categoriesmain'>
            <h1 id="ctg_head">CATEGORIES</h1>
            <div id="ctg_main">
                <Link to={`/products/mobile`}><div id="mobile">
                    <img src={smartphone} alt="mobile"/>
                    <label>MOBILES</label>
                </div></Link>
                <Link to={'/products/laptops'}><div id="laptop">
                    <img src={laptop} alt="laptop"/>
                    <label>LAPTOPS</label>
                </div></Link>
                <Link to={'/products/cameras'}><div id="camera">
                    <img src={camera} alt="camera"/>
                    <label>CAMERAS</label>
                </div></Link>
                <Link to={'/products/headsets'}><div id="headset">
                    <img src={headset} alt="headset"/>
                    <label>HEADSETS</label>
                </div></Link>
                <Link to={'/products/smartwatches'}><div id="watch">
                    <img src={smartwatch} alt="smartwatch"/>
                    <label>SMARTWATCH</label>
                </div></Link>
                <Link to={'/products/speakers'}><div id="speaker">
                    <img src={speaker} alt="speaker"/>
                    <label>SPEAKERS</label>
                </div></Link>
                <Link to={'/products/tablets'}><div id="tablet">
                    <img src={tablet} alt="tablet"/>
                    <label>TABLETS</label>
                </div></Link>
            </div>
        </div>
    );
};