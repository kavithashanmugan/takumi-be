import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoutes from '../routes/taskRoutes.js';

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = db;
  return db;
}

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Takumi!' });
});

app.use('/api/tasks', taskRoutes);

// Create the handler
const handler = async (req, res) => {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Handle the request
    app(req, res);
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;

