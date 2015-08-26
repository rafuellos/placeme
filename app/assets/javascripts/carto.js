//https://{account}.cartodb.com/api/v2/sql?q={SQL statement}&api_key={Your API key}
//'https://rafuellos.cartodb.com/api/v2/sql/?q=SELECT * FROM places_table&api_key=e4abaae0cf1e668af417d8053aafee7a064aeb61'

//account: rafuellos
//API KEY: e4abaae0cf1e668af417d8053aafee7a064aeb61

$( document ).ready(function() {
  var cartoKey = "e4abaae0cf1e668af417d8053aafee7a064aeb61";
  $('body').on('click', '#testing-carto', function(){
    console.log('Creando un place');

    var sqlStatement = "INSERT INTO places_table (title, comments, the_geom) VALUES ('prueba2', 'prueba coment2', ST_SetSRID(ST_Point(-110, 43),4326))"

    var url = "https://rafuellos.cartodb.com/api/v2/sql?q=" 
              + sqlStatement 
              + "&api_key=" + cartoKey
    console.log(url);
    $.post(url
      , function(data) {
        console.log(data)
    });
  });


  $('body').on('submit', '.add-place-form', function(event){
    //console.log( $( this ).serializeArray() );
    //console.log(JSON.stringify($( this ).serializeArray()));
    //var place = JSON.stringify($( this ).serializeArray());
    //event.preventDefault();
    var place = JSON.stringify($( this ).serializeObject());
    //$('#modal-add').modal('toggle');
    console.log('DENTRO' + place);
    console.log('Titulo del place ' + place.comments);

    // var request = $.post('/places/create', place);

    // function onSaveSuccess(response) {
    //   console.debug('BOOM', response);
    // }

    // function onSaveFailure(err) {
    //   console.error(err.responseJSON);
    // }

    // request.done(onSaveSuccess);
    // request.fail(onSaveFailure);

  });

  $.fn.serializeObject = function (){
      var object = {};
      var form = this.serializeArray();
      $.each(form, function() {
          if (object[this.name] !== undefined) {
              if (!object[this.name].push) {
                  object[this.name] = [object[this.name]];
              }
              object[this.name].push(this.value || '');
          } else {
              object[this.name] = this.value || '';
          }
      });
      return object;
  };




});

