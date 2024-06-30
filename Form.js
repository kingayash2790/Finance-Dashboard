import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    bankAccount: '',
    bankName: '',
    investmentAccount: '',
    loanDetails: '',
    transactionHistory: '',
    recurringPayments: '',
    budget: '',
    financialGoals: '',
    stocks: '',
    exchangeRates: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission logic here
  };

  return (
    <div style={{ backgroundColor: '#01033E' }} className="lg:h-[130vh] h-[270vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          border: '2px solid white',
          boxShadow: '0 0 15px 3px white',
        }}
        className="p-8 rounded mt-10 shadow-md w-full max-w-5xl bg-transparent">
        <h1 className="text-center text-3xl font-bold mb-10 text-white">Finance Dashboard Information</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <div className="mb-4">
            <label className="block text-white">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" required />
          </div>

          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" required />
          </div>

          <div className="mb-4">
            <label className="block text-white">Bank Account</label>
            <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-white">Bank Name</label>
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-white">Investment Account</label>
            <input type="text" name="investmentAccount" value={formData.investmentAccount} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-white">Loan/Mortgage Details</label>
            <input type="text" name="loanDetails" value={formData.loanDetails} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-white">Transaction History</label>
            <input type="text" name="transactionHistory" value={formData.transactionHistory} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-white">Recurring Payments</label>
            <input type="text" name="recurringPayments" value={formData.recurringPayments} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-white">Monthly/Annual Budget</label>
            <input type="text" name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-white">Financial Goals</label>
            <input type="text" name="financialGoals" value={formData.financialGoals} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-white">Stocks of Interest</label>
            <input type="text" name="stocks" value={formData.stocks} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-white">Exchange Rates</label>
            <input type="text" name="exchangeRates" value={formData.exchangeRates} onChange={handleChange} className="w-full bg-transparent px-3 py-2 border rounded" />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button type="submit" className="w-2/5 hover:border-2 hover:border-solid hover:border-white text-white py-2 px-4 rounded bg-[#01033E]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
