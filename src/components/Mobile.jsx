import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../App.css';

export const Mobile = () => {
  const [phonenr, setPhoneNr] = useState("");
  const navigate = useNavigate();

  const sendCode = async () => {
    navigate("/otp")
  };

  return (
    <div className="App">
    <header  className="App-header">
    <a href="./login"><img src='../puk.png' alt="puk1"></img></a>
    <div className='loginForm'>
    <div>
        <h3> Enter your Phone Number</h3>
        <PhoneInput country={"ch"} value={phonenr} onChange={setPhoneNr} className="phoneInput"></PhoneInput>
        <br></br>
        <button className='homeButton' onClick={sendCode}>Send SMS</button>
        <br></br>
        <a className='homeButton' id='link' href="../login"> Go To Login</a>
        <br></br>
        <br></br>
        <p id="status"></p>
        </div>
    </div>
    </header>
  </div>
  );
}
