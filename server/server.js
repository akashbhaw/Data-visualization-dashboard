const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the 'cors' package
const app = express();

app.use(bodyParser.json());
app.use(cors()); 

// Connect to MongoDB
mongoose.connect('mongodb://localhost/datasetsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// VisualData schema's and model using Mongoose
const VisualDataSchema = new mongoose.Schema({
    end_year: Number,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

const VisualData = mongoose.model('VisualData', VisualDataSchema);

// API endpoint for fetching data from the 'visualdata' collection
app.get('/api/visualdata', async (req, res) => {
  try {
    const data = await VisualData.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch visual data' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('App is running on port', PORT);
});
