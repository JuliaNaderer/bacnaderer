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
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      history.push("/mobileOtp");
    } catch (error) {
      console.log(error.message);
    }
  };

  const forgot = async () => {
    history.push("/reset")
  };

  return (
    <div className="App">
      <header  className="App-header">
      <img src='../puk.png' alt="puk1"></img>
      <div class='loginForm'>
        <div >
            <h3> Login </h3>
            <div>
            <input  
                class='input'
            placeholder="Email"
            onChange={(event) => {
                setLoginEmail(event.target.value);
            }}
            />
            <br></br>
            </div>
            <input class='input'
                        type="password"
            placeholder="Password"
            onChange={(event) => {
                setLoginPassword(event.target.value);
            }}
            />
            <br></br>
            <button class='forgotButton' onClick={forgot}> Forgot Password ?</button>
            <br></br>
            <br></br>
            <button class='homeButton' onClick={login}> Login</button>
        </div>
        </div>
      </header>
    </div>
  );
}
