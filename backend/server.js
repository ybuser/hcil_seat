const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Seat = require('./models/Seat');
const EditorPassword = require('./models/EditorPassword');
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@hcil-seat.yi9pwr7.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connnect to MongoDB:', error));


app.get('/', (req, res) => {
    res.send("Hello from Backend");
});

// Get all seats
app.get('/seats', async (req, res) => {
    try {
        const seats = await Seat.find();
        res.json(seats);
    } catch (error) {
        res.status(500).send("Error fetching seats");
    }
});
  
// Update seat
app.put('/seat/:id', async (req, res) => {
    try {
        const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(seat);
    } catch (error) {
        res.status(500).send("Error updating seat");
    }
});
  
// Check editor password
app.post('/check-password', async (req, res) => {
    try {
        const passwordDoc = await EditorPassword.findOne();
        if (passwordDoc && passwordDoc.password === req.body.password) {
            res.json({ valid: true });
        } else {
            res.json({ valid: false });
        }
    } catch (error) {
        res.status(500).send("Error checking password");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

