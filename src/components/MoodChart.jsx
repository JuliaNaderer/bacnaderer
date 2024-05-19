import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './MoodChart.css';

const MoodChart = ({ moods }) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(currentDate);

  const data = moods.map(mood => {
    const date = mood.date.toDate();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    return {
      date: formattedDate,
      count: mood.mood + 1,
      color: mood.color,
    };
  });

  const filteredData = data.filter(d => new Date(d.date) >= startDate && new Date(d.date) <= endDate);

  return (
    <div>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        gutterSize={1}
        tooltipDataAttrs={value => {
          // Add title attribute to cell
          return {
            title: value ? `Stimmung: ${value.count}` : '',
          };
        }}
        values={filteredData}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
      />
    </div>
  );
};

export default MoodChart;