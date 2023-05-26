"use client";
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showGif, setShowGif] = useState(null);
  const [displayChoice, setChoice] = useState(null);
  const [gifKey, setGifKey] = useState(0);
  const [modalShow, setModalShow] = useState(false); // State for controlling the modal visibility
  const [itemCount, setItemCount] = useState([50, 50]);
  const [itemQuantities, setItemQuantities] = useState([1, 1]); // Initial quantities for each item
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  let imageLinks = ["/pixie_sword.png", "/deca_ring.png"]
  function test(items){
    console.log(items[0])
  }
  function updateItems(result, updatedItemQuantities){
    console.log("debug: " + itemQuantities[0] + "pt 2: " + itemQuantities[1])
    if(result === "wizzy" && displayChoice === "Wizzy" || result === "tomb" && displayChoice === "Tombstone"){
      setItemCount(prevItemCount => {
        const updatedItemCount = [...prevItemCount]; // Create a copy of the original array
        for(let index = 0; index<itemCount.length; index++){
          if (index >= 0 && index < updatedItemCount.length) {
            console.log("index: " + index + "amt " + itemCount[index])
            updatedItemCount[index] += updatedItemQuantities[index]; // add winnings!
          }
        }
        // itemQuantities.forEach(index => {
        //   console.log(itemQuantities[index])
        //   if (index >= 0 && index < updatedItemCount.length) {
        //     console.log("index: " + index + "amt " + itemQuantities[index])
        //     updatedItemCount[index] += itemQuantities[index]; // add winnings!
        //   }
        // });
        return updatedItemCount; // Return the updated array
      });    
    }
    else{
      setItemCount(prevItemCount => {
        const updatedItemCount = [...prevItemCount]; // Create a copy of the original array
        // itemQuantities.forEach(index => {
        //   if (index >= 0 && index < updatedItemCount.length) {
        //     console.log("index: " + index + "amt " + itemQuantities[index])
        //     updatedItemCount[index] -= itemQuantities[index]; // add winnings!
        //   }
        // });
        for(let index = 0; index<itemCount.length; index++){
          if (index >= 0 && index < updatedItemCount.length) {
            console.log("index: " + index + "amt " + itemCount[index])
            updatedItemCount[index] -= updatedItemQuantities[index]; // add winnings!
          }
        }
        return updatedItemCount; // Return the updated array
      });    
    
    }
  }
  function handleClick() {
    // setItemQuantities([2,3])
    console.log("bet amt" + itemQuantities[0] + itemQuantities[1])
    if (!displayChoice) {
      console.log("SELECT A COIN!")
      // User hasn't selected a coin button, do nothing
      return;
    }
    const updatedItemQuantities = [];
    const inputBoxes = document.querySelectorAll('input[type="number"]');
    for (let i = 0; i<inputBoxes.length; i++){
      const quantity = parseInt(inputBoxes[i].value) || 0;
      console.log("Quantity:" + quantity)
      if(quantity < 0 || quantity > itemCount[i]){
        console.log("invalid gambling values!")
        return;
      }
      updatedItemQuantities[i] = quantity;
    }
    setItemQuantities(updatedItemQuantities)
    const result = testRandom();
    console.log(result);
    updateItems(result, updatedItemQuantities)
    if (showGif === 'wizzy' && result === 'wizzy') {
      setShowGif('wizzy1');
    } else if (showGif === 'tomb' && result === 'tomb') {
      setShowGif('tomb1');
    } else {
      setShowGif(result);
    }

    // setModalShow(true); // Show the modal when the GIF result is available
  
  }
    // const itemSelected = (index) => {
    //   if (selectedIndexes.includes(index)) {
    //     setSelectedIndexes(selectedIndexes.filter((selectedIndex) => selectedIndex !== index));
    //   } else {
    //     setSelectedIndexes([...selectedIndexes, index]);
    //   }
    // };
  return (
    <div>
      <nav class="navbar navbar-expand-lg"  style ={{height: '10vh', backgroundColor: "#A9BCD0"}} >
        <h1 style = {{color: "#58a4b0"}}>Welcome to AYAYAJACKPOT!</h1>
      <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center' }}>
        
      </a>
    </nav>
    <div style={{ display: 'flex', height: '90vh' }}>
    <div style={{ width: '50%', borderRight: '1px solid black' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h1 class>Inventory: </h1>
          {itemCount.map((number, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '10 30px' }}>
                <div>
                  <img
                    style={{
                      width: '50px',
                      height: '50px',
                      border: 'none',
                    }}
                    className="side-icon"
                    src={imageLinks[index]}
                    alt={`Image ${index + 1}`}
                  />
                </div>
                <h1 >{number}</h1>
            </div>
          ))}
    </div>
    {/* <h3>Choose how much of each item, then select a coin side and then click Flip!</h3> */}
    {itemCount.map((number, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '10 30px' }}>
          <div>
            <img
              style={{
                width: '50px',
                height: '50px',
                border: 'none',
              }}
              className="side-icon"
              src={imageLinks[index]}
              alt={`Image ${index + 1}`}
            />
          </div>
          <input
            type="number"
            defaultValue="1"
            className={`inputBox${index + 1}`}
            data-index={index}
          />
      </div>
      ))}
      
      <h3>Selected Coin: {displayChoice}</h3>
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          padding: 0,
          cursor: 'pointer',
        }}
        onClick={() => {
          setChoice('Wizzy');
        }}
      >
        <div style={{ border: displayChoice === 'Wizzy' ? '2px solid blue' : 'none' }}>
          <img
            style={{
              width: '100px',
              height: '100px',
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
          setChoice('Tombstone');
        }}
      >
        <div style={{ border: displayChoice === 'Tombstone' ? '2px solid blue' : 'none' }}>
          <img
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: 'none',
            }}
            className="side-icon"
            src="/tombstone_coin.png"
            alt="Wizard"
          />
        </div>
      </button>

      <button type="button" class="btn btn-secondary" onClick={handleClick}>
        FLIP!
      </button>
      
    </div>
    <div style={{ width: '50%' }}>
          <h1>Selected Coin: {displayChoice}</h1>
          {showGif === 'wizzy' && <img key={gifKey} src="wizzyWinOnce.gif" alt="gif1" />}
          {showGif === 'tomb' && <img key={gifKey} src="tombstoneWinOnce.gif" alt="gif2" />}
          {showGif === 'wizzy1' && <img key={gifKey} src="wizzyWinOnce1.gif" alt="gif1" />}
          {showGif === 'tomb1' && <img key={gifKey} src="tombstoneWinOnce1.gif" alt="gif2" />}
    </div>
    </div>
    
      {/* <Modal show={modalShow} onHide={() => {setModalShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Coin: {displayChoice}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showGif === 'wizzy' && <img key={gifKey} src="wizzyWinOnce.gif" alt="gif1" />}
          {showGif === 'tomb' && <img key={gifKey} src="tombstoneWinOnce.gif" alt="gif2" />}
          {showGif === 'wizzy1' && <img key={gifKey} src="wizzyWinOnce1.gif" alt="gif1" />}
          {showGif === 'tomb1' && <img key={gifKey} src="tombstoneWinOnce1.gif" alt="gif2" />}
        </Modal.Body>
      </Modal> */}
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