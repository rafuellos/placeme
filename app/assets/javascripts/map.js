$( document ).ready(function() {
 
  var lat;
  var lon;
  var map;
  var marker;
  var geocoder;
  var mapOptions = {
                      center: new google.maps.LatLng(0.0, 0.0),
                      zoom: 2,
                      mapTypeId: google.maps.MapTypeId.ROADMAP 
                    };
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  $editingLabel = $('#editing-label');
  $modalAdd = $('#modal-add')
  $navigateButton = $('#navigateButton');

  if ("geolocation" in navigator) {
      console.log('Everything is ok with the geolocation');
      //getLocation();
  } else {
      alert("Geolocation is not available")
  }


  if ($navigateButton.length > 0 || $modalAdd.length > 0){  
      getLocation();
  }
  

  function paintLink(latitude, longitude){
    console.log(latitude);
    var href = "https://www.google.com/maps/dir/" + latitude + "," + longitude + "/" +  $navigateButton.attr('latitude') + "," + $navigateButton.attr('longitude')
    console.log(href);
    $navigateButton.attr("href", href);
    $('#location-map').attr("href", href);
  };


  function getLocation() {
    console.log('Getting location...'); 
    navigator.geolocation.getCurrentPosition(setLocation, onError, options);
  }


  function setLocation (position) {
    console.log("Got it!");
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    $('#latitude-place').val(lat);
    $('#longitude-place').val(lon);
    if ($('#navigateButton').length > 0){
      $navigateButton = $('#navigateButton');
      paintLink(lat,lon)  
    };
  }


  function onError(error) {
    console.log("Getting location failed: " + error);
  }



  $modalAdd.on('loaded.bs.modal', function(){
    console.log('showing the modal with the map') 
    navigator.geolocation.getCurrentPosition(setLocation, onError, options);   
    initMap();    
  });


  if ($editingLabel.length > 0){
    console.log('showing the map edition') 
    navigator.geolocation.getCurrentPosition(function(position){
      console.log("Recuperando coordenadas");
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log("ahora" +lat);
      console.log("ahora" + lon);
      $('#latitude-place').val(lat);
      $('#longitude-place').val(lon);
      initMap(); 
    }, onError, options);        
  };



  function initMap() {
   
    var myOptions = {
                      center: new google.maps.LatLng(lat, lon ),
                      zoom: 14,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(map, 'click', function(event) {
      placeMarker(event.latLng);
    });

    $modalAdd.on('click', '#set_location', function(event){
      navigator.geolocation.getCurrentPosition(function (position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
        placeMarker(initialLocation);
      }, onError, options);
    });

    placeMarker(map.center);

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

