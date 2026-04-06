const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

console.log("MONGO_URI:", process.env.MONGO_URI);

// ================= DB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" DB Connected Successfully");
  })
  .catch((err) => {
    console.log(" DB Connection Error:", err);
  });
// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("CRM Backend Running...");
});

app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500).json({
    success: false,
    message: err.message
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});