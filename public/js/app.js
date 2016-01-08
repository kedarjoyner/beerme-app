$(document).ready(function() {
	console.log("Is this thing on?");
	//$(".results-template").hide();

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
		//name: userInput,
		withBreweries: "Y",
		type: "beer"
	}

	$.ajax({
		url: 'http://api.brewerydb.com/v2/search',
		data: params,
		dataType: 'json',
		type: 'GET'
	}).done(function(data) {
		showBeerResults(data);
		console.log(data);
	})
}

function showBeerResults(results) {
	// data is defined by api. results turns into what user's input. ".data" allows access into object
	var peeledResults = results.data;
	var brewery
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
		var breweryName = item.breweries;
			$.each(breweryName, function(index, item) {
				console.log(item.name)
				console.log(item.website);
			});
		var template =	'<dl class="results">' +
			'<dt>Name</dt>' +
				'<dd class="name">'+ name +'</dd>' +
			'<dt>Abv<dt>' +
				'<dd class="abv">'+ abv +'</dd>' +
			'<dt>Catgory</dt>' +
				'<dd class="category">'+ category +'</dd>' +
			'<dt>Date Created</dt>' +
				'<dd class="created">' + created +'</dd>' +
			'<dt>Description</dt>' +
				'<dd class="description">' + description +'</dd>' +
			'<dt>Brewery Name</dt>' +
				'<dd class="brewery-name">'+ breweryName +'</dd>' 
		'</dl>';

			console.log(template);
			$(".results-template").removeClass("hidden");
			$(".results-template .col-lg-12").append(template);
	});
}






// var answererElem = result.find('.profile-link a');
// 	answererElem.attr( 'href', answerer.user.link );
// 	answererElem.text( answerer.user.link );

// // Set the question properties in result

// 	var answererElem = result.find('.profile-link a');
// 	answererElem.attr( 'href', answerer.user.link );
// 	answererElem.text( answerer.user.link );

// $.each(result.items, function(i, item) { // looping through items
// 			var question = showQuestion(item);
// 			$('.results').append(question);
// 		});


// //	.done(function(result){ //this waits for the ajax to return the result. result object is created
// 		var searchResults = showSearchResults(tag, result.items.length ); // showing 30

// 		$('.search-results').html(searchResults); // make html what searchResults returns
// 		//$.each is a higher order function. It takes an array and a function as an argument.
// 		//The function is executed once for each item in the array.
// 		$.each(result.items, function(i, item) { // looping through items
// 			var answerer = showAnswerers(item);
// 			$('.results').append(answerer);
// 		});



//http://api.brewerydb.com/v2/beers?name=Fantasy%20Factory&key=859bf6f8fdcf9f9cd2b69cdf21253a12
//api requires CORS, not allowing me to grab data from JSON. Link works in browser.