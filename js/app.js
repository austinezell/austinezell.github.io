"use strict"

var $document = $(document)

$document.ready(function(){
  $('#message').val('')
  const $siteNavLinks = $("#siteNav a")
  const $body = $("body");
  let topMargin = $body.css("margin-top");

  window.onscroll = function(event) {
    const currentDistance = $(window).scrollTop()
    console.log(currentDistance);
    let $name = $("#intro>div>span");
    if (currentDistance > 192 && currentDistance < 450){
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
      const newOpacity = 1 - currentDistance/420
      $name.css("opacity", newOpacity)
    }
    else if (currentDistance < 192) {
      $name.attr("style", "")
    }
    if (currentDistance > 450) {
      $("#appearing-container").animate({
        opacity: 1
      }, 2500)
    }
  }

  $siteNavLinks.on("click", function(event){
    event.preventDefault();
    const location  = $(this).attr("href");
    const marginValue = topMargin.replace("px", "")
    const offset = location === "#aboutMe" ? +marginValue + 80 : +marginValue
    $('body, html').stop().animate({
      scrollTop: $(location).offset().top - offset
    }, 1500, 'easeOutCirc');
  })

  $("#navButton").on("click", function(event){
    const newMargin = topMargin === "64px" ? "281px" : "64px";
    topMargin = newMargin;
    $body.animate({marginTop: newMargin}, 800);
  })

})
