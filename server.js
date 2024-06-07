require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(process.env.MONGOURI)

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
