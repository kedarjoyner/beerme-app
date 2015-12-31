
$(document).ready(function() {
	console.log("Is this thing on?");

	$("#button-search").click(function() {
		var userInput = $("#read-search").val(); //capture user input
		$("#read-search").val(""); 
		getRequest(userInput);		
	});


});


function getRequest(userInput) {
	var params = {

		//q: format,
		key: "859bf6f8fdcf9f9cd2b69cdf21253a12",
		name: userInput
	}

	var url = "http://api.brewerydb.com/v2/beers"; //endpoint URL

	$.getJSON(url, params, function(data) { // Data is the "variable" defined to store the information from the server.
    	console.log(data);
  	});
}



//http://api.brewerydb.com/v2/beers?name=Fantasy%20Factory&key=859bf6f8fdcf9f9cd2b69cdf21253a12
//api requires CORS, not allowing me to grab data from JSON. Link works in browser.