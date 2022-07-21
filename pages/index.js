import { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux';

import randomWords from "random-words";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import Input from "../components/input/input";
import Header from "../components/header/header";
import Button from "../components/button/button";
import { storeWords } from '../redux/actions/wordAction';

import styles from '../styles/Home.module.scss'

import { options } from '../utils'; 


export default function Home() {
  const inputRef = useRef(null);
  const {words: words2} = useSelector((state)=> state.words);
  const dispatch = useDispatch();

  const [numberOfWords, setNumberOfWords] = useState(200);
  const [words, setWords] = useState([]);
  // in minutes
  // 1m, 2m, 5m, custom
  const [countdown, setCountdown] = useState(options.timeValues[0].value);
  const [selectedTime, setSelectedTime] = useState(options.timeValues[0].label);


  const [typedInput, setTypedInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const [inputActive, setInputActive]= useState(false);

  // state for visual representation
  const [currentCharIdx, setCurrentCharIdx] = useState(-1);
  const [currentChar, setCurrentChar] = useState("");

  useEffect(()=>{
    setWords(generateWords());
  },[])

  useEffect(()=>{
    inputActive && inputRef.current.focus();
  },[inputActive])

  useEffect(() => {
    if(words.length>0){
      dispatch(storeWords(words));
    }
  }, [words])
  

  const generateWords = () => {
    return randomWords(numberOfWords);
  }

  const resetFields = () => {
    setWords(generateWords());
    setTypedInput("");
    setCorrect(0);
    setIncorrect(0);
    setWordIndex(0);
    setCurrentCharIdx(-1);
    setInputActive(false);

  }


  const handleStart = () =>{
    // if user wants to restart game, reset all fields
    resetFields();
    setInputActive(()=> true);
    
    let interval = setInterval(() => {
      setCountdown(prev=>{
        if(prev===0){
          setInputActive(false);
          clearInterval(interval);
          return countdown;
        }else{
          return prev-1;
        }
      });
    }, 1000);
  }
  // keep track of all the words we have in our input
  const handleKeyDown = (e) => {
    if(e.keyCode === 32){
      checkMatch()
      setTypedInput("")
      setWordIndex(prev=>prev+1);
      setCurrentCharIdx(-1);
    }else if(e.keyCode === 8){//if backspace
      setCurrentCharIdx(prev=>prev-1);
      setCurrentChar("");
    }else{
      setCurrentCharIdx(prev=>prev+1);
      setCurrentChar(e.key);
    }
  }


  const checkMatch = () =>{
    const wordToCompare = words[wordIndex];
    const wordMatches = wordToCompare === typedInput.trim();
    if(wordMatches){
      setCorrect(prev=>prev+1);
    }else{
      setIncorrect(prev=>prev+1);
      // setCorrect(prev=>prev-1);
    }
    return wordMatches;
  }

  const getChar = (wordIndexParam, characterIndex, char) =>{
    // if we have a spacebar, we dont have a current char
    if(wordIndex === wordIndexParam && characterIndex === currentCharIdx && currentChar&&inputActive){
      if(char === currentChar){
        return "success-background";
      }else{
        return "fail-background";
      }
      }else if(wordIndexParam === wordIndex && currentCharIdx >= words[wordIndex].length){
        return "fail-background";
      }else{
      return "";
    }
  }

  const handleInputChange = (e) =>{
    setCountdown(e.target.value*60);
    setSelectedTime(e.target.value);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Typing test Web Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        {...{options,selectedTime,handleInputChange, setCountdown, setSelectedTime}}
      />

      

      <main className={styles.main}>
        {inputActive && (
          <CountdownCircleTimer
            isPlaying
            duration={selectedTime*60}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        )}

      {/* countdown */}
          <div className={styles.timeDisplay}>
          <span>Time: </span>
            {selectedTime ??0} minute{selectedTime > 1 && "s"}
          </div>

        <Input
          ref={inputRef}
          type="text"
          onKeyDown={handleKeyDown}  
          value={typedInput}
          disabled={!inputActive}
          onChange={(e)=>setTypedInput(e.target.value)}
        />

        <div style={{display: "flex", gap:"5px"}}>
        <Button
          label="Start"
          onClick={handleStart}
          disabled={inputActive}
          style={{backgroundColor:"green", border:"none", color:"#fff"}}
        />

        <Button
          label="Reset"
          onClick={resetFields}
          disabled={!inputActive && !typedInput}
          style={{backgroundColor:"grey", border:"none", color:"#fff"}}
        />

        </div>

        {inputActive && (
          <>
            <div className={styles.content} style={{border: "1px solid #2e2e2e", padding:"2rem", borderRadius:"8px"}}>
              {words2.map((wrd,idx)=>(
                <span key={idx}>
                  <span>
                    {wrd.split("").map((char, idx2)=>(
                      <span key={idx2}>
                        <span 
                          className={getChar(idx,idx2,char)}
                        >
                          {char}
                        </span>
                      </span>
                    ))}
                  </span><span>{" "}</span>
                </span>
              ))}
              {/* {words} */}
            </div>
          </>
        )}

        <div className={styles.bottom}>
        <div className={styles.card}>
          <h2>Correct Words Per {selectedTime} Minute{selectedTime>1&&"s"}: </h2> <p>{correct}</p>
        </div>
        <div className={styles.card}>
          <h2>Score: </h2> <p>{correct}{" "}/{" "}{correct+incorrect}</p>
        </div>
        </div>
      </main>
    </div>
  )
}
