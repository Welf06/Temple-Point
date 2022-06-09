(function($) {
    "use strict"

    /*-------------------------------------------------------------------------------
 Preloader
 -------------------------------------------------------------------------------*/
    $(window).on('load', function() {
        $('.sigma_preloader').addClass('hidden');
    });


    /*-------------------------------------------------------------------------------
    Jump To
    -------------------------------------------------------------------------------*/
    $('body').on('click', '.sigma-go-to', function(e) {
        e.preventDefault();

        var jumpTo = $(this).data('to');

        $("html, body").animate({
            scrollTop: $(jumpTo).offset().top
        }, 600);
        return false;

    });

    /*-------------------------------------------------------------------------------
    Mobile Navigation and Aside panels
    -------------------------------------------------------------------------------*/
    $(".aside-inner .menu-item-has-children > a").on('click', function(e) {
        var submenu = $(this).next(".sub-menu");
        e.preventDefault();
        submenu.slideToggle(200);
    });
    $(".aside-inner .sigma_mega-menu-item > a").on('click', function(e) {
        var submenu = $(this).next(".sigma_mega-menu-wrapper");
        e.preventDefault();
        submenu.slideToggle(200);
    });

    $(".aside-trigger").on('click', function() {
        $(".burger-icon.aside-trigger").toggleClass('active');
        $(".desktop-aside").toggleClass("active");
    });
    $(".aside-m-trigger").on('click', function() {
        $(".burger-icon.aside-m-trigger").toggleClass('active');
        $(".mobile-aside").toggleClass("active");
    });

    $(".aside-trigger-right").on('click', function() {
        var $el = $(".sigma_aside-right-panel");
        $el.toggleClass('open');
        if ($el.hasClass('open')) {
            setTimeout(function() {
                $el.find('.sidebar').fadeIn();
            }, 300);
        } else {
            $el.find('.sidebar').fadeOut();
        }
    });

    $(".aside-trigger-left").on('click', function() {
        $(".sigma_aside-left").toggleClass('open');
    });

    $(".sigma_aside .menu-item-has-children > a").on('click', function(e) {
        var submenu = $(this).next(".sub-menu");
        e.preventDefault();

        submenu.slideToggle(200);
    });
    $(".sigma_aside .sigma_mega-menu-item > a").on('click', function(e) {
        var submenu = $(this).next(".sigma_mega-menu-wrapper");
        e.preventDefault();
        submenu.slideToggle(200);
    });


    /*-------------------------------------------------------------------------------
  Search Form
	-------------------------------------------------------------------------------*/

    $(".sigma_search-trigger").on('click', function(e) {
        e.preventDefault();
        $(".search-window").toggleClass('open');
    });


    /*-------------------------------------------------------------------------------
  Sticky Header
	-------------------------------------------------------------------------------*/
    var header = $(".can-sticky");
    var headerHeight = header.innerHeight();

    function doSticky() {
        if (window.pageYOffset > headerHeight) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
    }
    doSticky();

    /*-------------------------------------------------------------------------------
    Back to top
    -------------------------------------------------------------------------------*/
    function stickBackToTop() {
        if (window.pageYOffset > 400) {
            $('.go-top').addClass('active');
        } else {
            $('.go-top').removeClass('active');
        }
    }
    stickBackToTop();

    $('body').on('click', '.go-top', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    /*-------------------------------------------------------------------------------
    Masonry
    -------------------------------------------------------------------------------*/
    $('.masonry').imagesLoaded(function() {
        var isotopeContainer = $('.masonry');
        isotopeContainer.isotope({
            itemSelector: '.masonry-item',
        });
    });


    /*-------------------------------------------------------------------------------
    Countdown
    -------------------------------------------------------------------------------*/
    $(".sigma_countdown-timer").each(function() {
        var $this = $(this);
        $this.countdown($this.data('countdown'), function(event) {
            $(this).text(
                event.strftime('%D days %H:%M:%S')
            );
        });
    });

    /*-------------------------------------
 Countdown
 -------------------------------------*/
    $('.ss-countdown-time').each(function() {
        var endTime = $(this).data('time');
        $(this).countdown(endTime, function(tm) {
            $(this).html(tm.strftime('<span class="section_count"><span class="tcount days">%D</span><span class="text">Days</span></span><span class="section_count"><span class="tcount hours">%H</span><span class="text">Hours</span></span><span class="section_count"><span class="tcount minutes">%M</span><span class="text">Minutes</span></span><span class="section_count"><span class="tcount seconds">%S</span><span class="text">Seconds</span></span>'));
        });
    });

    /*-------------------------------------------------------------------------------
    Tooltips
    -------------------------------------------------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();
    $('.popup-sigma a, .youtube-popup-trigger, .sigma_video-popup, .link-popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    //On scroll events
    $(window).on('scroll', function() {

        doSticky();
        stickBackToTop();

    });

    /*-------------------------------------------------------------------------------
    Gallery Post format slider
    -------------------------------------------------------------------------------*/
    $(".post_format-post-format-gallery .sigma_post-thumb.has-slider").slick({

        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        autoplay: false,
        centerMode: true,
        centerPadding: 0,
        responsive: [{
            breakpoint: 767,
            settings: {
                arrows: false
            }
        }]
    });

    /*-------------------------------------
      Circle Progress bar
      -------------------------------------*/
    function animateRoundedProgress(rpb) {
        if (!$(rpb).hasClass('animated')) {
            $(rpb).css('stroke-dashoffset', 358.141563 - (358.141563 / 100) * $(rpb).attr('aria-valuenow'));
            $(rpb).addClass('animated');
        }
    }

    function animateRoundedProgressSm(rpb) {
        if (!$(rpb).hasClass('animated')) {
            $(rpb).css('stroke-dashoffset', 232.477856 - (232.477856 / 100) * $(rpb).attr('aria-valuenow'));
            $(rpb).addClass('animated');
        }
    }

    function initRoundedProgress() {
        var roundedProgress = $('.progress-cicle');
        var roundedProgressSm = $('.progress-cicle-sm');
        roundedProgress.each(function() {
            animateRoundedProgress(this);
        });
        roundedProgressSm.each(function() {
            animateRoundedProgressSm(this);
        });
    }
    initRoundedProgress();

    /*-------------------------------------
    Audio icon player
    -------------------------------------*/
    $(".soundcloud-popup").on('click', function(e) {
        e.preventDefault();
        $(this).closest('.sigma-sermons-style-1').find('.soundcloud-icon-player').toggleClass('open');
    });
    /*-------------------------------------------------------------------------------
      Header login/Register popup
    -------------------------------------------------------------------------------*/
    $('.register-new-account').not('.register-new-account.active').on('click', function(e) {
        e.preventDefault();

        $('.login-register-form-toggle').addClass('visible');
        $('.login-form-wrapper').addClass('hidden');
        $('.header-login-register-form .sigma_close').addClass('hidden');
        $('.registration-form-wrapper').addClass('active');
    });

    $('.login-register-form-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).removeClass('visible');
        $('.login-form-wrapper').removeClass('hidden');
        $('.registration-form-wrapper').removeClass('active');
    });


})(jQuery);


jQuery(document).ready(function($) {
    // Add ajax wishlist
    $(document).delegate('.ajax-wishlist-btn.wishlist-add', 'click', function(e) {
        $(this).addClass('ajax-wishlist-loading');
        var link = $(this);
        var post_id = $(this).data('post_id');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_woocommerce_object.ajaxurl,
            data: {
                'action': 'add_ajax_wishlist',
                'post_id': post_id,
                'mode': 'add'
            },
            success: function(data) {
                link.removeClass('ajax-wishlist-loading');
                link.removeClass('wishlist-add');
                link.addClass('wishlist-remove');

                if (!data.logged_in) {
                    $('#header-login-register-form').modal('show');
                }

                // console.log(data.add_wishlist);

                if (data.add_wishlist == 'added') {
                    link.addClass('wishlist-added');
                }
            },
            error: function(data) {
                console.log('error');
            }
        });
        e.preventDefault();
    });

    // Remove ajax wishlist
    $(document).delegate('.ajax-wishlist-btn.wishlist-remove', 'click', function(e) {
        $(this).addClass('ajax-wishlist-loader');
        var link = $(this);
        var post_id = $(this).data('post_id');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_woocommerce_object.ajaxurl,
            data: {
                'action': 'add_ajax_wishlist',
                'post_id': post_id,
                'mode': 'remove'
            },
            success: function(data) {
                link.removeClass('ajax-wishlist-loader');
                link.addClass('wishlist-add');
                link.removeClass('wishlist-remove');

                if (!data.logged_in) {
                    $('#header-login-register-form').modal('show');
                }

                // console.log(data.remove_wishlist);

                if (data.remove_wishlist == 'removed') {
                    link.removeClass('wishlist-added');
                }
            },
            error: function(data) {
                console.log('error');
            }
        });
        e.preventDefault();
    });

    $('.prayer-submit-form-wrapper select').selectpicker();

    // submit prayer ajax
    $('form#ajax-prayer-form .sigma_custom-btn').on('click', function(e) {
        $("form#ajax-prayer-form .sigma_custom-btn").html('Please Wait... <i class="fa fa-spin fa-spinner"></i>');
        $.ajax({
            type: 'POST',
            url: ajax_woocommerce_object.ajaxurl,
            data: {
                'action': 'maharatri_prayer_submit_form',
                'prayer_title': $('#ajax-prayer-form #prayer_title').val(),
                'prayer_content': $('#ajax-prayer-form #prayer_content').val(),
                'prayer_cat': $('#ajax-prayer-form #prayer_cat').val(),
                'prayer_tag': $('#ajax-prayer-form #prayer_tag').val(),
                'post_type': $('#ajax-prayer-form #post_type').val(),
            },
            success: function(data) {
                console.log(data);
                $("#prayer-submit-error").html(data);
                $("form#ajax-prayer-form .sigma_custom-btn").html('Submit');
                $("#prayer-submit-error").addClass('visible');
                $("form#ajax-prayer-form")[0].reset();
                $("form#ajax-prayer-form select").selectpicker("refresh");
            },
            error: function(errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    });

    $(".m-megamenu-collapse-card > a").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                .siblings(".content")
                .slideUp(500);
        } else {
            $(".m-megamenu-collapse-card > a").removeClass("active");
            $(this).addClass("active");
            $(".content").slideUp(500);
            $(this)
                .siblings(".content")
                .slideDown(500);
        }
    });

});