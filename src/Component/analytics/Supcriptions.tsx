import React from 'react';

interface CircularProgressProps {
  value: number;
  maxValue: number;
  label: string;
  color: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, maxValue, label, color }) => {
  const percentage = (value / maxValue) * 100;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 sm:w-44 sm:h-44">
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl sm:text-4xl font-bold text-gray-900">{value.toLocaleString()}</span>
        </div>
      </div>
      <p className="mt-4 text-sm sm:text-base font-medium text-gray-700">{label}</p>
    </div>
  );
};

interface SupplementTagProps {
  name: string;
}

const SupplementTag: React.FC<SupplementTagProps> = ({ name }) => {
  return (
    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-green-50 text-green-700 rounded-full text-xs sm:text-sm font-medium border border-green-200 hover:bg-green-100 transition-colors">
      {name}
    </span>
  );
};

export default function SubscriptionDashboard() {
  const supplements = [
    'Vitamin D3',
    'Magnesium',
    'Probiotics',
    'Omega-3',
    'Folinic Acid',
    'Probiotics',
    'Magnesium',
    'Vitamin D3'
  ];

  return (
    <div className="">
      <div className="">
        {/* Subscription Breakdown Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-2.5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-black leading-[120%]  mb-4">
            Subscription Breakdown
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 justify-items-center">
            <CircularProgress
              value={423}
              maxValue={2223}
              label="Premium Users"
              color="#c2694f"
            />
            <CircularProgress
              value={1800}
              maxValue={2223}
              label="Free Users"
              color="#0d7377"
            />
          </div>
        </div>

        {/* Top Supplements Card */}
        <div className="bg-white rounded-2xl border border-gray-200 mt-6 p-2.5 md:p-6 ">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Top Supplements
          </h2>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {supplements.map((supplement, index) => (
              <SupplementTag key={index} name={supplement} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}