import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  MonthView,
  DayView,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';


export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.appointments,
      currentViewName: 'work-week',
      currentDate: '2024-05-16',
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };
    this.currentViewNameChange = (currentViewName) => { this.setState({ currentViewName }); };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, addedAppointment, appointmentChanges, editingAppointment, currentViewName } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={800}
        >
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <ViewState
            defaultCurrentDate={Date.now()}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />

          <WeekView
            startDayHour={10}
            endDayHour={19}
          />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={7}
            endDayHour={19}
          />
          <MonthView />
          <DayView />

          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}
