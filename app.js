if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./api/routes/UserRouter");
const BrandRouter = require("./api/routes/BrandRouter");
const SneakersRouter = require("./api/routes/SneakersRouter");
const PackageRouter = require("./api/routes/PackageRouter");
const cors = require("cors");

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log("DB connected");
  }
);

app.use("/api/brand", BrandRouter);
app.use("/api/sneakers", SneakersRouter);
app.use("/api/package", PackageRouter);
app.use("/api/user", UserRouter);

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("App is listening on port " + port);
});
