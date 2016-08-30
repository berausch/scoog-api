var apiKey = "AIzaSyBhUKekPJIDoePtmA-KN3Fl6kbtCDI9X5I";
var type = "";
$(document).ready(function() {
  $("#google-elevation").submit(function(event){
    event.preventDefault();
    console.log("hey!");
    var addressesArray1 = [];
    var addressessURl1 = "";
    var addressesArray2 = [];
    var addressessURl2 = "";
    var latitude1 = "";
    var longitude1 =  "";
    var latitude2 =  "";
    var longitude2 =  "";

    var types =  [];


    var elevations= [];


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

    $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ addressessURl1 + '&key=' + apiKey, function(response){
      latitude1 = response.results[0].geometry.location.lat;
      longitude1 = response.results[0].geometry.location.lng;
      $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ addressessURl2 + '&key=' + apiKey, function(response){
        latitude2 = response.results[0].geometry.location.lat;
        longitude2 = response.results[0].geometry.location.lng;
        $.get('https://maps.googleapis.com/maps/api/elevation/json?path='+ latitude1 + "," + longitude1 + "|" + latitude2 + "," + longitude2 + '&samples=4&key=' + apiKey, function(response){
          var city = 0;
          var water = 0;
          var mountain= 0;
          var forrest = 0;
          console.log(response);
          for(var ii=0; ii<response.results.length; ii++){
            var lat = response.results[ii].location.lat;
            var lng = response.results[ii].location.lng;
            elevations.push(response.results[ii].elevation);
            console.log(elevations);
            $.get('http://api.geonames.org/findNearbyWikipediaJSON?lat=' + lat + '&lng='+ lng +'&radius=1&username=berausch', function(response){
              console.log(response)
              for(var i = 0; i<response.geonames.length; i++){

                if(response.geonames[i].feature === "city"){
                  city +=1;
                } else if(response.geonames[i].feature === "waterbody" || response.geonames[i].feature === "river" ){
                  water +=1;
                } else if(response.geonames[i].feature === "mountain"){
                  mountain +=1;
                } else if(response.geonames[i].feature === "forrest"){
                  forrest +=1;
                }
                if( i == (response.geonames.length -1)) {
                  var typesNames = ["city", "water", "mountain", "forrest"];
                  var typesNumbers = [city, water, mountain, forrest];
                  type = typesNames[typesNumbers.indexOf(Math.max(city, water, mountain, forrest))];
                  console.log(type);

                   ;
                }

              }
          });

        };


      });


        });
      });


    });

    $("#show-type").click(function(){
      $(".show-type").append(type);
  });
});
// lat1 = response.results[0].location.lat);
// $.get('http://api.geonames.org/findNearbyWikipediaJSON?lat=45.453117&lng=-122.715742&radius=1&username=berausch' , function(response){
//   console.log(response);
//   console.log(response.geonames[0].feature);
//
//
// type1 = Math.max(city, water, mountain, forrest);
//
// });

//
// var latitude = parseInt($('#latitude').val());
// var longitude = parseInt($('#longitude').val());
// var latitude2 = parseInt($('#latitude2').val());
// var longitude2 = parseInt($('#longitude2').val());
