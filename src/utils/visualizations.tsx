
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';

export const SimpleBarChart = ({ data, dataKey, fill = "#8884d8" }: { data: any[]; dataKey: string; fill?: string }) => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey={dataKey} fill={fill} />
    </BarChart>
  </ResponsiveContainer>
);

export const SimpleLineChart = ({ data, dataKey, stroke = "#8884d8" }: { data: any[]; dataKey: string; stroke?: string }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey={dataKey} stroke={stroke} />
    </LineChart>
  </ResponsiveContainer>
);
