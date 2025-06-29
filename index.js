const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const route = require("./src/routes/index");
const connect = require("./src/config/connectDB");

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(morgan("dev"));
route(app);
connect.connectDB();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
