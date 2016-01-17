"use strict"

var $document = $(document)
$document.ready(function(){
  $('#message').val('')
  var $siteNavLinks = $("#siteNav a")
  var $body = $("body");
  var topMargin = $body.css("margin-top");
  var $name = $("#name");
  var $email = $("#email");
  var $resume = $("#resume");
  var $contactLinks =$(".contact-link");
  var linkIsClear = true;

  window.onscroll = function(event) {
    var shiftDistance = (window.innerWidth/2) -document.getElementById("email").offsetWidth-10;
    var currentDistance = window.pageYOffset;
    var distanceToAboutMe = $("#aboutMe").offset().top;
    console.log(currentDistance);

    if(currentDistance < 195) {
      if ($name.attr("style")){
        $name.attr('style', "")
      }
      var shift = (currentDistance/195) * shiftDistance
      $email.css({
        "transform": shift ? "translateX(-"+shift+"px)" : "",
        "position": "relative",
        "top": "0"
      }).addClass("transitioning")
      $resume.css({
        "transform": shift ? "translateX("+shift+"px)" : "",
        "position": "relative",
        "top": "0"
      }).addClass("transitioning")
    }else if (currentDistance > 195 && currentDistance < 480){
      if (!$name.attr("style")){
        var topOffset = document.getElementById("name").offsetHeight/2;
        $name.css({
          "position": "fixed",
          "top": topMargin,
          "margin-left": "auto",
          "margin-right": "auto",
          "right": "0",
          "left": "0"
        });
        $contactLinks.css("top", topOffset);
      }
      var newOpacity = 1 - (currentDistance - 195)/270
      $name.css("opacity", newOpacity);

      if ( currentDistance < 290 && currentDistance >= 195) {
        $email.css({
          "position": "relative",
          "left": "0",
          "transform": "translateX(-"+shiftDistance+"px)"
        });
        $resume.css({
          "position": "relative",
          "right": "0",
          "transform": "translateX("+shiftDistance+"px)"
        });
      }
    }
    if (currentDistance >= 290) {
      $email.css({
        "position": "fixed",
        "left": "0",
        "top": topMargin,
        "transform": ""
      }).removeClass("transitioning");
      $resume.css({
        "position": "fixed",
        "right": "0",
        "top": topMargin,
        "transform": ""
      }).removeClass("transitioning");

    }

    if (currentDistance > 550 && currentDistance < distanceToAboutMe -200){
      $("#appearing-container").animate({
        opacity: 1
      }, 2500)
      $name.css("opacity", 0);
      if (!linkIsClear){
        $contactLinks.animate({
          "background-color": "rgba(0,0,0,0)"
        })
        linkIsClear = true;
      }
    }
    else if (linkIsClear && currentDistance > distanceToAboutMe-200 && currentDistance < $("#portfolio").offset().top -80){
      $contactLinks.animate({
        "background-color": "rgba(0,0,0,.8)"
      })
      linkIsClear = false;
    } if (!linkIsClear && currentDistance > $("#portfolio").offset().top -80){
      $contactLinks.animate({
        "background-color": "rgba(0,0,0,0)"
      })
      linkIsClear = true;
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
