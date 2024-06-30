import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await axios.get('/api/expenses');
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`/api/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Expenses</h1>
      <ExpenseForm fetchExpenses={fetchExpenses} />
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            {expense.amount}
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
