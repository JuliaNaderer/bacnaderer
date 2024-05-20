import { Feedback } from '../components/Feedback.jsx';
import AppBar from "./AppBar.js";
import '../App.css';

export const FeedbackPage = () => {
  return (
    <div className="App" id="outer-container">
      <AppBar/>
      <Feedback/>
    </div>
  );
}