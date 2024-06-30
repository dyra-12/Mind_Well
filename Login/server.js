const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4255;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/react-mongodb-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User schema and model
const userSchema = new mongoose.Schema({

  username: String,
  email: String,
  name:String,
  password: String,
 
});

const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, name,email, password} = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  //const hashedPassword = password;


  // Create a new user
  const newUser = new User({ username, name,email, password: hashedPassword});

  try {
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Passwords match, user is authenticated
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
});

app.post('/api/getName', async (req, res) => {
  const { username } = req.body;

  try {
    // Find the user in the database based on the provided username
    const user = await User.findOne({ username });

    if (user) {
      // Return the name if the user is found
      res.status(200).json({ name: user.name });
    } else {
      // If the user is not found, return an error message
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: 'Error fetching name' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
