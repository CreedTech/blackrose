(function ($) {
  'use strict';

  // Preloader
  $(function () {
    var preloader = $('#Lfa-page-loading');
    if (preloader.length > 0) {
      preloader.fadeOut('slow', function () {
        preloader.remove();
      });
    }
  });

  var wind = $(window);

  // ScrollIt
  $.scrollIt({
    upKey: 38, // key code to navigate to the next section
    downKey: 40, // key code to navigate to the previous section
    easing: 'swing', // the easing function for animation
    scrollTime: 600, // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: -70, // offste (in px) for fixed top navigation
  });

  // Navbar scrolling background
  wind.on('scroll', function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $('.navbar'),
      logo = $('.navbar .logo> img');
    if (bodyScroll > 100) {
      navbar.addClass('nav-scroll');
      logo.attr('src', 'images/logo.png');
    } else {
      navbar.removeClass('nav-scroll');
      logo.attr('src', 'images/logo.png');
    }
  });
  // close navbar-collapse when a  clicked
  $('.navbar-nav .dropdown-item a').on('click', function () {
    $('.navbar-collapse').removeClass('show');
  });

  //Animation
  $(document).ready(function () {
    $('body.hero-anime').removeClass('hero-anime');
  });

  // Animations
  var contentWayPoint = function () {
    var i = 0;
    $('.animate-box').waypoint(
      function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          i++;
          $(this.element).addClass('item-animate');
          setTimeout(function () {
            $('body .animate-box.item-animate').each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn animated');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft animated');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight animated');
                  } else {
                    el.addClass('fadeInUp animated');
                  }
                  el.removeClass('item-animate');
                },
                k * 200,
                'easeInOutExpo'
              );
            });
          }, 100);
        }
      },
      {
        offset: '85%',
      }
    );
  };

  // Document on load.
  $(function () {
    contentWayPoint();
  });
  var template = {
    init: function () {
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function () {
      this.pageWrapper = $('#blackrose-page-wrapper');
      this._body = $('body');
    },
    bindEvents: function () {
      var self = this;
    },
  };

  /* Swiper slider */
  if (window.innerWidth < 1200) {
    new Swiper('.swiper-container', {
      direction: 'horizontal',
      slidesPerView: 1,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      paginationClickable: !0,
      spaceBetween: 0,
      autoplay: false,
      loop: !0,
    });
  } else {
    new Swiper('.swiper-container', {
      direction: 'horizontal',
      slidesPerView: 1,
      parallax: !0,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      paginationClickable: !0,
      spaceBetween: 0,
      speed: 5000,
      parallax: !0,
      autoplay: false,
      loop: !0,
    });
  }

  // Sections background image from data background
  var pageSection = $('.bg-img, section');
  pageSection.each(function (indx) {
    if ($(this).attr('data-background')) {
      $(this).css(
        'background-image',
        'url(' + $(this).data('background') + ')'
      );
    }
  });

  // Show more
  $(function () {
    $(document).on('click', '.blackrose-more-trigger', function (event) {
      event.preventDefault();
      if ($('.blackrose-show-more-container').hasClass('visible')) {
        $('.blackrose-show-more-container').toggleClass('animated');
        $('.blackrose-show-more-container').removeClass('visible');
      } else {
        $('.blackrose-show-more-container').addClass('visible');
        $('.blackrose-show-more-container').removeClass('animated');
        $('.blackrose-more-wrapper').addClass('hidden');
      }
    });
  });
  $(function () {
    var self = this;
    var $grid = $('.grid');
    $grid.each(function () {
      var $el = $(this);
      var initial_items = 9;

      function showNextItems(pagination) {
        var itemsMax = $('.visible_item').length;
        var itemsCount = 0;
        $('.visible_item').each(function () {
          if (itemsCount < pagination) {
            $(this).removeClass('visible_item');
            itemsCount++;
          }
        });
        if (itemsCount >= itemsMax) {
          $('.shop-blackrose-more-trigger').hide();
        }
      }
      $('.shop-blackrose-more-trigger').on('click', function (e) {
        e.preventDefault();
        var next_items = 9;
        showNextItems(next_items);
      });
    });
  });

  // Contact Form
  var form = $('.contact__form'),
    message = $('.contact__msg'),
    form_data;
  // success function
  function done_func(response) {
    message.fadeIn().removeClass('alert-danger').addClass('alert-success');
    message.text(response);
    setTimeout(function () {
      message.fadeOut();
    }, 2000);
    form.find('input:not([type="submit"]), textarea').val('');
  }
  // fail function
  function fail_func(data) {
    message.fadeIn().removeClass('alert-success').addClass('alert-success');
    message.text(data.responseText);
    setTimeout(function () {
      message.fadeOut();
    }, 2000);
  }
  form.submit(function (e) {
    e.preventDefault();
    form_data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: form_data,
    })
      .done(done_func)
      .fail(fail_func);
  });

  // Accordion Box (for Faqs)
  if ($('.accordion-box').length) {
    $('.accordion-box').on('click', '.acc-btn', function () {
      var outerBox = $(this).parents('.accordion-box');
      var target = $(this).parents('.accordion');
      if ($(this).next('.acc-content').is(':visible')) {
        //return false;
        $(this).removeClass('active');
        $(this).next('.acc-content').slideUp(300);
        $(outerBox).children('.accordion').removeClass('active-block');
      } else {
        $(outerBox).find('.accordion .acc-btn').removeClass('active');
        $(this).addClass('active');
        $(outerBox).children('.accordion').removeClass('active-block');
        $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
        target.addClass('active-block');
        $(this).next('.acc-content').slideDown(300);
      }
    });
  }

  //  Scroll back to top
  var progressPath = document.querySelector('.progress-wrap path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    'stroke-dashoffset 10ms linear';
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 150;
  var duration = 550;
  jQuery(window).on('scroll', function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.progress-wrap').addClass('active-progress');
    } else {
      jQuery('.progress-wrap').removeClass('active-progress');
    }
  });
  jQuery('.progress-wrap').on('click', function (event) {
    event.preventDefault();
    jQuery('html, body').animate({ scrollTop: 0 }, duration);
    return false;
  });
})(jQuery);
