const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserRouter = require('./api/routes/UserRouter');
const BrandRouter = require('./api/routes/BrandRouter');
const SneakersRouter = require('./api/routes/SneakersRouter');
const PackageRouter = require('./api/routes/PackageRouter');
const AuthRouter = require('./api/routes/Auth');
const cors = require('cors');
const stripe = require("stripe")("sk_test_ZxqGw3yHax8la8pr4HPJE8h000kRU2ufNk");
const PackageModel=require('./api/models/PackageModel');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: ['https://turfcleats.herokuapp.com','http://localhost:3000']  
}));


mongoose.connect('mongodb+srv://daoletunglam:daoletunglam@cluster0-jxsx8.gcp.mongodb.net/final_project?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    (err) => {
        if (err) console.log(err);
        else console.log('DB connected');

    });

app.use('/api/brand', BrandRouter);
app.use('/api/sneakers', SneakersRouter);
app.use('/api/package', PackageRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);



app.post("/charge", async (req, res) => {
    try {
        console.log(req.body.source)
        let { status } = await stripe.charges.create({
            amount: 200000,
            currency: "VND",
            description: "An example charge",
            source: req.body.source
        });
        await PackageModel.create({
            cart: req.body.package.cart,
            address: req.body.package.address,
            totalPrice: req.body.package.totalPrice,
            stripeToken: req.body.source
        });
        res.json({ status });
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});




const port = process.env.PORT || 2504;
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log('App is listening');
})

