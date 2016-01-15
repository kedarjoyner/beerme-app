var express = require('express');
var app = express();
app.use(express.static('public'));


var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('859bf6f8fdcf9f9cd2b69cdf21253a12');

app.get('/beers', function (req, res) {
  brewdb.search.beers({ q: "dogfish" }, function(error, data) {
  	console.log(error);
  	console.log(data); // beer
  	res.json(data) //terminates search
  });
});


var server = app.listen((process.env.PORT || 3000), function () {  
});