const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

//Initializations
const app = express();

//Port settings
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/contact", require("./routes/contact"));

//Start server
app.listen(app.get("port"), () => {
  console.log("Server running on port", app.get("port"));
});
