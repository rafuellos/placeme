// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$( document ).ready(function() {

  if ("geolocation" in navigator) {
      getLocation();
    } else {
      alert("Geolocation is not available")
    }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function getLocation() {
    console.log('Getting location...'); 
    navigator.geolocation.getCurrentPosition(setUserLocation, onError, options);
  }

  function setUserLocation (position) {
    console.log("Got it!");
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var coord = {latitude: lat,
                 longitude: lon
               };
    console.log(coord);
    $.get('/users/set_coordinates', coord).done(
      function(result) {
        console.log('enviando al current_user');
      }
    ).fail(
      console.log('problems')
    )
  }

  function onError(error) {
    console.log("Getting location failed: " + error);
  }

  $('#modal-add').on('click', '#set_location', function(event){
    navigator.geolocation.getCurrentPosition(placeLocation, onError, options);
  });

  function placeLocation (position) {
    console.log("Got it!");
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    $('#longitude-place').val(lon);
    $('#latitude-place').val(lat);
    //displayMap(lat,lon)
  }

  function displayMap(lat, lon) {
    var urlRoot = "https://maps.googleapis.com/maps/api/staticmap?center=";
    var urlParams = "&zoom=13&size=400x300";
    var url = urlRoot + lat + "," + lon + urlParams;
    var map = $('map-for-location');
    map.setAttribute("src", url);
    console.log(url);
  }

  $('#modal-add').on('loaded.bs.modal', function(){
  console.log('showing the modal')    
    initMap();
  });


  var map;
  var geocoder;
  var mapOptions = { center: new google.maps.LatLng(0.0, 0.0), zoom: 2,
                    mapTypeId: google.maps.MapTypeId.ROADMAP };

  function initMap() {
    console.log('paint the map?')
    console.log($("#map_canvas").val()); 
    var myOptions = {
                      center: new google.maps.LatLng(36.835769, 10.247693 ),
                      zoom: 15,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

    geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById("map_canvas"),
    myOptions);
    console.log(map);
    google.maps.event.addListener(map, 'click', function(event) {
      placeMarker(event.latLng);
    });

    var marker;
    function placeMarker(location) {
      if(marker){ 
          marker.setPosition(location);
      }else{
          marker = new google.maps.Marker({
              position: location, 
              map: map
          });
      };
      $('#latitude-place').val(location.lat());
      $('#longitude-place').val(location.lng());
      getAddress(location);
    }

  function getAddress(latLng) {
    geocoder.geocode( {'latLng': latLng},
      function(results, status) {
        var $place = $('#address-place');
        if(status == google.maps.GeocoderStatus.OK) {
          if(results[0]) {
            $place.val(results[0].formatted_address);
          }
          else {
            $place.val("No results");
          }
        }
        else {
          $place.val(status);
        }
      });
    }
  }


});

