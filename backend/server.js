const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const seatRoutes = require('./routes/seatRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/seats', seatRoutes);  // Mount the seatRoutes on '/seats' path

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@hcil-seat.yi9pwr7.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connnect to MongoDB:', error));


app.get('/', (req, res) => {
    res.send("Hello from Backend");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

