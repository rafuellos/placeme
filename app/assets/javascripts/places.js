// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$( document ).ready(function() {
  $(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });    

    $('#modal-add').on('change', '#pictureInput', function(event){
      console.log('entra');
      var files = event.target.files;
      var image = files[0]
      var reader = new FileReader();
      reader.onload = function(file) {
        var img = new Image();
        console.log(file);
        img.src = file.target.result;
        $target = $('#target')
        $target.html(img);
        $target.removeClass('photo-frame');
        $('#modal-add #target img').load(function () {  
          $(this).addClass('places-images-modal');

        });
      }
      reader.readAsDataURL(image);
      console.log(files);
    });



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
    var coord = {
                  latitude: lat,
                  longitude: lon
                };

    $.get('/users/set_coordinates', coord).done(
      function(result) {
        console.log('enviando al current_user');
      }
      ).fail(
      console.log('problems')
      );
  }


  function onError(error) {
    console.log("Getting location failed: " + error);
  }



  $('#modal-add').on('loaded.bs.modal', function(){
    console.log('showing the modal')    
    initMap();

    $('#modal-add').on('click', '#set_location', function(event){
      initMap();
    });
  });



  function initMap() {

    navigator.geolocation.getCurrentPosition(setLocation, onError, options);
   
    var myOptions = {
                      center: new google.maps.LatLng(lat, lon ),
                      zoom: 14,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

    geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById("map_canvas"),
    myOptions);


    google.maps.event.addListener(map, 'click', function(event) {
      console.log(event.latLng)
      placeMarker(event.latLng);
    });
    console.log(map.center)
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

