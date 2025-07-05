const express = require('express');
const app = express();
const cors = require('cors');

// ✅ Middleware - must come BEFORE routes
app.use(cors());
app.use(express.json()); // ✅ This is important and must come early

// ✅ Routes
const userRoutes = require('./routes/userRoutes');
const taxRoutes = require('./routes/taxRoutes');

app.use('/api/users', userRoutes); // Register user routes
app.use('/api/tax', taxRoutes);    // Register tax routes

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
