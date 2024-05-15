import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from './pages/RegisterPage';
import {NotFoundPage} from './pages/NotFoundPage';
import {Homepage} from './pages/Homepage';
import {DashboardPage} from './pages/DashboardPage';
import {ForgotInformationPage} from './pages/ForgotInformationPage';
import {OTPPage} from "./pages/OTPPage";
import {MobileOtpPage} from "./pages/MobileOtpPage";
//import {MoodTrackPage} from './pages/Moodtracker';
import SchedulePage from './pages/SchedulePage';


export const RoutesComponent = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/dashboard" element={<DashboardPage/>} />
                <Route path="/reset" element={<ForgotInformationPage/>} />
                <Route path="/otp" element={<OTPPage/>} />
                <Route path="/mobileOtp" element={<MobileOtpPage/>} />
                <Route path="/appointments" element={<SchedulePage/>} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    );
};