import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HumedadChart = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/humedad');
      const data = await response.json();

      const labels = data.map((entry: any) => new Date(entry.timestamp).toLocaleTimeString());
      const humedadData = data.map((entry: any) => entry.humedad);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Humedad del Suelo',
            data: humedadData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return <Line data={chartData} />;
};

export default HumedadChart;
