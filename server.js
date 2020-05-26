const express = require('express');
const app = express();
const connectDb = require('./config/db');

// Init middlware
app.use(express.json({ extended: false }));

// Connect to database
connectDb();

// Define routes

//Owner Routs
app.use('/api/owner', require('./routes/api/owner/owner'));
app.use('/api/Owner/auth', require('./routes/api//Owner/auth'));
app.use('/api/vehicle', require('./routes/api/owner/vehicle'));

//Customer Routes
app.use('/api/Customer', require('./routes/api/customer/Customer'));
app.use('/api/Customer/auth', require('./routes/api//Customer/auth'));

//SubAdmin Routes
app.use('/api/subAdmin', require('./routes/api/Sub-Admin/subAdmin'));
app.use('/api/subAdmin/auth', require('./routes/api/Sub-Admin/auth'));

//Admin Routes
app.use('/api/Admin', require('./routes/api/Admin/Admin'));
app.use('/api/Admin/auth', require('./routes/api/Admin/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
