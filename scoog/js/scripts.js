var googleApiKey = "AIzaSyBhUKekPJIDoePtmA-KN3Fl6kbtCDI9X5I";
var weatherApiKey = "f6d5e105043feba8a008178d8d88ac87"
var type = "";
var elevations = [];
var clouds1;
var wind1;
var weather1;
var clouds2;
var wind2;
var weather2;
var radius = "20";



var weatherType = function(weatherId){
  var idType1 = weatherId/100;
  var idType2 = weatherId/10;
  if(idType1 == 2){
    return "thunder";
  } else if(idType1 == 3 || idType1 == 5 ){
      return "rain";
  } else if(idType1 == 6){
      return "snow";
  } else if(idType1 == 8 && idType2 !== 0){
      return "clouds";
  } else{
    return "clear";
  }
}

$(document).ready(function() {
  $("#google-elevation").submit(function(event){
    event.preventDefault();

    var addressesArray1 = [];
    var addressessURl1 = "";
    var addressesArray2 = [];
    var addressessURl2 = "";









    var address1 = addressesArray1.push($('#address1').val().split(" ").join("+"));
    var city1 = addressesArray1.push($('#city1').val().split(" ").join("+"));
    var state1 = addressesArray1.push($('#state1').val().split(" ").join("+"));

    var address2 = addressesArray2.push($('#address2').val().split(" ").join("+"));
    var city2 = addressesArray2.push($('#city2').val().split(" ").join("+"));
    var state2= addressesArray2.push($('#state2').val().split(" ").join("+"));

    for(var i=0; i< addressesArray1.length; i++) {
        if(addressesArray1[i] !== "" && i < (addressesArray1.length-1)){
        addressessURl1 = addressessURl1 + addressesArray1[i] + ',+';
      } else if(addressesArray1[i] !== ""){
        addressessURl1 = addressessURl1 + addressesArray1[i];
      }
    }
    for(var i=0; i< addressesArray2.length; i++) {
        if(addressesArray2[i] !== "" && i < (addressesArray2.length-1)){
        addressessURl2 = addressessURl2 + addressesArray2[i] + ',+';
      } else if(addressesArray2[i] !== ""){
        addressessURl2 = addressessURl2 + addressesArray2[i];
      }
    }

    $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ addressessURl1 + '&key=' + googleApiKey, function(response){
      latitude1 = response.results[0].geometry.location.lat;
      longitude1 = response.results[0].geometry.location.lng;
      console.log(latitude1);
      console.log(longitude1);
      $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ addressessURl2 + '&key=' + googleApiKey, function(response){
        latitude2 = response.results[0].geometry.location.lat;
        longitude2 = response.results[0].geometry.location.lng;
        console.log(response);
        console.log(latitude2);
        console.log(longitude2);
        var city = 0;
        var water = 0;
        var mountain= 0;
        var forest = 0;

        $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude1 + '&lon=' + longitude1 + "&APPID=" + weatherApiKey, function(response){


          var weather1Type = response.weather[0].main;
          var weatherId1 = response.weather[0].id;

          clouds1 = response.clouds.all;
          wind1 = response.wind.speed;
          weather1 = weatherType(weatherId1);
          console.log(weather1);

        });
        $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude2 + '&lon=' + longitude2 + "&APPID=" + weatherApiKey, function(response){


          var weather2Type = response.weather[0].main;
          var weatherId2 = response.weather[0].id;

          clouds2 = response.clouds.all;
          wind2 = response.wind.speed;
          weather2 = weatherType(weatherId2);
          console.log(weather2);

        });
          $.get('https://maps.googleapis.com/maps/api/elevation/json?path='+ latitude1 + "," + longitude1 + "|" + latitude2 + "," + longitude2 + '&samples=4&key=' + googleApiKey, function(response){

            for(var ii=0; ii<response.results.length; ii++){

               var lat = response.results[ii].location.lat;
               var lng = response.results[ii].location.lng;
               elevations.push(response.results[ii].elevation);
               console.log(elevations);
            $.get('http://api.geonames.org/findNearbyWikipediaJSON?lat=' + lat + '&lng='+ lng +'&radius=5&username=berausch', function(response){

              for(var i = 0; i<response.geonames.length; i++){
                if(response.geonames[i].feature === "city"){
                  city +=1;
                } else if(response.geonames[i].feature === "waterbody" || response.geonames[i].feature === "river" ){
                  water +=5;
                } else if(response.geonames[i].feature === "mountain"){
                  mountain +=5;
                } else if(response.geonames[i].feature === "forest"){
                  forest +=5;
                }
                if( i == (response.geonames.length -1)) {

                  var typesNumbers = [city, water, mountain, forest];
                  var typesNames = ["city", "water", "mountain", "forest"];
                  type = typesNames[typesNumbers.indexOf(Math.max(city, water, mountain, forest))];
                  console.log(type);
                };
              }
            })
          };
          });



      });


      });


        });
  $("#google-lat-long").submit(function(event){
    event.preventDefault();

    var city = 0;
    var water = 0;
    var mountain= 0;
    var forest = 0;









    var lng1 = $('#lng1').val();
    var lat1 = $('#lat1').val();
    var lat2 = $('#lat2').val();
    var lng2 = $('#lng2').val();

    console.log("lat1:" +  lat1);
    console.log("lng1:" +  lng1);
    console.log("lat2:" +  lat2);
    console.log("lng2:" +  lng2);

    $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat1 + '&lon=' + lng1 + "&APPID=" + weatherApiKey, function(response){


      var weather1Type = response.weather[0].main;
      var weatherId1 = response.weather[0].id;

      clouds1 = response.clouds.all;
      wind1 = response.wind.speed;
      weather1 = weatherType(weatherId1);


    });
    $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat2 + '&lon=' + lng2 + "&APPID=" + weatherApiKey, function(response){


      var weather2Type = response.weather[0].main;
      var weatherId2 = response.weather[0].id;

      clouds2 = response.clouds.all;
      wind2 = response.wind.speed;
      weather2 = weatherType(weatherId2);
      console.log(weather2);

    });
      $.get('https://maps.googleapis.com/maps/api/elevation/json?path='+ lat1 + "," + lng1 + "|" + lat2 + "," + lng2 + '&samples=4&key=' + googleApiKey, function(response){
        console.log(response);
        for(var ii=0; ii<response.results.length; ii++){

           var lat = response.results[ii].location.lat;
           var lng = response.results[ii].location.lng;
           elevations.push(response.results[ii].elevation);
           console.log(elevations);
        $.get('http://api.geonames.org/findNearbyWikipediaJSON?lat=' + lat + '&lng='+ lng +'&radius='+radius+'&username=berausch', function(response){
          console.log(response);

          for(var i = 0; i<response.geonames.length; i++){
            if(response.geonames[i].feature === "city"){
              city +=1;
            } else if(response.geonames[i].feature === "waterbody" || response.geonames[i].feature === "river" ){
              water +=5;
            } else if(response.geonames[i].feature === "mountain"){
              mountain +=5;
            } else if(response.geonames[i].feature === "forest"){
              forest +=5;
            }
            if( i == (response.geonames.length -1)) {

              var typesNumbers = [city, water, mountain, forest];
              var typesNames = ["city", "water", "mountain", "forest"];
              type = typesNames[typesNumbers.indexOf(Math.max(city, water, mountain, forest))];
              console.log(type);
            };
          }
        })
      };
      });



  });


  });


        $("#show-type").click(function(){
          console.log(elevations);


          var elevationsText= "";
          for(var i=0;i<elevations.length; i++){
            var number = i+1;
            elevationsText = elevationsText + "#"+ number + ": " + elevations[i] + "<br>"};
          $(".show-type").append("type: "+ type  + "<br>");
          $(".show-type").append("elevations:<br> " + elevationsText);

          $(".show-type").append("Weather1 <br> weatherType1: " + weather1 + "<br> windSpeed1: " + wind1 + " <br>cloudCover1: " + clouds1 + "<br>");
          $(".show-type").append("Weather2  <br>  weatherType2: " + weather2 + "<br> windSpeed2: " + wind2 + " <br>cloudCover2: " + clouds2  + "<br>");
        });





// lat1 = response.results[0].location.lat);
// $.get('http://api.geonames.org/findNearbyWikipediaJSON?lat=45.453117&lng=-122.715742&radius=1&username=berausch' , function(response){
//   console.log(response);
//   console.log(response.geonames[0].feature);
//
//
// type1 = Math.max(city, water, mountain, forest);
//
// });

//
// var latitude = parseInt($('#latitude').val());
// var longitude = parseInt($('#longitude').val());
// var latitude2 = parseInt($('#latitude2').val());
// var longitude2 = parseInt($('#longitude2').val());
