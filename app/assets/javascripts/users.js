// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {

  function openOverlay(overlay) {
    $oLay = $(overlay);
    $window = $(window)
        
    if ($('#overlay-shade').length == 0)
      $('body').prepend('<div id="overlay-shade"></div>');

      $('#overlay-shade').fadeTo(400, 0.6, function() {
            var props = {
                          oLayWidth       : $oLay.width(),
                          scrTop          : $window.scrollTop(),
                          viewPortWidth   : $window.width()
                        };

      var leftPos = (props.viewPortWidth - props.oLayWidth) / 2;
      $oLay
        .css({display : 'block', opacity : 0, top : '-=300', left : leftPos+'px'})
        .animate({ top : props.scrTop + 220, opacity : 1 }, 300);
      });
  }

  function closeOverlay() {
    $('.overlay').animate({ top : '-=300', opacity : 0 }, 400, function() {
        $('#overlay-shade').fadeOut(300);
        $(this).css('display','none');
    });
  }
    
  $('body').on('click','#overlay-shade, .overlay a', function(e) {
        closeOverlay();
        if ($(this).attr('href') == '#') e.preventDefault();
  });
    
  $('#overlaylaunch-signIn').click(function(e) {
     openOverlay('#overlay-signIn');
     e.preventDefault();
  });


});