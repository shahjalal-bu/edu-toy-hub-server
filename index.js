//configure dot env
require("dotenv").config();
const express = require("express");
const path = require("path");
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
// app.get("/", async (req, res) => {
//   res.send("Server running");
// });
app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "index.html");

  res.sendFile(htmlFilePath, (err) => {
    if (err) {
      console.error("Error sending HTML file:", err);
      res.status(500).send("Internal Server Error");
    }
  });
});
app.use("/toys", toysRouter);

app.listen(port, () => {
  console.log(`Edutoyshub listening on port ${port}`);
});
