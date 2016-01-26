"use strict"


var $document = $(document)
$document.ready(function(){
  // $('#message').val('')
  var $siteNavLinks = $(".site-nav-link"),
  $body = $("body"),
  topMargin = "54px",
  topMarginValue= 54,
  $name = $("#name"),
  $email = $("#email"),
  $resume = $("#resume"),
  $contactLinks =$(".contact-link"),
  $contactDivs = $(".contact-link-div"),
  linkIsClear = true,
  distanceToName = $name.offset().top - topMarginValue,
  distanceToLinks = $contactDivs.offset().top - topMarginValue -10,
  $rotationTerms = $(".rotation-terms"),
  $semicolon = $("#semicolon"),
  distanceToAboutMe = $("#aboutMe").offset().top -topMarginValue - 80,
  percentRotate = 100;

  //rotator function
  function rotate () {
    if (percentRotate > 0) {
      percentRotate -= 20;
      $rotationTerms.css({"transform": "translateY(-"+percentRotate+"%)"})
    } else {
      $semicolon.removeClass('transparent');
      clearInterval(rotatorInteveral)
    }
  }

  var rotatorInteveral = setInterval(rotate, 1000)
  var shiftDistance = (window.innerWidth/2) - (document.getElementById("email").offsetWidth) -10;


  // Check for changes in distance on screen resize
  window.onresize = function (){
    if($name.css("position") !== "fixed") distanceToName = $name.offset().top - topMarginValue;
    if($contactDivs.css("position")!=="fixed") distanceToLinks = $contactDivs.offset().top - topMarginValue -10;

    distanceToAboutMe = $("#aboutMe").offset().top -topMarginValue - 80;
    shiftDistance = (window.innerWidth/2) - (document.getElementById("email").offsetWidth) -10;
  }

  window.onscroll = function(event) {
    var currentDistance = window.pageYOffset;
    console.log(currentDistance, distanceToAboutMe)

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

    if (currentDistance > 650){
      $("#to-the-top").css({"transform": "translateY(0)"});
    } else {
      $("#to-the-top").css({"transform": ""});
    }

    if (currentDistance > 650 && currentDistance < distanceToAboutMe -80){
      $("#appearing-container").animate({
        opacity: 1
      }, 2500)
      $name.css("opacity", 0);
      if (!linkIsClear){
        $contactLinks.css("background-color", "")
        linkIsClear = true;
      }
    }
    else if (linkIsClear && currentDistance > distanceToAboutMe-100 && currentDistance < $("#portfolio").offset().top -80){
      console.log('test');
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
    var offset = location === "#aboutMe" ? +topMarginValue + 80 : +topMarginValue
    $('body, html').stop().animate({
      scrollTop: $(location).offset().top - offset
    }, 1500, 'easeInCubic');
  })

})
