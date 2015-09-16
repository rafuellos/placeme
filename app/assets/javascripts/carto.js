//https://{account}.cartodb.com/api/v2/sql?q={SQL statement}&api_key={Your API key}
//'https://rafuellos.cartodb.com/api/v2/sql/?q=SELECT * FROM places_table&api_key=e4abaae0cf1e668af417d8053aafee7a064aeb61'

//account: rafuellos
//API KEY: e4abaae0cf1e668af417d8053aafee7a064aeb61

$( document ).ready(function() {
  var cartoKey = "e4abaae0cf1e668af417d8053aafee7a064aeb61";

  $('body').on('submit', '.add-place-form', function(event){

     var title = $('#form-tittle-place').val();
     var comments = $('#form-comments-place').val();
     var user = $('#form-user-place').attr('value');
     var address = $('#address-place').val();
     var longitudeForm = $('#longitude-place').val();
     var latitudeForm = $('#latitude-place').val();
     

     console.log(title);
     console.log(comments);
     console.log(user);
     console.log(address);
     console.log(longitudeForm);
     console.log(latitudeForm);

      var sqlStatement1 = "INSERT INTO places_table (title, comments, owner_id, lon, lat, address, the_geom) ";
      var sqlStatement2 = "VALUES ('" + title + "','" + comments + "'," + user + ",'" + longitudeForm + "','" + latitudeForm + "','" + address + "', ST_SetSRID(ST_Point(" + longitudeForm + "," + latitudeForm + "),4326))";
      var url = sqlStatement1 + sqlStatement2;
      console.log(url);

      var urlCreate = "https://rafuellos.cartodb.com/api/v2/sql?q=" 
              + sqlStatement1 + sqlStatement2 + "&api_key=" + cartoKey;
      console.log(urlCreate);
      sendPostToTable(urlCreate);
  }); 

  $('#delete-link').on('click', function(event){
    event.preventDefault();
    console.log('vamos a borrar');
    var deleteLinkTitle = $('#delete-link').attr('data-placetitle');
    var deleteLinkComment = $('#delete-link').attr('data-comments');

    //console.log("El place" + deleteLinkTitle + " con comment " + deleteLinkComment);

    var sqlDelete = "DELETE FROM places_table WHERE title = '" + deleteLinkTitle +"' AND comments = '" + deleteLinkComment + "'";
    console.log(sqlDelete);
    var urlDelete = "https://rafuellos.cartodb.com/api/v2/sql?q=" 
            + sqlDelete + "&api_key=" + cartoKey;
    sendPostToTable(urlDelete);
  });

   
  
  function sendPostToTable (url){
    $.post(url, function(data) {
        console.log(data);
    });
  } 


  $deleteAccount = $('.delete-account-button')
  $deleteAccount.on('click', function(event){
    event.preventDefault();
    console.log('vamos a borrar todos los datos del usuario');
    var deleteId = $deleteAccount.attr('data-user');

    var sqlDeleteAll = "DELETE FROM places_table WHERE owner_id = " + deleteId;
    console.log(sqlDeleteAll);
    var urlDelete = "https://rafuellos.cartodb.com/api/v2/sql?q=" 
            + sqlDeleteAll + "&api_key=" + cartoKey;
    //sendPostToTable(urlDelete);
  });


//Inserting the map in the visualization for places when pressed the button with the world icon
  if ($('#map-menu').length > 0) {  
      setMapCenterLocation();
  };

  var centerLon;
  var centerLat;

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function setMapCenterLocation() {
    console.log('Getting location...'); 
    navigator.geolocation.getCurrentPosition(function(position){
      console.log("Getting map center location!");
      centerLat = position.coords.latitude;
      centerLon = position.coords.longitude;
      paintCartoMap(centerLat, centerLon);  
    }, onError, options);
  };

  function paintCartoMap(lat, lon) {
    //id = user-places-map
    console.log("pintando el mapa de Cartodb")
    console.log(centerLon)
    var map = new L.Map('user-places-map', {
        center: [centerLon, centerLat],
        zoom: 6,
        zoomControl: false

      });

    cartodb.createVis('user-places-map', 'https://rafuellos.cartodb.com/api/v2/viz/a0ff9b54-4bf1-11e5-a0ae-0e0c41326911/viz.json');

    cartodb.createLayer(map, 'https://rafuellos.cartodb.com/api/v2/viz/a0ff9b54-4bf1-11e5-a0ae-0e0c41326911/viz.json')
        .addTo(map)
        .on('done', function(layer) {
          layer.setInteraction(true);
          layer.on('featureOver', function(e, latlng, pos, data) {
            cartodb.log.log(e, latlng, pos, data);
          });
          layer.on('error', function(err) {
            cartodb.log.log('error: ' + err);
          });
        })
        .on('error', function(err) {
          alert("some error occurred: " + err);
        });

  }

  function onError(error) {
    console.log("Getting the current location failed: " + error);
  }

});

