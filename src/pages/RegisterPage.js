import React, { useState, useEffect } from 'react';
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase";
import '../App.css';

export const RegisterPage = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [user, setUser] = useState({});
  
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
  
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
      });}, [])
  
    const logout = async () => {
      await signOut(auth);
    };
  
    return (
      <div className="App">
        <header  className="App-header">
        <div>
            <h3> Register User </h3>
            <input
            placeholder="Email..."
            onChange={(event) => {
                setRegisterEmail(event.target.value);
            }}
            />
            <br></br>
            <input
            placeholder="Password..."
            onChange={(event) => {
                setRegisterPassword(event.target.value);
            }}
            />
            <br></br>
            <button onClick={register}> Register User</button>
            <br></br>
            <a id='link' href="./"> Back To Login</a>
            <br></br>
            <br></br>
            <p id="status"></p>
            </div>
  
          <p> Currently Logged In: </p>
        <span>{user ? user.email : "[No User Logged In]"}</span>
        <br></br>
        <button onClick={logout}> Sign Out </button>
        </header>
      </div>
    );
  }