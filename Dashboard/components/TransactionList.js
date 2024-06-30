import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9002/transactions"
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("There was an error fetching the transactions!", error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:9002/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("There was an error deleting the transaction!", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Transactions</h1>
      <TransactionForm fetchTransactions={fetchTransactions} />
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.amount} - {transaction.type}
            <button onClick={() => deleteTransaction(transaction._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
