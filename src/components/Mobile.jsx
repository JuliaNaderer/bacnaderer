import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../App.css';

export const Mobile = () => {
  const [phonenr, setPhoneNr] = useState("");
  const history = useHistory();

  const sendCode = async () => {
    history.push("/otp")
  };

  return (
    <div className="App">
    <header  className="App-header">
    <img src='../puk.png' alt="puk1"></img>
    <div class='loginForm'>
    <div>
        <h3> Enter 6-Digit Code</h3>
        <PhoneInput country={"in"} value={phonenr} onChange={setPhoneNr} className="phoneInput"></PhoneInput>
        <br></br>
        <button class='homeButton' onClick={sendCode}>Send SMS</button>
        <br></br>
        <a class='homeButton' id='link' href="../login"> Go Back To Login</a>
        <br></br>
        <br></br>
        <p id="status"></p>
        </div>
    </div>
    </header>
  </div>
  );
}
