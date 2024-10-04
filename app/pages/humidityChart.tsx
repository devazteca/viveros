// humidityChart.tsx

"use client"; // Añade esta línea al principio del archivo

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const HumidityChart: React.FC = () => {
  const [data] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Lógica para obtener y establecer los datos
  }, []);

  return (
    <Line data={data} />
  );
};

export default HumidityChart;
