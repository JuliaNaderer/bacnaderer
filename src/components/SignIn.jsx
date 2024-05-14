import React, { useState} from 'react';
import {auth} from "../firebase.js";
import { useHistory } from 'react-router-dom';
import '../App.css';
import {
  sendEmailVerification,
  signInWithEmailAndPassword
} from "firebase/auth";

export const SignIn = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const history = useHistory();

  const login = async () => {
      var loginStatus = document.getElementById("loginstatus");
      loginStatus.innerHTML = "";

      if(loginEmail === "" && loginPassword === ""){
        loginStatus.innerHTML = "Empty User Credentials";
      }
      else if (loginPassword === "")
      {
        loginStatus.innerHTML = "Empty Password Field";
      }
      else if (loginEmail === "")
      {
        loginStatus.innerHTML = "Empty Password Field";
      }
      else{

        const userCredential = signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(function (userCredential) {
          console.log(userCredential);
          history.push("/dashboard")
        })
        .catch(function (error) {
            if (error.code === 'auth/multi-factor-auth-required') {
              history.push("/mobileOtp");
            }else if(error.code === 'auth/invalid-email-verified'){
              sendEmailVerification(userCredential.user)
              loginStatus.innerHTML = "Verification Email Sent";
            } 
            else if (error.code === 'auth/wrong-password') {
                // Handle other errors such as wrong password.
            }
        });
      }
    }

  const forgot = async () => {
    history.push("/reset")
  };

  return (
    <div className="App">
      <header  className="App-header">
      <img src='../puk.png' alt="puk1"></img>
      <div className="loginForm">
        <div > 
            <h3> Login </h3>
            <div>
              <text class="text-email">Email</text>
              <br></br>
            <input  
                className="input"
            placeholder="john@smith.com"
            onChange={(event) => {
                setLoginEmail(event.target.value);
            }}
            />
            <br></br>
            </div>
            <text class="text-password">Password</text>
              <br></br>
            <input className="input"
                        type="password"
            placeholder="*********"
            onChange={(event) => {
                setLoginPassword(event.target.value);
            }}
            />
            <br></br>
            <button className="forgotButton" onClick={forgot}> Forgot Password ?</button>
            <br></br>
            <div id="loginstatus"></div>
            <br></br>
            <button className="homeButton" onClick={login}> Login</button>
        </div>
        </div>
      </header>
    </div>
  );
}