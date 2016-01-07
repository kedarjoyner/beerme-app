
$(document).ready(function() {
	console.log("Is this thing on?");
	$(".results-template").hide();

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
	})
}

function showBeerResults(results) {
	var peeledResults = results.data;
	var brewery
	console.log(results.data);

	// iterate through results and append to page
	$.each(peeledResults, function(index, item) {
		var name = item.name;
		var abv = item.abv;
		var category = item.style.category.name;
		var description = item.style.description;
		var breweryName = item.breweries;
				$.each(breweryName, function(index, breweries) {
					console.log(breweries.name);
				});
		console.log(name);
		console.log(description);
		console.log(category);
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


//function showResults(results, function(index, ))



//http://api.brewerydb.com/v2/beers?name=Fantasy%20Factory&key=859bf6f8fdcf9f9cd2b69cdf21253a12
//api requires CORS, not allowing me to grab data from JSON. Link works in browser.