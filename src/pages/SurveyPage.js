import { Survey } from '../components/Survey.jsx';
import AppBar from "../AppBar.js";
import '../App.css';

export const SurveyPage = () => {
  return (
    <div className="App" id="outer-container">
    <AppBar/>
    <div className='notFound'>
    <Survey/>    
    </div>
  </div>
  );
}