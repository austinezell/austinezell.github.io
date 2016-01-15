"use strict"

var $document = $(document)

$document.ready(function(){
  $('#message').val('')
  var $siteNavLinks = $("#siteNav a")
  var $body = $("body");
  var topMargin = $body.css("margin-top");

  window.onscroll = function(event) {
    var currentDistance = $(window).scrollTop()
    var $name = $("#intro>div>span");
    if (currentDistance > 192 && currentDistance < 480){
      if (!$name.attr("style")){
        $name.css({
          "position": "fixed",
          "top": topMargin,
          "margin-left": "auto",
          "margin-right": "auto",
          "right": "0",
          "left": "0"
        })
      }
      var newOpacity = 1 - currentDistance/420
      $name.css("opacity", newOpacity)
    }
    else if (currentDistance < 192) {
      $name.attr("style", "")
    }
    if (currentDistance > 450) {
      $("#appearing-container").animate({
        opacity: 1
      }, 2500)
      $name.css("opacity", 0)
    }
  }

  $siteNavLinks.on("click", function(event){
    event.preventDefault();
    var location  = $(this).attr("href");
    var marginValue = topMargin.replace("px", "")
    var offset = location === "#aboutMe" ? +marginValue + 80 : +marginValue
    $('body, html').stop().animate({
      scrollTop: $(location).offset().top - offset
    }, 1500, 'easeOutCirc');
  })

  $("#navButton").on("click", function(event){
    var newMargin = topMargin === "64px" ? "281px" : "64px";
    topMargin = newMargin;
    $body.animate({marginTop: newMargin}, 800);
  })

})
