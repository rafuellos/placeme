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
      console.log(urlcomplete);
      $.post(urlCreate, function(data) {
        console.log(data);
    });
  }); 

  $('#delete-link').on('click', function(event){
    event.preventDefault();
    console.log('vamos a borrar');
    var deleteLink = $('#delete-link').attr('data-user');
    console.log("El place tenía el número " + deleteLink);

    var sqlDelete = "DELETE FROM places_table WHERE owner_id = " + deleteLink;
    console.log(sqlDelete);
    var urlDelete = "https://rafuellos.cartodb.com/api/v2/sql?q=" 
            + sqlDelete + "&api_key=" + cartoKey;
    sendPostToTable(urlcomplete);
  });

  function sendPostToTable (url){
    $.post(url, function(data) {
        console.log(data);
  };


});

