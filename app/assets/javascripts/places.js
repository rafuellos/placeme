// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

$('.new-place-modal').on('click', function(event){
  event.preventDefault();
  var newContent = '';
  $.ajax({
      url: "/places/new" + param, 
      type: "GET", 
      success: function(response, status){
        newContent = response;
        var modal = $('this');
        var close = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        var title = '<h4 class="modal-title color" id="myModalLabel">Add a new place</h4>'
        var footer = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button>'
        modal.find('.modal-title').html();
        modal.find('.modal-body').load(url);
        modal.find('.modal-footer').html(footer);
      }
  });

});

$(function() {
  $('#pictureInput').on('change', function(event) {
    var files = event.target.files;
    var image = files[0]
    var reader = new FileReader();
    reader.onload = function(file) {
      var img = new Image();
      console.log(file);
      img.src = file.target.result;
      $('#target').html(img);
    }
    reader.readAsDataURL(image);
    console.log(files);
  });
});
  