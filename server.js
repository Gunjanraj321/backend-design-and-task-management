require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const authRoutes = require("./routes/authRoute");
const taskRoutes = require('./routes/taskRoute');
const authMiddleware = require("./middleware/tokenVerify");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(process.env.MONGOURI)

app.use("/auth", authRoutes);
app.use("/task", authMiddleware, taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
