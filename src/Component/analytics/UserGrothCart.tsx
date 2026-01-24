import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface GrowthData {
  date: string;
  value: number;
}

const data: GrowthData[] = [
  { date: 'Jan 1', value: 56 }, { date: 'Jan 2', value: 36 },
  { date: 'Jan 3', value: 37 }, { date: 'Jan 4', value: 45 },
  { date: 'Jan 5', value: 31 }, { date: 'Jan 6', value: 28 },
  { date: 'Jan 7', value: 33 }, { date: 'Jan 8', value: 52 },
  { date: 'Jan 9', value: 20 }, { date: 'Jan 10', value: 22 },
  { date: 'Jan 11', value: 80 }, { date: 'Jan 12', value: 64 },
  { date: 'Jan 13', value: 51 }, { date: 'Jan 14', value: 40 },
  { date: 'Jan 15', value: 88 },
];

const UserGrowthChart: React.FC = () => {
  return (
    <div className="w-full mt-6 p-2.5 md:p-6 bg-white rounded-xl shadow-sm font-sans">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-black leading-[120%]  mb-6">User Growth (Last 30 Days)</h2>
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">January</p>
      </div>

      {/* Recharts BarChart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6B7280' }} />
            <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} />
            <Tooltip
              contentStyle={{ fontSize: 12, backgroundColor: '#F9FAFB', borderRadius: 6 }}
            />
            <Bar
              dataKey="value"
              fill="#8B5CF6"
              radius={[6, 6, 0, 0]} // rounded top corners
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;
