$(document).ready(function() {
	console.log("Is this thing on?");
	$("#button-search").click(function() {
		var userInput = $("#read-search").val(); //capture user input
		$("#read-search").val(""); // restore user input to placeholder text
		getRequest(userInput);		
	});
});

function getRequest(userInput) {

	var params = {
		key: "859bf6f8fdcf9f9cd2b69cdf21253a12",
		q: userInput,
		withBreweries: "Y",
		type: "beer",
		order: name
	}

	$.ajax({
		url: 'http://api.brewerydb.com/v2/search',
		data: params,
		dataType: 'json',
		type: 'GET'
	}).done(function(data) {
		showBeerResults(data);

		//update number of search results spans
		var numberOfResults = $("dl").length;
		$("#result-number").text(numberOfResults);
		$("#search-result").text(userInput);
		//console.log(data);
	})
}

function showBeerResults(results) {
	// data is defined by api. results turns into what user's input. ".data" allows access into object
	var peeledResults = results.data;
	console.log(results.data);

	// iterate through results and append to page
	// index keeps track of position
	// item can be named anything. item is what allows us to access the info inside the object
	$.each(peeledResults, function(index, item) {
		var name = item.name;
		var abv = item.abv;
		var category = item.style.category.name;
		var created = item.createDate;
		var description = item.style.description;

		// append items to page using a template
		var template =	'<dl class="results">' +
			'<dt>Beer Name:</dt>' +
				'<dd class="name">'+ name +'</dd>' +
			'<dt>Abv:<dt>' +
				'<dd class="abv">'+ abv +'</dd>' +
			'<dt>Category:</dt>' +
				'<dd class="category">'+ category +'</dd>' +
			'<dt>Date Created:</dt>' +
				'<dd class="created">' + created +'</dd>' +
			'<dt>Description:</dt>' +
				'<dd class="description">' + description +'</dd>' 
				+ displayBreweries(item.breweries);
			'</dl>';

			//remove hidden cass, append template
			$(".results-template").removeClass("hidden");
			$(".results-template .col-lg-12").append(template);
	});
}

// how come I don't need (index, item) below?
var displayBreweries = function(breweries) {
	var breweriesTemplate = "";
	$.each(breweries, function(index, item) {
		breweriesTemplate = breweriesTemplate + '<dt>Brewery Name:</dt>' +
				'<dd class="brewery-name">'+ item.name +'</dd>' 
			+ '<dt>Brewery Website:</dt>' +
				'<dd class="brewery-website"><a href="' + item.website + '"target="_blank">'+ item.website +'</a><dd>';
	});
	return breweriesTemplate;
}




//http://api.brewerydb.com/v2/beers?name=Fantasy%20Factory&key=859bf6f8fdcf9f9cd2b69cdf21253a12
//api requires CORS, not allowing me to grab data from JSON. Link works in browser.