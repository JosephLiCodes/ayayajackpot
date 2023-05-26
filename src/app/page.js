"use client";
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

export default function Home() {
  const [showGif, setShowGif] = useState(null);
  const [displayChoice, setChoice] = useState(null);
  const [gifKey, setGifKey] = useState(0);
  const [modalShow, setModalShow] = useState(false); // State for controlling the modal visibility
  const [itemCount, setItemCount] = useState([1, 2]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  let imageLinks = ["/pixie_sword.png", "/deca_ring.png"]
  function updateItems(result){
    if(result === "wizzy" && displayChoice === "Wizzy" || result === "tomb" && displayChoice === "Tombstone"){
      setItemCount(prevItemCount => {
        const updatedItemCount = [...prevItemCount]; // Create a copy of the original array
        selectedIndexes.forEach(index => {
          if (index >= 0 && index < updatedItemCount.length) {
            updatedItemCount[index] *= 2; // Double the value at the specified index
          }
        });
        return updatedItemCount; // Return the updated array
      });    
    }
    else{
      setItemCount(prevItemCount => {
        const updatedItemCount = [...prevItemCount]; // Create a copy of the original array
        selectedIndexes.forEach(index => {
          if (index >= 0 && index < updatedItemCount.length) {
            updatedItemCount[index] = 0; // Double the value at the specified index
          }
        });
        return updatedItemCount; // Return the updated array
      });
    
    }
  }
  function handleClick() {

    if (!displayChoice) {
      console.log("SELECT A COIN!")
      // User hasn't selected a coin button, do nothing
      return;
    }

    const result = testRandom();


    console.log(result);

    if (showGif === 'wizzy' && result === 'wizzy') {
      setShowGif('wizzy1');
    } else if (showGif === 'tomb' && result === 'tomb') {
      setShowGif('tomb1');
    } else {
      setShowGif(result);
    }

    setModalShow(true); // Show the modal when the GIF result is available
    updateItems(result)
  }
    const itemSelected = (index) => {
      if (selectedIndexes.includes(index)) {
        setSelectedIndexes(selectedIndexes.filter((selectedIndex) => selectedIndex !== index));
      } else {
        setSelectedIndexes([...selectedIndexes, index]);
      }
    };
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center' }}>
        {itemCount.map((number, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '10 30px' }}>
            <h1 class="text-light">{number}</h1>
            <button
              style={{
                border: selectedIndexes.includes(index) ? '2px solid blue' : 'none',
                backgroundColor: 'transparent',
                padding: 0,
                cursor: 'pointer',
              }}
              onClick={() => itemSelected(index)}
            >
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
            </button>
          </div>
        ))}
      </a>
    </nav>
      
      <h1>Select a Coin and then click Flip!</h1>
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
          setChoice('Tombstone');
        }}
      >
        <div style={{ border: displayChoice === 'Tombstone' ? '2px solid blue' : 'none' }}>
          <img
            style={{
              width: '50px',
              height: '50px',
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
      <h1>Selected Coin: {displayChoice}</h1>

      <Modal show={modalShow} onHide={() => {setModalShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Coin: {displayChoice}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showGif === 'wizzy' && <img key={gifKey} src="wizzyWinOnce.gif" alt="gif1" />}
          {showGif === 'tomb' && <img key={gifKey} src="tombstoneWinOnce.gif" alt="gif2" />}
          {showGif === 'wizzy1' && <img key={gifKey} src="wizzyWinOnce1.gif" alt="gif1" />}
          {showGif === 'tomb1' && <img key={gifKey} src="tombstoneWinOnce1.gif" alt="gif2" />}
        </Modal.Body>
      </Modal>
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