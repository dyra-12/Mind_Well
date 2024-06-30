const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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
    field1: String,
    field2: String,
    emojiId: Number,
});

const Mood = mongoose.model('Mood', userSchema);

// Signup endpoint
app.post('/api/submitMood', async (req, res) => {
    const { field1, field2, emojiId,username } = req.body;
    

    const newMood = new Mood({ username, field1, field2, emojiId });

    try {
        await newMood.save();
        res.status(201).json({ message: 'Mood submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting mood' });
    }
});

// Server-side code

// Server-side code

app.get('/api/getMoods/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const userMoods = await Mood.find({ username });
      if (userMoods.length === 0) {
          return res.status(404).json({ message: 'User not found or no moods found' });
      }

      const moodsData = userMoods.map((mood) => ({
          field1: mood.field1,
          field2: mood.field2,
          emojiId: mood.emojiId,
      }));

      res.status(200).json(moodsData);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving moods' });
  }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
