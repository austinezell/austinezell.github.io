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
  var $contactDivs = $(".contact-link-div");
  var $techTriangle =$("#tech-triangle-container")
  var linkIsClear = true;
  var distanceToName = $name.offset().top - parseInt(topMargin);
  var distanceToLinks = $contactDivs.offset().top - parseInt(topMargin) -10;
  var nameIsFixed = false, linkIsFixed= false;
  var $rotationTerms = $(".rotation-terms");
  var $semicolon = $("#semicolon");
  var percentRotate = 120;
  // var distanceToTechnologies = $techTriangle.offset().top -parseInt(topMargin);

  function rotate () {
    if (percentRotate > 0) {
      percentRotate -= 20;
      $rotationTerms.css({"transform": "translateY(-"+percentRotate+"%)"})
    } else if (percentRotate > -1){
      percentRotate = -100
      $("#javascript").addClass("underlined");
    } else{
      // $semicolon.addClass("colored");
      $semicolon.removeClass('transparent');
      clearInterval(rotatorInteveral)
    }
  }

  var rotatorInteveral = setInterval(rotate, 1000)



  window.onresize = function (){
    distanceToName = $name.offset().top - parseInt(topMargin);
    distanceToLinks = $contactDivs.offset().top - parseInt(topMargin) -10;
  }

  window.onscroll = function(event) {
    var shiftDistance = (window.innerWidth/2) - (document.getElementById("email").offsetWidth) -10;
    var currentDistance = window.pageYOffset;
    var distanceToAboutMe = $("#aboutMe").offset().top;
    console.log(currentDistance);

    if(currentDistance < distanceToName) {
      if ($name.attr("style")){
        $name.attr('style', "")
      }
      var shift = (currentDistance/distanceToName) * shiftDistance
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
    }else if (currentDistance > distanceToName && currentDistance < 480){
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
        $contactDivs.css("top", topOffset);
      }
      var newOpacity = 1 - (currentDistance - distanceToName)/270
      $name.css("opacity", newOpacity);

      if (currentDistance < distanceToLinks) {
        $email.css({
          "position": "relative",
          "left": "",
          "transform": "translateX(-"+shiftDistance+"px)"
        });
        $resume.css({
          "position": "relative",
          "right": "0",
          "transform": "translateX("+shiftDistance+"px)"
        });
      }
    }
    if (currentDistance >= distanceToLinks) {
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
        $contactLinks.css("background-color", "")
        linkIsClear = true;
      }
    }
    else if (linkIsClear && currentDistance > distanceToAboutMe-200 && currentDistance < $("#portfolio").offset().top -80){
      $contactLinks.css("background-color", "rgba(0,0,0,.8)")
      linkIsClear = false;
    } if (!linkIsClear && currentDistance > $("#portfolio").offset().top -80){
      $contactLinks.css("background-color", "")
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
    }, 1500, 'easeInCubic');
  })

  $("#navButton").on("click", function(event){
    var newMargin = topMargin === "64px" ? "281px" : "64px";
    topMargin = newMargin;
    $body.animate({marginTop: newMargin}, 800);
  })

})
