import React, { useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase.js";
import { useHistory } from 'react-router-dom';
import '../App.css';

export const SignIn = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const history = useHistory();

  const login = async () => {

      var loginStatus = document.getElementById("loginstatus");
      loginStatus.innerHTML = "";
    try {

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

      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      history.push("/mobileOtp");
    }}catch (error) {
      console.log(error.message);
      loginStatus.innerHTML = "Invalid User Credentials"
    }
  };

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
            <br></br>
            <div id="loginstatus">   </div>
            <br></br>
            <button className="homeButton" onClick={login}> Login</button>
        </div>
        </div>
      </header>
    </div>
  );
}
