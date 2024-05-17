import React, { useState} from 'react';
import {auth} from "../firebase.js";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import {onAuthStateChanged, sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";


export const SignIn = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

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
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(function (userCredential) {
          onAuthStateChanged(auth, (firebaseUser) => {
            firebaseUser.reload();
            if(firebaseUser.emailVerified){
              console.log(userCredential);
              navigate("/dashboard")
            }else{
              sendEmailVerification(userCredential.user)
              loginStatus.innerHTML = "Please verify your Email before logging in";
            }
          });
          }
        )
        .catch(function (error) {
          console.log(error);
            if (error.code === 'auth/multi-factor-auth-required') {
              navigate("/mobileOtp");
            }
            else if (error.code === 'auth/user-not-found') {
              loginStatus.innerHTML = "No Such User \"" + loginEmail + "\"";
            }
            else if (error.code === 'auth/wrong-password') {
              loginStatus.innerHTML = "Invalid Credentials";
          }
        });
      }
    }


  const forgot = async () => {
    navigate("/reset")
  };

  return (
    <div className="App">
      <header  className="App-header">
      <img src='../puk.png' alt="puk1"></img>
      <div className="loginForm">
        <div > 
            <h3> Login </h3>
            <div>
              <span className="text-email">Email</span>
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
            <span className="text-password">Password</span>
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