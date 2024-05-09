import React, { useState, useEffect } from 'react';
import '../App.css';

export const Homepage = () => {

    return(
        <div className="App">
      <header  className="App-header">
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3hKyiwNNgjWddQ-Ur9Q1gn_ukmOEfTgkrQAUnDiztQ&s'></img>
        <br></br>
        <br></br>
      <a class='homeButton' href='../login' >Login</a>
        <br></br>
      <a class='homeButton' href='../register' >Register</a>
      </header>
        </div>
    )
} 