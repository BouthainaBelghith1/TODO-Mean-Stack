import express from 'express';
import mongoose from 'mongoose';
import itemRoutes from './routes/items.js';
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express.json());
// Use item routes for all paths starting with "/api/items"
app.use('/api/items', itemRoutes);
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/orion')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB',
        err));
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;