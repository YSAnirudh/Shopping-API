var express = require('express'),
  app = express(),
  port = process.env.PORT || 5051,
  mongoose = require('mongoose'),
  UserCart = require('./api/models/model');
  require('dotenv').config()
mongoose.Promise = global.Promise;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on('connected', () => {
  console.log("Mongoose is connected.");
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require('./api/routes/route');
routes(app);

app.listen(port, () => console.log(`Server Started on Port ${port}...`));
console.log("Please Wait.... Mongoose is Connecting.");