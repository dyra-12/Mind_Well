// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/react-mongodb-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const avatarSchema = new mongoose.Schema({
    username: String,
    avatarId: String,
});

const Avatar = mongoose.model('Avatar', avatarSchema);

app.post('/api/updateAvatar', async (req, res) => {
    const { username, avatarId } = req.body;

    try {
        const newAvatar = new Avatar({ username, avatarId });
        await newAvatar.save();
        res.status(201).json({ message: 'Avatar updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating avatar' });
    }
});

// Add this route before the app.listen() statement in app.js
app.get('/api/getAvatar/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const avatar = await Avatar.findOne({ username });
        if (avatar) {
            res.json({ avatarId: avatar.avatarId });
        } else {
            res.status(404).json({ message: 'Avatar not found for the specified username' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching avatarId' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
