import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface VehicleCountData {
  N: number[];
  S: number[];
  E: number[];
  W: number[];
}

const VehicleCountLineGraph: React.FC<{ data: VehicleCountData }> = ({ data }) => {
//   const labels = data.N ? Array.from({ length: data.N.length }, (_, i) => `${i}`) : [];


const maxEntries = 20;

  // Adjust labels to only include the last 20 entries
  const labels = Array.from({ length: data.N.length }, (_, i) => `${i}`).slice(-maxEntries);



  

  const chartData = {
    labels,
    datasets: [
      {
        label: 'North',
        // data: data.N || [],
        data: (data.N || []).slice(-maxEntries), // Apply the same for N, S, E, W
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
        {
            label: 'South',
            // data: data.S || [],
            data: (data.S || []).slice(-maxEntries), // Apply the same for N, S, E, W
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
            label: 'East',
            // data: data.E || [],
            data: (data.E || []).slice(-maxEntries), // Apply the same for N, S, E, W
            borderColor: 'rgb(255, 205, 86)',
            backgroundColor: 'rgba(255, 205, 86, 0.5)',
        },
        {
            label: 'West',
            // data: data.W || [],
            data: (data.W || []).slice(-maxEntries), // Apply the same for N, S, E, W
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        // max: 10,
        max: 20
        // left hide 



      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default VehicleCountLineGraph;