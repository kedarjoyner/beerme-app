$(document).ready(function() {
	console.log("Is this thing on?");
	$("#button-search").click(function(e) {
		e.preventDefault();

		//clear previous results
		$(".results-template .col-lg-12").html("");

		//capture user input
		var userInput = $("#read-search").val();

		// restore user input to placeholder text
		$("#read-search").val(""); 
		getRequest(userInput);		
	});

	// how come I don't need to add userInput here again?
	$("#read-search").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#button-search").click();

	        //clear previous results
			$(".results-template .col-lg-12").html("");
    	}
	});
});

function getRequest(userInput) {

	var params = {
		key: "859bf6f8fdcf9f9cd2b69cdf21253a12",
		q: userInput,
		withBreweries: "Y",
		type: "beer",
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

		// create objects to fix result tenses
		var resultOptions = {
			thereIs: 'There is ',
			result: 'result for: ',
			thereAre: 'There are ',
			results: 'results for: '
		};

		// update search result display
		$("#result-number").text(numberOfResults);
		if (numberOfResults > 1) {				
			console.log(numberOfResults);
			$("#result-counter #there").text(resultOptions.thereAre);
			$("#result-counter #result").text(resultOptions.results);
		} 
		else {
			$("#result-counter #there").text(resultOptions.thereIs);
			$("#result-counter #result").text(resultOptions.result);
		}
		$("#search-result").text(userInput);
		$("#result-counter-container").fadeIn(300);
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
				+ displayBreweries(item.breweries) +
			'</dl>';

			//remove hidden class, append template
			$(".results-template").removeClass("hidden").fadeIn(300);
			$(".results-template .col-lg-12").append(template);
	});
}


// how come I don't need (index, item) below?
var displayBreweries = function(breweries) {
	var breweriesTemplate = "";
	$.each(breweries, function(index, breweries) {
		breweriesTemplate = breweriesTemplate + '<dt>Brewery Name:</dt>' +
				'<dd class="brewery-name">'+ breweries.name +'</dd>' 
			+ '<dt>Brewery Website:</dt>' +
				'<dd class="brewery-website"><a href="' + breweries.website + '"target="_blank">'+ breweries.website +'</a><dd>';
	});
	return breweriesTemplate;
}

function refreshSearch() {
	$("#button-refresh").click(function() {
		$("#read-search").val("");
		$(".results-template").fadeOut(300);
		$("#result-counter-container").fadeOut(300);
	});
}
refreshSearch();


// $('.unanswered-getter').submit( function(e){
// 		e.preventDefault();
// 		// zero out results if previous search has run
// 		$('.results').html('');



// 		var template = "";

// 		// append items to page using a template
// 		$.each(item.breweries, function(index, brewery) {
// 			template +=	'<dl class="results">' +
// 			'<dt>Beer Name:</dt>' +
// 				'<dd class="name">'+ name +'</dd>' +
// 			'<dt>Abv:<dt>' +
// 				'<dd class="abv">'+ abv +'</dd>' +
// 			'<dt>Category:</dt>' +
// 				'<dd class="category">'+ category +'</dd>' +
// 			'<dt>Date Created:</dt>' +
// 				'<dd class="created">' + created +'</dd>' +
// 			'<dt>Description:</dt>' +
// 				'<dd class="description">' + description +'</dd>' +
// 			'<dt>Brewery Name:</dt>' +
// 				'<dd class="brewery-name">' + brewery.name + '</dd>' +
// 			'<dt>Website:</dt>' +
// 				'<dd class="website">' + brewery.website +'</dd>'
// 			+'</dl>';
// 			});

// 			//remove hidden cass, append template
// 			$(".results-template").removeClass("hidden");
// 			$(".results-template .col-lg-12").append(template);
// 	});
// }