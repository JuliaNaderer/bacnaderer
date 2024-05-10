import OtpInput from "otp-input-react";
import { useState } from "react";

export const OTP = () => {

    const [otp, setOtp] = useState();


    return(
        <div className="App">
        <header  className="App-header">
        <img src='../puk.png' alt="puk1"></img>
        <div className='loginForm'>
        <div>
            <h3> Enter 6-Digit Code</h3>
            <label className='otpInput'>
                <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType="number" disabled={false} className="otp-container"
                ></OtpInput>
            </label>
            <br></br>
            <button className='homeButton'>Verify Code</button>
            <br></br>
            <button className='homeButton'>Re-Send Code</button>
            <br></br>
            <a className='homeButton' id='link' href="../mobileOtp"> Edit Phone Number</a>
            <br></br>
            <br></br>
            <p id="status"></p>
            </div>
        </div>
        </header>
      </div>
    );
}