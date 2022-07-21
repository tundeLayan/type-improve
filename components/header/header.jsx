import React, {useState} from 'react'

import styles from "./header.module.scss";
import Input from "../input/input";
import Button from "../button/button";

const Header = ({options, selectedTime, handleInputChange, setCountdown, setSelectedTime}) => {
  const [mode, setMode] = useState("button");
  const handleChange = (e) => {
    setMode(e.target.value);
  }

  console.log("mode", mode);
  const getColor = (label, selectedTime, type) => {
    switch(type){
        case "button":
            return label === selectedTime ?`1px solid gold`:`1px solid white`;
        case "text":
            return label === selectedTime ?`gold`:`white`
        default:
            return "";
    }
  }
  return (
    <nav className={styles.navbar}>
        {/* times we could select would be here */}
        <div>
            Time Mode:
            <label>
            <input type="radio" id="button" name="mode" value="button" checked={mode==="button"} onChange={handleChange}/>
                Select
            </label>
            <label style={{marginInlineEnd:"10px"}}>
                <input type="radio" id="customInput" name="mode" value="customInput" checked={mode==="customInput"} onChange={handleChange}/>
                Custom Input
            </label>
        </div>
        {mode === "button" ? (
            <span style={{display:"flex", alignItems:"center", gap: "10px"}}>
                Select Time in Minutes: <span className={styles.timings}>
                {options.timeValues.map(({label, value})=>(
                    <Button
                    label={label}
                    key={label} 
                    onClick={()=>{
                        setCountdown(value);
                        setSelectedTime(label);  
                    }}
                    style={ {border:getColor(label, selectedTime, "button"), background:"black", color:getColor(label, selectedTime, "text")}}
                    >
                    {label}
                    </Button>
                ))}

                </span>
            </span>
        ):(
            <>
                <div className={styles.inputContainer}>
                <h4>Input Time in Minutes:&nbsp;</h4>
                <Input
                    type="number"
                    value={selectedTime}
                    onChange={handleInputChange}
                />
                </div>
            </>
        )}
      </nav>
  )
}

export default Header