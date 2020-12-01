const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/store', {
  useNewUrlParser: true
});


// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    price: req.body.price,
    user: req.body.user,
    description: req.body.description,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/api/users', async(req,res) => {
  const user = new User({
    name: req.body.name,
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the store.
const itemSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  path: String,
  user: String,
});

const userSchema = new mongoose.Schema({
    name: String,
});

// Create a model for items in the store.
const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);

// Upload a photo. 
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

//Delete Items
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete('/api/users/:id', async (req,res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

//Edit Items
app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title; 
    item.user = req.body.user;
    item.price = req.body.price;
    item.description = req.body.description;
    item.save();
  } catch (error) {
    res.sendStatus(500);
  }
});

//HOME PAGE
// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/api/users', async(req,res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch(error) {
    res.sendStatus(500);
  }
});



app.listen(3000, () => console.log('Server listening on port 3000!'));
