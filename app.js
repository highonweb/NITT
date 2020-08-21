var express = require('express');
var app = express();
var mongoose = require('mongoose');
var mongoDB='mongodb+srv://dbuser:dbkey@myclouddb-arw5e.mongodb.net/nitt?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

db.on('error', console.error.bind(console, 'connection error:'));// fefef
db.once('open', () => {
  
});

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// serve static files
app.use(express.static('public'));

var routes = require('./routes/router');
app.use('/', routes);

var port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});