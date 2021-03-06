'use strict'

var $document = $(document)
$document.ready(function() {
  const $name = $('#name')
  const $email = $('#email')
  const $resume = $('#resume')
  const $contactLinks = $('.contact-link')
  const $contactDivs = $('.contact-link-div')
  let linkIsClear = true
  const $tech = $('#technologies')
  let distanceToTech = $tech.offset().top
  let distanceToName = $name.offset().top
  let distanceToLinks = $contactDivs.offset().top - 10
  let distanceToAboutMe = $('#aboutMe').offset().top - 80
  let percentRotate = 100

  const rotationTerms = document.getElementById('rotation-terms')
  //rotator function
  function rotate() {
    if (percentRotate > 0) {
      percentRotate -= 25
      Object.assign(rotationTerms.style, {
        transform: `translateY(-${percentRotate}%)`,
      })
    } else {
      document.getElementById('semicolon').classList.remove('transparent')
      clearInterval(rotatorInteveral)
    }
  }

  const rotatorInteveral = setInterval(rotate, 1000)
  var shiftDistance =
    window.innerWidth / 2 - document.getElementById('email').offsetWidth - 10

  // Check for changes in distance on screen resize
  window.onresize = function() {
    // set timeout to allow media queries to catch up
    setTimeout(function() {
      if ($name.css('position') !== 'fixed') distanceToName = $name.offset().top
      if ($contactDivs.css('position') !== 'fixed')
        distanceToLinks = $contactDivs.offset().top - 10

      distanceToTech = $tech.offset().top
      distanceToAboutMe = $('#aboutMe').offset().top - 80
      // Distance the links will shift
      shiftDistance =
        window.innerWidth / 2 - document.getElementById('email').offsetWidth - 10
    }, 800)
  }

  window.onscroll = function(event) {
    var currentDistance = window.pageYOffset
    if (currentDistance < distanceToName) {
      //reset name to unedited version
      if ($name.attr('style')) {
        $name.attr('style', '')
      }

      // calculate the amount of shift distance.
      // these links will be at the side of the page when the name section locks into place.
      var shift = (currentDistance / distanceToName) * shiftDistance
      $email
        .css({
          transform: shift ? 'translateX(-' + shift + 'px)' : '',
          position: 'relative',
          top: '0',
        })
        .addClass('transitioning')
      $resume
        .css({
          transform: shift ? 'translateX(' + shift + 'px)' : '',
          position: 'relative',
          top: '0',
        })
        .addClass('transitioning')
    } else if (
      currentDistance > distanceToName &&
      currentDistance < distanceToTech
    ) {
      if (!$name.attr('style')) {
        var topOffset = document.getElementById('name').offsetHeight / 2
        //locks name in place
        $name.css({
          position: 'fixed',
          top: 0,
          'margin-left': 'auto',
          'margin-right': 'auto',
          right: '0',
          left: '0',
        })
        //adds an offset to stop them from shifting when name is position fixed
        $contactDivs.css('top', topOffset)
      }

      // fades out name as page scrolls
      var newOpacity = 1 - (currentDistance - distanceToName) / (distanceToTech / 2)
      $name.css('opacity', newOpacity)

      // locks the links in place at max distance
      if (currentDistance < distanceToLinks) {
        $email.css({
          position: 'relative',
          left: '',
          transform: 'translateX(-' + shiftDistance + 'px)',
        })
        $resume.css({
          position: 'relative',
          right: '0',
          transform: 'translateX(' + shiftDistance + 'px)',
        })
      }
    }
    if (currentDistance >= distanceToLinks) {
      //locks the links in position fixed and removes transitioning so they don't animate their position fixed
      $email
        .css({
          position: 'fixed',
          left: '0',
          top: 0,
          transform: '',
        })
        .removeClass('transitioning')
      $resume
        .css({
          position: 'fixed',
          right: '0',
          top: 0,
          transform: '',
        })
        .removeClass('transitioning')
    }

    if (currentDistance > distanceToTech) {
      //brings in navigation link
      $('#to-the-top').css({ transform: 'translateY(0)' })
    } else {
      $('#to-the-top').css({ transform: '' })
    }

    if (
      currentDistance > distanceToTech &&
      currentDistance < distanceToAboutMe - 80
    ) {
      //animates about me secition into site
      $('#appearing-container').animate(
        {
          opacity: 1,
        },
        2500,
      )
      //final check to make sure name is properly faded out
      $name.css('opacity', 0)
      if (!linkIsClear) {
        $contactLinks.css('background-color', '')
        linkIsClear = true
      }
    } else if (
      linkIsClear &&
      currentDistance > distanceToAboutMe - 100 &&
      currentDistance < $('#portfolio').offset().top - 80
    ) {
      // changes background color of whie links on a white background
      $contactLinks.css('background-color', 'rgba(0,0,0,.8)')
      linkIsClear = false
    }
    if (!linkIsClear && currentDistance) {
      $contactLinks.css('background-color', '')
      linkIsClear = true
    }
  }
})
