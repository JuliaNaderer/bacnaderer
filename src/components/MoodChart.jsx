import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css'; // Ensure you have the correct CSS import
import '../MoodChart.css';
import { Timestamp } from 'firebase/firestore';
import { scaleOrdinal } from 'd3-scale';

const MoodChart = ({ moods, emojis }) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const colorScale = scaleOrdinal()
    .domain(moods.map((moodEntry) => moodEntry.mood))
    .range(moods.map((moodEntry) => moodEntry.color));

  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(currentDate);

  const data = moods.map(mood => {
    if (mood.date instanceof Timestamp) {
      const date = mood.date.toDate();
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

      return {
        date: formattedDate,
        count: mood.mood + 1,
        color: mood.color,
      };
    } else {
      console.error('mood.date is not a Firestore Timestamp:', mood.date);
      return null;
    }
  }).filter(Boolean);

  const filteredData = data.filter(d => new Date(d.date) >= startDate && new Date(d.date) <= endDate);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.querySelectorAll('.react-calendar-heatmap rect').forEach((rect) => {
        const dataObj = filteredData.find(d => d.date === rect.getAttribute('data-for-date'));
        if (dataObj) {
          rect.setAttribute('style', `fill: ${dataObj.color} !important;`);
        }
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [filteredData]);

  const showDate = (date) => {
    document.getElementById("date-selected").innerText = date;
  }

  return (
    <div className="mood-chart">
      <div className="date-picker-container">
        <p className="date-label">Start Date</p>
        <DatePicker className="datepicker" selected={startDate} onChange={date => setStartDate(date)} />
        <p className="date-label">End Date</p>
        <DatePicker className="datepicker" selected={endDate} onChange={date => setEndDate(date)} />
      </div>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        gutterSize={1}
        values={filteredData}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          return { 'data-tip': value ? value.date : '' };
        }}
        onClick={(value) => {
          if (value) {
            showDate(value.date);
          }
        }}
      />
      <p id="date-selected" className="date-selected"></p>
    </div>
  );
};

export default MoodChart;
