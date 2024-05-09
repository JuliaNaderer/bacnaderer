import React, { useState, useEffect } from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase";
import '../App.css';

export const OverviewPage = () => {

    const [user, setUser] = useState({});

    
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });}, [])

    return(
<html>
    <header className="notFound">
        <h1>This works</h1>
        <p> Hello: {user ? user.email : "[No User Logged In]"}</p>
    </header>
</html>
    );
}