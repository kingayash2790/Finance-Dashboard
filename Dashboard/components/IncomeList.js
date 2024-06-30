import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncomeForm from './IncomeForm';

const IncomeList = () => {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    const response = await axios.get('/api/income');
    setIncome(response.data);
  };

  const deleteIncome = async (id) => {
    await axios.delete(`/api/income/${id}`);
    fetchIncome();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Income</h1>
      <IncomeForm fetchIncome={fetchIncome} />
      <ul>
        {income.map(record => (
          <li key={record._id}>
            {record.amount}
            <button onClick={() => deleteIncome(record._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeList;
