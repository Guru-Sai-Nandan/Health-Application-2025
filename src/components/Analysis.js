import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Analysis = () => {
  const calorieData = [
    { day: 'Mon', intake: 2200, burnt: 1800 },
    { day: 'Tue', intake: 2000, burnt: 1600 },
    { day: 'Wed', intake: 2500, burnt: 2000 },
    { day: 'Thu', intake: 2300, burnt: 1900 },
    { day: 'Fri', intake: 2400, burnt: 1850 },
    { day: 'Sat', intake: 2600, burnt: 2100 },
    { day: 'Sun', intake: 2250, burnt: 1750 },
  ];

  const micronutrientData = [
    { name: 'Protein', value: 30 },
    { name: 'Carbs', value: 50 },
    { name: 'Fats', value: 20 }
  ];
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Calorie Intake vs Burnt (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={calorieData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="intake" stroke="#8884d8" name="Calorie Intake" />
              <Line type="monotone" dataKey="burnt" stroke="#82ca9d" name="Calorie Burnt" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Micronutrient Distribution (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={micronutrientData} dataKey="value" nameKey="name" outerRadius={100} label>
                {micronutrientData.map((entry, index) => (
                  <Cell key={`cell-${index}} fill={COLORS[index % COLORS.length]`} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">Increase Protein Intake</h3>
              <p className="mt-2 text-gray-600">Consider adding chicken, beans, and dairy products to your diet.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">Boost Healthy Fats</h3>
              <p className="mt-2 text-gray-600">Include nuts, seeds, and olive oil for better fat balance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;