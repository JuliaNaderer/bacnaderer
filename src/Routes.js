import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from './pages/RegisterPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Homepage } from './pages/Homepage';
import { ForgotInformationPage } from './pages/ForgotInformationPage';
import { OTPPage } from "./pages/OTPPage";
import { MoodTrackPage } from './pages/MoodTrackPage';
import { SchedulePage } from './pages/SchudlePage';
import { SurveyPage } from './pages/SurveyPage';
import { DashboardPage } from "./pages/DashboardPage";

export const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/surveys" element={<SurveyPage />} />
                <Route path="/reset" element={<ForgotInformationPage />} />
                <Route path="/otp" element={<OTPPage />} />
                <Route path="/appointments" element={<SchedulePage />} />
                <Route path="/moodtracker" element={<MoodTrackPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};