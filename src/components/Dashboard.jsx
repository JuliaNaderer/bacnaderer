import React, { useState, useEffect } from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase";
import '../App.css';
import Sidebar from "../Sidebar";

export const Dashboard = () => {

    const [user, setUser] = useState({});

    
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });}, [])

  return (
        <div className="App" id="outer-container">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                <div id="page-wrap">
                <h1>Welcome, {user ? user.email : "[No User Logged In]"}</h1>
            </div>
        </div>
  );
}