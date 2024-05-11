const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
// dot config
dotenv.config();

// mongoDb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
// test route
app.use("/api/v1/test", require("./routes/testRoutes"));

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node surver running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
      .bgBlue.white
  );
});
