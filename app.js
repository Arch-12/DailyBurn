const express = require('express');
const userModel = require('./Model/User');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/add', async (req, res) => {
  try {
    // Check if the email or phone number is already registered
    const existingUser = await userModel.findOne({ $or: [{ email: req.body.email }, { phno: req.body.phno }] });
    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === req.body.email ? 'Email already exists.' : 'Phone number already exists.',
      });
    }

    await new userModel(req.body).save();
    res.send('Registration successful!');
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed. Please check the console for details. ' });
  }
});

app.post('/login', async (req, res) => {
  try {
    // Check if the username and password match a registered user
    const user = await userModel.findOne({ username: req.body.username, password: req.body.password });

    if (user) {
      res.json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed. Please check the console for details.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Connected To Localhost port ${PORT}`);
});