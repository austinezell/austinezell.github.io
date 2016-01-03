"use strict"

var $document = $(document)

$document.ready(function(){
  $('#message').val('')
  const $siteNavLinks = $("#siteNav a")
  const $body = $("body");
  let topMargin = $body.css("margin-top");

  window.onscroll = function(event) {
    let $name = $("#intro>div>span")
    console.log($(window).scrollTop());
    console.log($name.offset().top);
    if ($(window).scrollTop() > $name.offset().top){
      console.log($('.name'));
      $name.css({
        "position": "fixed",
        "top": topMargin,
        "margin-left": "auto",
        "margin-right": "auto",
        "right": "0",
        "left": "0",
        "z-index": "-1"
      })
    }
    // else if ($(window).scrollTop() < $name.offset().top) {
    //   $(".name").attr("style", "")
    // }
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
