// server.js (or index.js)
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Server } from 'socket.io';
import http from 'http';
import axios from 'axios';
import dotenv from 'dotenv';

// Custom authentication middleware

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(cors()); // Use the cors middleware
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection using MongoDB Atlas connection string
const mongoURI = "mongodb+srv://anshit:anshit@cluster0.ismfsim.mongodb.net/finance"; // Replace 'your_mongodb_atlas_connection_string' with your actual MongoDB Atlas connection string
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Secret key (this should be stored securely and not hard-coded in real applications)
const secretKey = 'your_secret_key';

// const server = http.createServer(app);

 const server = http.createServer(app).listen(9003, function(){
  console.log("Express server listening on port " + 9003);
});
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"] // Adjust this to your frontend's URL in a production environment
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
    const { sender, receiver, message } = data;
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Mock data for storing OTPs temporarily
let otpData;

// POST endpoint to send OTP
app.post('/sendOTP', (req, res) => {
    const { email } = req.body;
    if (email) {
        const randomOTP = Math.floor(1000 + Math.random() * 9000);
        console.log('Generated OTP:', randomOTP);

        // Configure nodemailer with your email service
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Replace with your email address
                pass: process.env.EMAIL_PASSWORD, // Replace with your email password or an app-specific password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL, // Sender email address
            to: email, // Receiver email address
            subject: 'Your OTP for SignUp',
            text: `Your OTP is: ${randomOTP}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending the required OTP.');
            } else {
                console.log('Email sent:', info.response);
                // Mocking the email sending process
                console.log(`Sending OTP ${randomOTP} to ${email}`);
                otpData= randomOTP;
                res.status(200).json({ message: 'OTP sent successfully.' });
            }
        });
    } else {
        res.status(400).send('Invalid request.');
    }
});


// POST endpoint to verify OTP and signup
app.post('/verifyOTP', (req, res) => {
    const { email, otp } = req.body;
    if (email && otp) {
        if (otp == otpData) {
            // Clear OTP data after successful verification
            console.log("hurray");
            res.status(200).send('OTP verified successfully');
        } else {
            res.status(400).send('Invalid OTP');
        }
    } else {
        res.status(400).send('Invalid request.');
    }
});


// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        const savedUser = await newUser.save(); // Save the new user to the database
        const userId = savedUser._id; // Get the user ID from the saved user object
        // res.status(201).send('User registered successfully.');
        res.status(201).json({ message: 'User Registered Successfully successfully.', userId:userId});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user. Please try again later.');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid credentials.');
        }
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '7d' });
        console.log(token);
        console.log(req.body);
        res.json({ userId: user._id, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in. Please try again later.');
    }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401); // Unauthorized if no token provided
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.sendStatus(403); // Forbidden if token is invalid or expired
        }
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense', 'savings'], required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);



const IncomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Income = mongoose.model('Income', IncomeSchema);


const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', ExpenseSchema);


const SavingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Saving = mongoose.model('Saving', SavingSchema);


// Transactions
app.post('/transactions', authenticateToken, async (req, res) => {
  try {
    const newTransaction = new Transaction({ ...req.body, userId: req.user.id });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.put('/api/transactions/:id', authenticateToken, async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/api/transactions/:id', authenticateToken, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json("Transaction deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/income', authenticateToken, async (req, res) => {
  try {
    const newIncome = new Income({ ...req.body, userId: req.user.id });
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/income', authenticateToken, async (req, res) => {
  try {
    const incomeRecords = await Income.find({ userId: req.user.id });
    res.status(200).json(incomeRecords);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/api/income/:id', authenticateToken, async (req, res) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedIncome);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/api/income/:id', authenticateToken, async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json("Income record deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Expenses
app.post('/api/expenses', authenticateToken, async (req, res) => {
  try {
    const newExpense = new Expense({ ...req.body, userId: req.user.id });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/expenses', authenticateToken, async (req, res) => {
  try {
    const expenseRecords = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenseRecords);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/api/expenses/:id', authenticateToken, async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/api/expenses/:id', authenticateToken, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json("Expense record deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Savings
app.post('/api/savings', authenticateToken, async (req, res) => {
  try {
    const newSaving = new Saving({ ...req.body, userId: req.user.id });
    const savedSaving = await newSaving.save();
    res.status(201).json(savedSaving);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/savings', authenticateToken, async (req, res) => {
  try {
    const savingsRecords = await Saving.find({ userId: req.user.id });
    res.status(200).json(savingsRecords);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/api/savings/:id', authenticateToken, async (req, res) => {
  try {
    const updatedSaving = await Saving.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSaving);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/api/savings/:id', authenticateToken, async (req, res) => {
  try {
    await Saving.findByIdAndDelete(req.params.id);
    res.status(200).json("Savings record deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
// Start the server
const port = 9002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});