import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-scroll';
import './Data.css';
import { Chart, LinearScale, BarController, BarElement, CategoryScale } from 'chart.js';
import download from './file.png'
const Data = () => {
  const [data, setData] = useState('');
  const [wordFrequency, setWordFrequency] = useState({});
  const chartDataInstance = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const text = await response.text();
      setData(text);
      calculateWordFrequency(text);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (wordFrequency && Object.keys(wordFrequency).length > 0) {
      renderChart();
    }
  }, [wordFrequency]);

  useEffect(() => {
    fetchData();
  }, []);

  const calculateWordFrequency = (text) => {
    const words = text.split(/\s+/);
    const frequency = {};

    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    setWordFrequency(frequency);
  };

  const renderChart = () => {
    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);
    const labels = sortedWords.slice(0, 20).map(([word]) => word);
    const counts = sortedWords.slice(0, 20).map(([_, count]) => count);

    const data = {
      labels,
      datasets: [
        {
          label: 'Word Frequency',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };

    Chart.register(LinearScale, BarController, BarElement, CategoryScale); // Register required controllers, elements, and scales

    const ctx = document.getElementById('chart');
    if (ctx) {
      if (chartDataInstance.current) {
        chartDataInstance.current.destroy();
      }
      chartDataInstance.current = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    }
  };

  const downloadCSV = () => {
    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);
    const topWords = sortedWords.slice(0, 20);

    const csvContent = 'data:text/csv;charset=utf-8,' + topWords.map(([word, count]) => `${word},${count}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'top_words.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="data" >
      <div className="text-data">
        <h1>Content</h1>
        {data}
      </div>
     
      
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(wordFrequency).map(([word, count]) => (
            <tr key={word}>
              <td>{word}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="chart-container" >
        <canvas id="chart" />
      </div>
      <div title='Export CSV' className="download" onClick={downloadCSV}>
        <img src={download} alt="img"  />
      </div>
      
    </div>
  );
};

export default Data;
