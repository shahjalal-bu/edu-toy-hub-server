//configure dot env
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { toysCollection } = require("./db");
const app = express();
const port = 5000 || process.env.PORT;

//db
require("./db");

//routes
const toysRouter = require("./routes/toys");
//middleware
app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  res.send("Server running");
});
app.use("/toys", toysRouter);

app.listen(port, () => {
  console.log(`Edutoyshub listening on port ${port}`);
});
