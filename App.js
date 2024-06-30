import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";

// Components import
import LandingPage from "./components/LandingPage/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/pages/Dashboard";
import Form from "./components/Form";

import TransactionList from "./components/Dashboard/components/TransactionList";
import IncomeList from "./components/Dashboard/components/IncomeList";
import ExpenseList from "./components/Dashboard/components/ExpenseList";
import SavingList from "./components/Dashboard/components/SavingList";

import TransactionForm from "./components/Dashboard/components/TransactionForm";
import IncomeForm from "./components/Dashboard/components/IncomeForm";
import ExpenseForm from "./components/Dashboard/components/ExpenseForm";
import SavingForm from "./components/Dashboard/components/SavingForm";


function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-black">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/form" element={<Form />} />
            

            <Route exact path="/transactionform" element={<TransactionForm />} />
            <Route exact path="/incomeform" element={<IncomeForm />} />
            <Route exact path="/expenseform" element={<ExpenseForm />} />
            <Route exact path="/savingsform" element={<SavingForm />} />
            <Route exact path="/transactionlist" element={<TransactionList />} />
            <Route exact path="/incomelist" element={<IncomeList />} />
            <Route exact path="/expenselist" element={<ExpenseList />} />
            <Route exact path="/savingslist" element={<SavingList />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
