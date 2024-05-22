import React, { useState} from 'react';
import {sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../firebase";
import '../App.css';


export const Forgot = () => {

  const [forgotEmail, setForgotEmail] = useState("");

  const ForogotPassword = () => {
      sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        document.getElementById("emailstatus").innerHTML = "Email Sent - Check your Inbox!"
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        document.getElementById("emailstatus").innerHTML = error.message
      })
    }

    return (
      <div className="App">
        <header  className="App-header">
        <a href="./login"><img src='../puk.png' alt="puk2"></img></a>
        <div className='loginForm'>
        <div>
            <h3> Forgot Password</h3>
            <input id="forgotInput" className='input' onChange={(event) => {
                setForgotEmail(event.target.value);
            }}
            placeholder="john@smith.com"
            />
            <div id="emailstatus">   </div>
            <br></br>
            <button className='homeButton' onClick={() => ForogotPassword()}>Reset Password</button>
            <br></br>
            <br></br>
            <a className='homeButton' id='link' href="../login"> Back To Login</a>
            <br></br>
            </div>
        </div>
        </header>
      </div>
    );
  }