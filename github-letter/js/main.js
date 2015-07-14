
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

$(document).ready(function() {

  setTimeout(function() {
    if ($('#history h2:below-the-fold').length && $(document).scrollTop() <= 0) {
      $('#scroll-indicator').show();
    }

    $(document).scroll(function() {
      if (! $('#history h2:below-the-fold').length) {
        $('#scroll-indicator').fadeOut();
      }
    });
  }, 100);

  setTimeout(function() {
    if (isMobile) {
      $('[title]:not([href])').tooltipster({
        theme: '.tooltipster-shadow'
      });

      $('.tip.image').magnificPopup({
        type: 'image',
        image: {titleSrc: 'data-caption'},
        closeOnContentClick: true,
        closeOnBgClick: true
      })
    } else {
      $('[title]').tooltipster({
        theme: '.tooltipster-shadow'
      });

      $('.tip.image').tooltipster({
        content: 'Loading...',
        theme: '.tooltipster-shadow',
        updateAnimation: false,
        functionBefore: function(origin, continueTooltip) {
          continueTooltip();
          var image = new Image();
          image.src = origin.attr('href')
          image.onload = function() {
            var width = image.width;
            var height = image.height;
            if (width > 800) {
              var ratio = 800 / width;
              width = width * ratio;
              height = height * ratio;
            }
            if (height > 400) {
              var ratio = 400 / height;
              width = width * ratio;
              height = height * ratio;
            }
            var content = "<img src='"+image.src+"' height="+height+" width="+width+">";
            var caption;
            if (caption = origin.attr('data-caption')) {
              content += "<p>"+caption+"</p>"
            }
            origin.tooltipster('update', content);
          }
        }
      }).click(function(e) { e.preventDefault() });
    }

  }, 3000)
});


(function() {
  if (isMobile) return;

  var $el = $('#octolatte');
  var scrollX, direction, scrollTimeout;

  var scrollStopped = function() {
    $el[0].style.webkitAnimationName = "wiggle" + direction;
    $el.removeClass()
  }

  $(document).scroll(function() {
    if (scrollTimeout) { clearTimeout(scrollTimeout); }
    scrollTimeout = setTimeout(scrollStopped, 200);

    var newScrollX = $(document).scrollTop();
    direction = (scrollX >= newScrollX) ? 'down' : 'up';
    scrollX = newScrollX;

    $el[0].style.webkitAnimationName = '';
    $el.removeClass().addClass(direction)
  })

  $el.bind('webkitAnimationEnd', function(){
    $el.removeClass()
    this.style.webkitAnimationName = '';
  });

})();
