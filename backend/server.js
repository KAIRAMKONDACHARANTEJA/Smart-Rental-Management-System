const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth',        require('./routes/authRoutes'));
app.use('/api/properties',  require('./routes/propertyRoutes'));
app.use('/api/tenants',     require('./routes/tenantRoutes'));
app.use('/api/payments',    require('./routes/paymentRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/dashboard',   require('./routes/dashboardRoutes'));
app.use('/api/razorpay',    require('./routes/razorpayRoutes'));

// Root - Login page
app.get('/', (req, res) => {
  res.json({ message: "SRMS Backend Running" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
      console.log(`📂 Frontend: http://localhost:${process.env.PORT}`);
      console.log(`🔗 API Base: http://localhost:${process.env.PORT}/api`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB Failed:', err.message);
    process.exit(1);
  });