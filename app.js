const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const memberRoutes = require('./routes/memberRoute');

dotenv.config({path : './config.env'});


//Mongo Cloud Database
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('DB connection successful!'));



app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


//middleware
app.use(methodOverride('_method'));

//middleware
app.use(session({
    secret : "nodejs",
    resave : true,
    saveUninitialized:true
}));

//middleware
app.use(flash());

//Messages
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    next();
});

app.use(memberRoutes);

const port = process.env.PORT;
app.listen(port, ()=> {
    console.log('Server is started.');
});