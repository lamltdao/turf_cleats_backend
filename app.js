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
const AuthRouter = require("./api/routes/AuthRouter");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const PackageModel = require("./api/models/PackageModel");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [process.env.BASE_URL],
  })
);

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
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);

app.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 200000,
      currency: "VND",
      description: "An example charge",
      source: req.body.source,
    });
    await PackageModel.create({
      cart: req.body.package.cart,
      address: req.body.package.address,
      totalPrice: req.body.package.totalPrice,
      stripeToken: req.body.source,
    });
    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

const port = process.env.PORT || 2504;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("App is listening on port " + port);
});
