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
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3hKyiwNNgjWddQ-Ur9Q1gn_ukmOEfTgkrQAUnDiztQ&s'></img>
        <div class='loginForm'>
        <div>
            <h3> Register User </h3>
            <div>
              <label class='label' >Email Adress</label>
          </div>
            <input class='input'
            placeholder="Email..."
            onChange={(event) => {
                setRegisterEmail(event.target.value);
            }}
            />
            <br></br>
            <div>
              <label class='label' >Password</label>
          </div>
            <input class='input'
            placeholder="Your Strong Password"
            onChange={(event) => {
                setRegisterPassword(event.target.value);
            }}
            />
            <br></br>
            <button class='homeButton' onClick={register}> Register</button>
            <br></br>
            <a class='homeButton' id='link' href="../login"> Back To Login</a>
            <br></br>
            <br></br>
            <p id="status"></p>
            </div>
  
          <p> Currently Logged In: </p>
        <span>{user ? user.email : "[No User Logged In]"}</span>
        <br></br>
        <button class='homeButton' onClick={logout}> Sign Out </button>
        </div>
        </header>
      </div>
    );
  }