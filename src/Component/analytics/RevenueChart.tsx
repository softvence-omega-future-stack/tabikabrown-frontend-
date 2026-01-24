import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  
} from 'recharts';

interface RevenueData {
  month: string;
  revenue: number;
}

const data: RevenueData[] = [
  { month: 'Jan', revenue: 1254 },
  { month: 'Feb', revenue: 1100 },
  { month: 'Mar', revenue: 1500 },
  { month: 'Apr', revenue: 1800 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 2000 },
  { month: 'Jul', revenue: 2100 },
  { month: 'Aug', revenue: 1300 },
  { month: 'Sep', revenue: 1700 },
  { month: 'Oct', revenue: 2200 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 2600 },
];

const RevenueChart: React.FC = () => {
  return (
    <div className="w-full p-6 mt-6 bg-white rounded-2xl shadow-sm font-sans border border-gray-100">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-black leading-[120%]  mb-6">Revenue (Monthly)</h2>
        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-1">
          January
        </p>
      </div>

      {/* Chart Container */}
      <div className="w-full h-76">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              {/* Gradient for the area fill */}
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 500 }}
              dy={15}
            />

            {/* Hidden YAxis to maintain layout spacing */}
            <YAxis hide domain={['dataMin - 500', 'dataMax + 500']} />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white px-2 py-1 border border-purple-100 rounded shadow-sm ">
                      <p className="text-sm font-bold text-[#8B5CF6]">
                        ${payload[0].value?.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ stroke: '#8B5CF6', strokeWidth: 1, strokeDasharray: '4 4' }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;