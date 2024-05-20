import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './MoodChart.css';
import firebase from 'firebase/app';
import { Timestamp } from 'firebase/firestore';
import { scaleOrdinal } from 'd3-scale';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const MoodChart = ({ moods, emojis }) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const colorScale = scaleOrdinal()
    .domain(moods.map((moodEntry) => moodEntry.mood))
    .range(moods.map((moodEntry) => moodEntry.color));

  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(currentDate);

  const data = moods
    .map(mood => {
      if (mood.date instanceof Timestamp) {
        const date = mood.date.toDate();
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        return {
          date: formattedDate,
          count: mood.mood + 1,
          color: mood.color,
        };
      } else {
        console.error('mood.date ist kein Firestore-Zeitstempel:', mood.date);
        return null; // Rückgabe null, wenn mood.date kein Timestamp ist
      }
    })
    .filter(Boolean); // Entfernen Sie alle null-Werte aus dem Array

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

  console.log(filteredData);

  return (
    <div>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        gutterSize={1}
        values={filteredData.map(entry => ({
          ...entry,
          color: entry.color, // Verwenden Sie die Farbe aus dem moodEntry
        }))}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          // optional: fügen Sie hier benutzerdefinierte Attribute hinzu
          return { 'data-tip': `${value.date}: ${value.label}` };
        }}
      />
      <ReactTooltip />
    </div>
  );
};

export default MoodChart;