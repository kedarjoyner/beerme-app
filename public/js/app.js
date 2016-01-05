
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
		name: userInput
	}

	$.ajax({
		url: 'http://api.brewerydb.com/v2/beers',
		data: params,
		dataType: 'json',
		type: 'GET'
	}).done(function(data) {
		console.log(data);
	})
}






//function showResults(results, function(index, ))



//http://api.brewerydb.com/v2/beers?name=Fantasy%20Factory&key=859bf6f8fdcf9f9cd2b69cdf21253a12
//api requires CORS, not allowing me to grab data from JSON. Link works in browser.