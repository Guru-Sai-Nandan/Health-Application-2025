import React, { useState } from 'react';
import './Nutrition.css';

const NutritionTable = () => {
  const [foodData, setFoodData] = useState([]);
  const [query, setQuery] = useState('');
  const [isValidInput, setIsValidInput] = useState(true);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsValidInput(true); 
  };
  const [loading, setLoading] = useState(false)
  const fetchData = async () => {
    if (!query.trim()) {
      setIsValidInput(false);
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
        headers: { 'X-Api-Key': 'CtsBM1W8CjPKVaYaK6Y0vw==uHoqn1Wmdcpatig1' },
      });
  
      const result = await response.json();
      if (!result.items || result.items.length === 0) {
        setIsValidInput(false);
        setFoodData([]);
      } else {
        setFoodData(result.items);  
        setIsValidInput(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsValidInput(false);
    } finally {
      setLoading(false);
    }
  };


  const renderTable = () => {
    if (!foodData.length) return null;  // If no data, return nothing
  
    return (
      <div className="w-full flex flex-row flex-wrap justify-center">
        <div className="w-[50%] flex flex-col gap-6 mx-auto mb-10">
          {foodData.map((food, index) => {
            const nutritionData = Object.entries(food)
              .filter(([key]) => key !== 'name' && key !== 'serving_size_g');
  
            return (
              <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-medium mb-4">
                  {food.name} has a total of
                  <h3 className="text-3xl text-[#2ecc71] mt-2">{food.calories} Calories</h3>
                </h2>
  
                <table className="min-w-max bg-white border border-[#2ecc71] rounded-md overflow-hidden mx-auto">
                  <thead className='bg-[#2ecc7160]'>
                    <tr>
                      <th className="text-slate-600 border border-slate-400 py-2.5 px-4">Nutrition</th>
                      <th className="text-slate-600 border border-slate-400 py-2.5 px-4">per 100g</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionData.map(([key, value]) => (
                      <tr key={key}>
                        <td className="text-lg border border-gray-400 font-medium py-2 px-4">
                          {key.replace(/_/g, ' ').toUpperCase()}
                        </td>
                        <td className="text-lg border border-gray-400 font-medium py-2 px-4">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="text-center mt-5 mx-auto">
      <div className='w-[50%] my-4 flex flex-row items-center justify-center mx-auto text-center'>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className={`border border-slate-600 input1 rounded-md px-4 py-2 mr-2 ${isValidInput ? 'border-slate-600' : 'border-red-500'}`}
          placeholder="Search for calories in your food..."
        />
        <button
          onClick={fetchData}
          className="bg-blue-400 max-w-lg button1 font-semibold text-white px-6 py-2 rounded-md"
        >
          Get Nutrition
        </button>
      </div>
  
      {/* Total Calories Display */}
      {foodData.length > 0 && (
        <div className="my-4 text-xl font-semibold text-gray-800">
          Total Calories: <span className="text-[#2ecc71]">{foodData.reduce((sum, food) => sum + food.calories, 0)}</span>
        </div>
      )}
  
      <div className="w-full flex justify-center">
        <div className="w-[70%]">{renderTable()}</div>
      </div>
    </div>
  );
  
};

export default NutritionTable;