var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  Product = require('./api/models/product');
  require('dotenv').config({path : '../.env'})
  port = process.env.PRODUCT_PORT || 5050;
mongoose.Promise = global.Promise;
const MONGO_URI =`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@shoppingdb-cluster.z304u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on('connected', () => {
  console.log("Mongoose is connected.");
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require('./api/routes/route');
routes(app);

app.listen(port, () => console.log(`Server Started on Port ${port}...`));
console.log("Please Wait.... Mongoose is Connecting...");