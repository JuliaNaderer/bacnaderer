import { Appointment } from '../components/Appointment';
import AppBar from "../AppBar";
import '../App.css';

export const AppointmentPage = () => {
    return(
        <div className="App" id="outer-container">
        <AppBar/>
        <div className='notFound'>
        <Appointment/>
        </div>
      </div>
    );
}