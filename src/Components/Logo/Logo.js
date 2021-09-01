import React from "react";
import Tilt from "react-tilt/dist/tilt";
import "./Logo.css"
import Brain from "./Brain.png"
const Logo = () => {
    return (
        <div className={"ma4 mt0"}>
            <Tilt className="Tilt br2 shadow-2" options={{max: 55}} style={{height: 150, width: 150}}>
                <div className="Tilt-inner"> <img alt={"Logo"} src={Brain} style={{paddingTop: "25px"}}/></div>
            </Tilt>
        </div>
    );
}
export default Logo;