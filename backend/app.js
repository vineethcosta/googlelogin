
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();
const PORT = 5000;
const URL = "mongodb+srv://SA1:reactassignment@cluster0.jopsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";   //mongo cluster URL

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo Database cluster");
});
mongoose.connection.on("error", (err) => {
  console.log("error while connecting to the mongo database : ", err);
});

require("./models/user");


app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(require("./routes/auth"));


app.listen(PORT, () => {
  console.log("Server is running under port 5000 ...");
});
