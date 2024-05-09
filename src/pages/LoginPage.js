import React, { useState, useEffect } from 'react';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase.js";
import '../App.css';
import { RegisterPage } from './RegisterPage.js';

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
      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <br></br>
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <br></br>
        <button onClick={login}> Login</button>
      </div>
      <div>
        <a href='../register' >Register</a>
      </div>

      <p> Currently Logged In: </p>
      <span>{user ? user.email : "Not Logged In"}</span>
        <br></br>
      <button onClick={logout}> Sign Out </button>
      </header>
    </div>
  );
}
