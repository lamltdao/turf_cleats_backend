const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserRouter = require('./api/routes/UserRouter');
const BrandRouter = require('./api/routes/BrandRouter');
const SneakersRouter = require('./api/routes/SneakersRouter');
const PackageRouter = require('./api/routes/PackageRouter');
const AuthRouter=require('./api/routes/Auth');
const cors=require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/final_project',
    { useNewUrlParser: true },
    (err) => {
        if (err) console.log(err);
        else console.log('DB connected');

    });

app.use('/api/brand', BrandRouter);
app.use('/api/sneakers', SneakersRouter);
app.use('/api/package', PackageRouter);    
app.use('/api/auth',AuthRouter);
app.use('/api/user', UserRouter);







const port = process.env.port || 2504;
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log('App is listening');
})

