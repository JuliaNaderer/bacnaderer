import React, { useState, useEffect } from 'react';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase.js";
import '../App.css';

export const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });}, [])

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      document.getElementById("status").innerHTML = user;
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <header  className="App-header">
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3hKyiwNNgjWddQ-Ur9Q1gn_ukmOEfTgkrQAUnDiztQ&s'></img>
      <div class='loginForm'>
      <div >
        <h3> Login </h3>
        <div>
          <label class='label' >Email Adress</label>
        </div>
        <div>
        <input  
              class='input'
          placeholder="Your Email Address"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        </div>
        <div>
          <label class='label' >Password</label>
        </div>
        <input class='input'
          placeholder="Your Strong Password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <br></br>
        <button class='homeButton' onClick={login}> Login</button>
      </div>
      <br></br>
      <div>
        <a class='homeButton' id='link' href='../register' >Register New User</a>
      </div>
      <br></br>
      <p> Currently Logged In: </p>
      <span>{user ? user.email : "[No User Logged In]"}</span>
        <br></br>
        <br></br>
      <button class='homeButton' onClick={logout}> Sign Out </button>
      </div>
      </header>
    </div>
  );
}
