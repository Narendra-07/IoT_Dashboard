"use strict"
require('./config/Config');
require('./config/passportConfig');
const express = require('express');
const bodyParser = require('body-parser') // middleware (receive json data from client)
const app = express();
//const User = require('./userListModel') //created model loading here
//const userList = require('./userListController.js')
//  const ctrlUser = require('./controller/user.controller.js');
const ctrlUsers = require('./controller/users.controller.js');
const ctrlRole = require('./controller/masterRole.controller.js');
const ctrlCustomer = require('./controller/customer.controller.js');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const uri = 'mongodb://192.168.0.151:27017/userdb';

//DB Connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  console.log("DB Connected!");
}).catch(err => {
  console.log(Error, err.message);
  console.log("mongo db error");
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//add cors header (making client side request)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

//register api
// app.post('/register', ctrlUser.register);
app.post('/registerUsers', ctrlUsers.register);

//login api
app.post('/authenticate', ctrlUsers.authenticate);

app.post('/role', ctrlRole.setRole);
app.get('/role', ctrlRole.list_all_roles);

app.post('/addCustomer', ctrlCustomer.register);
app.get('/getCustomer', ctrlCustomer.list_all_customer);
// app.get('/getCustomerFromPath', ctrlCustomer.getCustomer);
app.post('/customerPath', ctrlCustomer.postCustomerPath);

app.get('/getUser', ctrlUsers.list_all_user);

app.get('*', (req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})
//routes
require('./routes/device.routes')(app);

app.listen(3000, '127.0.0.1', function () {
  console.log("server listen on port 3000");
  //if (err) console.log(err);
});











// API using CRUD opration
// app.get('/users', userList.list_all_users);
// app.post('/users', userList.create_a_user);

// app.get('/users/:userId', userList.read_a_user)
// app.put('/users/:userId', userList.update_a_user)
// app.delete('/users/:userId', userList.delete_a_user);
