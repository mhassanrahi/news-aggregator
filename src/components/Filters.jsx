import { useState } from 'react';

function Filters({ onFilter, onReset }) {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [country, setCountry] = useState('');
  const [selectedDataSource, setSelectedDataSource] = useState('');

  const handleFilter = () => {
    onFilter({ date, category, source, country, selectedDataSource });
  };

  const handleReset = () => {
    setDate('');
    setCategory('');
    setSource('');
    setCountry('');
    setSelectedDataSource('');
    onReset();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">All</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">Data Source:</label>
        <select
          id="source"
          value={selectedDataSource}
          onChange={(e) => setSelectedDataSource(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">All</option>
          <option value="newsapi">News API</option>
          <option value="guardian">The Guardian</option>
          <option value="nytimes">New York Times</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country:</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">All</option>
          <option value="us">United States</option>
          <option value="gb">United Kingdom</option>
          <option value="ca">Canada</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded-md">Apply Filters</button>
        <button onClick={handleReset} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Reset</button>
      </div>
    </div>
  );
}

export default Filters;
