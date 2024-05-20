import { Feedback } from '../components/Feedback.jsx';
import AppBar from "./AppBar.js";
import '../App.css';

export const FeedbackPage = () => {
  return (
    <div className="App" id="outer-container">
      <AppBar/>
      <h2>Feedbacks</h2>
      <Feedback/>
    </div>
  );
}