import React, { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "./firebase";
import logo from './logo.svg';
import './App.css';

function App() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = async () => {
  try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user);
    }catch(error){
      console.log(error.message)
    }
  }

  const login = async () => {
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user);
    }catch(error){
      console.log(error.message)
    }

  }

  const logout = async () => {


  }

  
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <h3> Register User</h3>
        <input placeholder = "Email"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}/>
          <input type='password' placeholder = "Password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}/>
          <button onClick={register}>Create User</button>
        </div>

        <div>
        <h3> Login User</h3>
        <input placeholder = "Email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}/>
          <input type='password' placeholder = "Password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}/>
          <button>Login User</button>
        </div>
      </header>
    </div>
  );
}

export default App;
