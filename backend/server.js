const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const scanRoutes = require("./routes/scanRoutes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// mongoose
//   .connect("mongodb://localhost:27017/dast", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api", scanRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
