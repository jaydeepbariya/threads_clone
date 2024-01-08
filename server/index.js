const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/Auth");
const followRouter = require("./routes/Follow");
const postRouter = require("./routes/Post");
const profileRouter = require("./routes/Profile");
const userRouter = require("./routes/User");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server Running on port ${port}`));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);


app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/posts/", postRouter);
app.use("/api/v1/users/", followRouter);
app.use("/api/v1/profile/", profileRouter);
app.use("/api/v1/users/", userRouter);

dbConnect();
cloudinaryConnect();
