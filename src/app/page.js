"use client";
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'

// import styles from './page.module.css'
// import { useClient } from 'react-jobs';
import { useState } from 'react';
export default function Home() {
  const [showGif, setShowGif] = useState(null);
  const [displayChoice, setChoice] = useState(null);
  const [gifKey, setGifKey] = useState(0); // Add state variable for the key
  const [wizzyKey, setWizzyKey] = useState(0);
  const [tombKey, setTombKey] = useState(0);
  // const client = useClient();   
  function handleClick(){
    let result = testRandom()
    console.log(result)
    if (showGif === 'wizzy' && result == 'wizzy') {
      setShowGif('wizzy1')
    } else if (showGif === 'tomb' && result == 'tomb') {
      setShowGif('tomb1')
    }
    else{
      setShowGif(result);
    }
  }
  return (
    <div>
      
      <h1>Home Page</h1>
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          padding: 0,
          cursor: 'pointer',
        }}
        onClick={() => {
            setChoice('wizzy')
        }}
      >
        <div style={{ border: displayChoice === 'wizzy' ? '2px solid blue' : 'none' }}>
          <img
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
            }}
            className="side-icon"
            src="/wizzy_coin.png"
            alt="Wizard"
          />
        </div>
      </button>
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          padding: 0,
          cursor: 'pointer',
        }}
        onClick={() => {
            setChoice("tombstone")
        }}
      >
        <div style={{ border: displayChoice === 'tombstone' ? '2px solid blue' : 'none' }}>
          <img
            
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
            }}
            className="side-icon"
            src="/wizzy_coin.png"
            alt="Wizard"
          />
        </div>
      </button>

      
      {showGif === 'wizzy' && (
        <img key={gifKey} src="wizzyWinOnce.gif" alt="gif1" />
      )}
      {showGif === 'tomb' && (
        <img key={gifKey} src="tombstoneWinOnce.gif" alt="gif2" />
      )}
      {showGif === 'wizzy1' && (
        <img key={gifKey} src="wizzyWinOnce1.gif" alt="gif1" />
      )}
      {showGif === 'tomb1' && (
        <img key={gifKey} src="tombstoneWinOnce1.gif" alt="gif2" />
      )}
      <button type="button" class="btn btn-secondary"onClick ={testRandom}>RANDOM!</button>
      <button type="button" class="btn btn-secondary" onClick={handleClick}>FLIP!</button>
      <h1>Selected Coin: {displayChoice}</h1>
    </div>
  );
}
function testRandom() {
  const clientSeed = randomString(30);
  console.log("client seed:" + clientSeed)
  const crypto = require('crypto');
  const serverSeed = crypto.randomBytes(256).toString('hex');
  console.log("server seed:" + serverSeed)
  const combination = clientSeed + serverSeed;
  const hash = crypto.createHash('sha512').update(combination).digest('hex');
  console.log("hash: " + hash)
  const decrypted = decrypt(hash)
  console.log("decrypted value: " + decrypted)
  if(decrypted < 50){
    console.log("heads")
    return 'wizzy'
  }
  else{
    console.log("tails")
    return 'tomb'
  }
}
function flip() {
  const words = ['wizzy', 'tomb'];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

async function secureFlip() {
  const response = await fetch('/api/flip');
  const data = await response.json();
  return data.result;
}

function randomString(length) {
  const availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = '';
  for(let i = 0; i < length; i++) {
    randomString += availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  return randomString;
}

function decrypt(hashedValue){
  // the offset of the interval
  let index = 0;
  // result variable
  let result;

  do {
    // get the decimal value from an interval of 5 hex letters
    result = parseInt(hashedValue.substring(index * 5, index * 5 + 5), 16);
    // increment the offset in case we will need to repeat the operation above
    index += 1;
    // if all the numbers were over 999999 and we reached the end of the string, we set that to a default value of 9999 (99 as a result)
    if (index * 5 + 5 > 129) {
      result = 9999;
      break;
    }
  } while (result >= 1e6);
  // the result is between 0-999999 and we need to convert if into a 4 digit number
  // we a apply a modulus of 1000 and the 4 digit number is further split into a 2 digit number with decimals
  return [result % 1e4] * 1e-2;
};