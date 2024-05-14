import React, { useState } from 'react';
import '../App.css';
import { ButtonGroup, Button} from '@mui/material';
import {Mood} from './Mood';
import {Appointment} from './Appointment';
import {Survey} from './Survey';
import AppBar from '../AppBar';

export const Dashboard = () => {
  const [active, setActive] = useState("Appointments");

  return (
    <div className="App" id="outer-container">
      <AppBar/>
      <div id="page-wrap">
      </div>
      <br></br>
      <div>
      <ButtonGroup style={{ margin: "auto" }}  
                    variant="contained" 
                    aria-label="outlined primary button group"> 
                    <Button onClick={() => setActive("Appointments")}>Appointments</Button>
                    <Button onClick={() => setActive("Surveys")}>Surveys</Button> 
                    <Button onClick={() => setActive("Mood")}>Mood</Button> 
                </ButtonGroup> 
      </div>
      <br></br>
      <div>
        {active === "Mood" && <Mood/>}
        {active === "Surveys" && <Survey/>}
        {active === "Appointments" && <Appointment/>}
      </div>
    </div>
  );
}