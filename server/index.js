require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const Auth = require("./routes/authRoutes");
const Picture = require("./routes/pictureRoutes");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", Auth)
app.use("/", Picture)

app.listen(PORT, async () => {
  await connect();
  console.log(`listening at http://localhost:${PORT}`)
})
