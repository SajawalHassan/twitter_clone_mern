const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const trendsRouter = require("./routes/trends");
const listsRouter = require("./routes/lists");
const repliesRouter = require("./routes/replies");

require("dotenv").config();

// Initializing app
const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Routes middleware
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/trends", trendsRouter);
app.use("/lists", listsRouter);
app.use("/replies", repliesRouter);

// Connecting to db
mongoose.connect(process.env.DB_ACCESS_KEY, () =>
  console.log("Connected to database")
);

// Creating server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
