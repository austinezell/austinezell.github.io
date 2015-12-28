"use strict"

var $document = $(document)


$document.ready(function(){
  $('#message').val('')
  const $siteNavLinks = $("#siteNav a")

  $siteNavLinks.on("click", function(event){
    event.preventDefault();
    const location  = $(this).attr("href")
    $('body, html').stop().animate({
      scrollTop: $(location).offset().top - 59
    }, 1500, 'easeOutCirc');
  })

})
