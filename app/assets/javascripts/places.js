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

