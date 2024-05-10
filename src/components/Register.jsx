import React, { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase";
import '../App.css';

export const Register = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
  
    const register = async () => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    return (
      <div className="App">
        <header  className="App-header">
        <img src='../puk.png' alt="puk1"></img>
        <div class='loginForm'>
        <div>
            <h3> Register User </h3>
            <input class='input'
            placeholder="Your Email Address"
            onChange={(event) => {
                setRegisterEmail(event.target.value);
            }}
            />
            <br></br>
            <input class='input'
            type="password"
            placeholder="Your Strong Password"
            onChange={(event) => {
                setRegisterPassword(event.target.value);
            }}
            />
            <br></br>
            <button class='homeButton' onClick={register}> Register</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <a class='homeButton' id='link' href="../login"> Back To Login</a>
            <br></br>
            <br></br>
            <p id="status"></p>
            </div>
        </div>
        </header>
      </div>
    );
  }