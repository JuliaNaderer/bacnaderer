import React, { useState} from 'react';
import {sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../firebase";
import '../App.css';


export const Forgot = () => {

  const [forgotEmail, setForgotEmail] = useState("");

  const ForogotPassword = () => {
      sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        alert("Check your incoming emails");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      })
    }

    return (
      <div className="App">
        <header  className="App-header">
        <img src='../puk.png' alt="puk2"></img>
        <div className='loginForm'>
        <div>
            <h3> Forgot Password</h3>
            <input id="forgotInput" className='input' onChange={(event) => {
                setForgotEmail(event.target.value);
            }}
            placeholder="Your Email Address"
            />
            <br></br>
            <button className='homeButton' onClick={() => ForogotPassword()}>Send Email</button>
            <br></br>
            <a className='homeButton' id='link' href="../login"> Back To Login</a>
            <br></br>
            <br></br>
            <p id="status"></p>
            </div>
        </div>
        </header>
      </div>
    );
  }