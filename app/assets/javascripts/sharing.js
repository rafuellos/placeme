$( document ).ready(function() {



  $('body').on('click', function (e) {
    //did not click a popover toggle, or icon in popover toggle, or popover
    if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('[data-toggle="popover"]').length === 0
        && $(e.target).parents('.popover.in').length === 0) { 
        $('[data-toggle="popover"]').popover('hide');
    }
  });

  $("[data-toggle=popover]").popover({
    html: true, 
    content: function() {
          //console.log($('#popover-number').val());
          //$('#popover-number').val();
          
          //$('#popover-number').html(number);
          return $('#popover-content').html();          
    }
  });


});