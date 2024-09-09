import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { ChartContainer, ChartTooltipContent } from "@/components/ui/charts"

const Dashboard = () => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineData, setLineData] = useState({ labels: [], data: [] });
  const [barData, setBarData] = useState({ labels: [], data: [] });
  const [pieData, setPieData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candlestickResponse = await fetch('http://127.0.0.1:8000/api/candlestick-data/');
        const lineResponse = await fetch('http://127.0.0.1:8000/api/line-chart-data/');
        const barResponse = await fetch('http://127.0.0.1:8000/api/bar-chart-data/');
        const pieResponse = await fetch('http://127.0.0.1:8000/api/pie-chart-data/');

        const candlestickJson = await candlestickResponse.json();
        setCandlestickData(candlestickJson.data);

        setLineData(await lineResponse.json());
        setBarData(await barResponse.json());
        setPieData(await pieResponse.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatLineData = () => {
    return lineData.labels.map((label, index) => ({
      name: label,
      value: lineData.data[index]
    }));
  };

  const formatBarData = () => {
    return barData.labels.map((label, index) => ({
      name: label,
      value: barData.data[index]
    }));
  };

  const formatPieData = () => {
    return pieData.labels.map((label, index) => ({
      name: label,
      value: pieData.data[index]
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Candlestick Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={candlestickData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="open" stroke="#8884d8" />
              <Line type="monotone" dataKey="close" stroke="#82ca9d" />
              <Line type="monotone" dataKey="high" stroke="#ffc658" />
              <Line type="monotone" dataKey="low" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formatLineData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formatBarData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pie Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={formatPieData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {formatPieData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;