// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express')      // call express
const bodyParser = require('body-parser')
const app        = express()                 // define our app using express
const MongoClient = require('mongodb').MongoClient

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

// ROUTES FOR OUR API
// =============================================================================
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function(req, res) {
    db.collection('collectibles').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {items: result})
  })
});

// more routes for our API will happen here
app.post('/collectibles', (req, res) => {
  db.collection('collectibles').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

// START THE SERVER
// =============================================================================
var db
MongoClient.connect('mongodb://malbinson:berkeley@ds119436.mlab.com:19436/tester', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
