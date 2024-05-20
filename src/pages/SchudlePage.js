import {Appointments} from '../components/Appointments';
import 'react-datepicker/dist/react-datepicker.css';
import AppBar from './AppBar';

export const SchedulePage = () => {
    return (
    <div className="App" id="outer-container">
        <AppBar/>
        <h2>Appointments</h2>
        <Appointments/>
    </div>
    );
};