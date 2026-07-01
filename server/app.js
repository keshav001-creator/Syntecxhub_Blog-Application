const  express =require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/routes/authRoutes.js");
const postRoutes = require("./src/routes/postRoutes.js");


const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

module.exports = app;