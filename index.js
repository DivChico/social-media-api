const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");

const app = express();

dotenv.config();
mongoose.connect(process.env.MANGO_URL).then(() => {
  console.log("connected to DB");
});

app.get("/", (req, res) => {
  res.send("homepage");
  console.log("homepage");
});

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);

app.listen(8800, () => {
  console.log("backend server started ");
});
