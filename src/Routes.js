import {BrowserRouter, Switch, Route} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from './pages/RegisterPage';
import {NotFoundPage} from './pages/NotFoundPage';
import {Homepage} from './pages/Homepage';
import {DashboardPage} from './pages/DashboardPage';
import {ForgotInformationPage} from './pages/ForgotInformationPage';
import {OTPPage} from "./pages/OTPPage";
import {MobileOtpPage} from "./pages/MobileOtpPage";
import MoodTrackPage from './pages/Moodtracker';


export const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Homepage/>
                </Route>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/register">
                    <RegisterPage/>
                </Route>
                <Route path="/dashboard">
                    <DashboardPage/>
                </Route>
                <Route path="/reset">
                    <ForgotInformationPage/>
                </Route>
                <Route path="/otp">
                    <OTPPage/>
                </Route>
                <Route path="/mobileOtp">
                    <MobileOtpPage/>
                </Route>
                <Route path="/moodtracker"> {/* Add route for MoodTrackPage */}
                    <MoodTrackPage />
                </Route>
                <Route>
                    <NotFoundPage/>
                </Route> 
            </Switch>
        </BrowserRouter>
    );
}