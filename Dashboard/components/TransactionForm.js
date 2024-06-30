import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ fetchTransactions }) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:9002/transactions', { amount, type }, config);
      fetchTransactions();
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="savings">Savings</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
