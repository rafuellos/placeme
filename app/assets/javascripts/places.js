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
    $('#longitude_place').val(lon);
    $('#latitude_place').val(lat);

  }



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
      $('#target').html(img);
      $('#target').removeClass('photo-frame');
      $('#modal-add #target img').load(function () {  
        $(this).addClass('places-images-modal');

      });
    }
    reader.readAsDataURL(image);
    console.log(files);
  });
});

