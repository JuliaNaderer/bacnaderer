import OtpInput from "otp-input-react";
import { useHistory } from 'react-router-dom';
import { useState } from "react";


export const OTP = () => {
    const history = useHistory();
    const [otp, setOtp] = useState();

    const login = async () => {
        history.push("/dashboard")
    };

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
            <button className='forgotButton'>Re-Send Code</button>
            <br></br>
            <br></br>
            <button className='homeButton' onclick={login}>Login</button>
            <br></br>
            {/*<a className='homeButton' id='link' href="../mobileOtp"> Edit Phone Number</a>*/}
            <br></br>
            </div>
        </div>
        </header>
      </div>
    );
}