import React, { useState } from 'react';
import axios from 'axios';

const IncomeForm = ({ fetchIncome }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/income', { amount });
    fetchIncome();
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Add Income</button>
    </form>
  );
}

export default IncomeForm;
