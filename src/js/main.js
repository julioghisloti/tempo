$(window).load(function(){
	getWeather('New York, NY');

	$('#change').on('click', function(){
		var newLocation = $('#location').val();
		getWeather(newLocation);

		$('body').fadeOut();
	});

});

function getWeather(theLocation){

	$.ajax({
	type: 'GET',
	url: 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + theLocation + '")&format=json'

	}).done(function(json){

		$.each(json.query.results.channel.item.forecast, function(i, show){

			console.log(show);
			$('.forecast').append('<div class="day">' + 'dia: ' + show.day + ' / ' + 'temp: ' + show.high + '</div>');

		});

		var Lat = json.query.results.channel.item.lat;
		var Long = json.query.results.channel.item.long;

		//console.log('Lat:' + Lat + ', Long:' + Long)

		//Flickr
		$.ajax({
			type: 'GET',
			url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9ccb20724160d26c4dfb5f4b89963270&lat='+ Lat +'&lon='+ Long +'&group_id=1463451@N25&per_page=1&format=json&nojsoncallback=1'

		}).done(function(flickr){
			
			$.each(flickr.photos.photo, function(i, photos){

				var farmId = photos.farm;
				var serverId = photos.server;
				var id = photos.id;
				var secret = photos.secret;
				var imgUrl = 'https://farm'+ farmId +'.staticflickr.com/'+ serverId +'/'+ id +'_'+ secret +'_b.jpg';

				$('.mc-image').css('background-image', 'url('+ imgUrl +')');
				$('.image').css('background-image', 'url('+ imgUrl +')');

				$('body').fadeIn();
				
			});

		}).fail(function(flickErr){

			console.log(flickErr);	

		});



	}).fail(function(error){

		console.log(error);

	});
}