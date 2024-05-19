import { ResponsiveLine } from '@nivo/line'

const MoodChart = ({ moods }) => {
  console.log('Moods:', moods); // Hier wird der Inhalt von moods in der Konsole ausgegeben

  // Konvertieren Sie die moods-Daten in das benötigte Format
  const data = [
    {
      id: 'mood',
      color: 'hsl(169, 70%, 50%)',
      data: moods.map((mood, index) => ({
        x: index,
        y: mood.mood,
      })),
    },
  ];

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'index',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'mood',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};

export default MoodChart;