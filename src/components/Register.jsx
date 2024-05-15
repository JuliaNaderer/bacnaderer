import React, { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase";
import '../App.css';

export const Register = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
  
    const clearStatus = () => {
      var loginStatus = document.getElementById("registerStatus");
      loginStatus.innerHTML = "";
    }

    const register = async () => {

      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        document.getElementById("registerStatus").innerHTML= "Successfully Created User, please go back to login";
        console.log(user);
      } catch (error) {
        console.log(error.message);
        if(error.code === "auth/email-already-in-use"){
          document.getElementById("registerStatus").innerHTML= "User is already regsitered";
        }
      }
    };
  
    return (
      <div className="App">
        <header  className="App-header">
        <img src='../puk.png' alt="puk1"></img>
        <div className="loginForm">
        <div>
            <h3> Register User </h3>
            <input className="input"
            placeholder="Your Email Address"
            onClick={(clearStatus)}
            onChange={(event) => {
                setRegisterEmail(event.target.value);
            }}
            />
            <br></br>
            <br></br>
            <input className="input"
            type="password"
            placeholder="Your Strong Password"
            onChange={(event) => {
                setRegisterPassword(event.target.value);
            }}
            />
            <br></br>
            <button className="homeButton" onClick={register}> Register</button>
            <br></br>
            <p id="registerStatus"></p>
            <br></br>
            <a className="homeButton" id='link' href="../login"> Back To Login</a>
            <br></br>
            <br></br>
            </div>
        </div>
        </header>
      </div>
    );
  }