const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/plans", require("./routes/planRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);

