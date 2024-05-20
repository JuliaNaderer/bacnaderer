import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './MoodChart.css';
import firebase from 'firebase/app';
import { Timestamp } from 'firebase/firestore';

const MoodChart = ({ moods }) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

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

//   const data = moods.map(mood => {
//     if (mood.date instanceof Timestamp) {
//       const date = mood.date.toDate();
//       const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
//       return {
//       date: formattedDate,
//       count: mood.mood + 1,
//       color: mood.color,
//     };
// } else {
//   console.error('mood.date ist kein Firestore-Zeitstempel:', mood.date);
// }
// });

//   const filteredData = data.filter(d => new Date(d.date) >= startDate && new Date(d.date) <= endDate);

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

  // useEffect(() => {
  //   // Durchlaufen Sie alle SVG-Rechtecke
  //   document.querySelectorAll('.react-calendar-heatmap rect').forEach((rect) => {
  //     // Finden Sie das entsprechende Datenobjekt
  //     const dataObj = filteredData.find(d => d.date === rect.getAttribute('data-for-date'));
  //     if (dataObj) {
  //       // Setzen Sie die Füllfarbe des Rechtecks auf die Farbe des Datenobjekts
  //       rect.style.fill = dataObj.color;
  //     }
  //   });


  console.log(filteredData); 

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
            title: value ? `Mood: ${value.count}` : '',
          };
        }}
        values={filteredData}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          // Ersetzen Sie alle nicht-alphanumerischen Zeichen in der Farbe durch Bindestriche
          const colorClass = value.color.replace(/[^a-z0-9]/gi, '-');
          return `color-scale-${colorClass}`;
        }}
      />
    </div>
  );
};

export default MoodChart;