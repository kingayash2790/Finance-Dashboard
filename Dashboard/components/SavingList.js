import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavingForm from './SavingForm';

const SavingList = () => {
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    fetchSavings();
  }, []);

  const fetchSavings = async () => {
    const response = await axios.get('/api/savings');
    setSavings(response.data);
  };

  const deleteSaving = async (id) => {
    await axios.delete(`/api/savings/${id}`);
    fetchSavings();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Savings</h1>
      <SavingForm fetchSavings={fetchSavings} />
      <ul>
        {savings.map(saving => (
          <li key={saving._id}>
            {saving.amount}
            <button onClick={() => deleteSaving(saving._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavingList;
