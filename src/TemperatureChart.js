import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

const TemperatureChart = ({ data }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const ctx = document.getElementById('temperature-chart');
      const labels = data.map(entry => new Date(entry.timestamp));
      const temperatures = data.map(entry => entry.temperature); 

      if (chart) {
        chart.destroy(); 
      }

      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Temperature (°C)',
            data: temperatures,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                locale: enUS, 
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });

      setChart(newChart);
    }
  }, [data, chart]);

  return <canvas id="temperature-chart" />;
};

export default TemperatureChart;
