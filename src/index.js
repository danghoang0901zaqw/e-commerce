const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const route = require("./routes/index");
const connect = require("./config/connectDB");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(morgan("dev"));
route(app);
connect.connectDB();
app.use(errorMiddleware);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
