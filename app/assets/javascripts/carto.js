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
      $.post(urlCreate, function(data) {
        console.log(data);
    });
  }); 

  $('#delete-link').on('click', function(event){
    event.preventDefault();
    console.log('vamos a borrar');
    var deleteLinkTitle = $('#delete-link').attr('data-placetitle');
    var deleteLinkComment = $('#delete-link').attr('data-comments');

    console.log("El place" + deleteLinkTitle + " con comment " + deleteLinkComment);

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


});

