(function($) {
    "use strict"

    $(window).on('load', function() {

        /*
         * Run Progress Bar
         */
        var progressbar = function() {
            var window_position = $(window).scrollTop();
            window_position = window_position + $(window).height();
            $('.sigma-progress-bar-inner').each(function(index) {
                var element_position = $(this).offset().top;
                if (element_position < window_position) {
                    if (!$(this).parent('.sigma-progress-bar').hasClass('bar-is-animated')) {
                        $(this).parent('.sigma-progress-bar').addClass('bar-is-animated');
                        var $this = this;
                        var max_value = $(this).attr('data-bar-value');
                        var width = 1;
                        var id = setInterval(frame, 14);

                        function frame() {
                            if (width >= 100) {
                                clearInterval(id);
                            } else {
                                if (max_value >= width) {
                                    width++;
                                    $($this).css('width', width + "%");
                                }
                            }
                        }
                    }
                }
            });
        }

        $('.chart').easyPieChart({
            //your configuration goes here
            easing: 'easeOut',
            delay: 3000,
            scaleColor: false,
            animate: 2000,
        });

        progressbar();
        $(window).on('scroll', function() {
            progressbar();
        });

        /*
         * Owl carousel
         */
        $('.owl-carousel').each(function() {
            var $owl_options = ($(this).attr('data-owl_options')) ? $(this).data('owl_options') : {};
            $owl_options.rtl = ($('body').hasClass('rtl')) ? true : false;
            $(this).owlCarousel($owl_options);
        });

        /*
         * slick slider
         */
        $('.shortcode_slider, .sigma_shortcode-slider, .portfolios-slider').not('.slick-initialized').slick();

        // porfolio masonary
        var $grid = $('.masonry-items').isotope({
            itemSelector: '.masonry-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.masonry-item',
            },
        });

        $("a.trigger-volunteer-socials").on('click', function(e) {
            e.preventDefault();
            $(this).closest('.sigma_sm').toggleClass('visible');
        });


        // items on button click
        $('.masonry-filter ul').on('click', 'li', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });

        // menu active class
        $('.masonry-filter ul li').on('click', function(event) {
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });

        /*
         * Magnific Popup
         */
        $('.gallery-loop .popup-image').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
            },
            mainClass: 'mfp-fade',
        });

        /*
         * popup video
         */
        $('.popup-video').magnificPopup({
            type: 'iframe',
        });

        /* stories filter tabs */

        function doIsotope() {
            var $storiesGrid = '';

            $('.masonry').imagesLoaded(function() {
                $storiesGrid = $('.stories-filter').isotope({
                    itemSelector: '.col-lg-4',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.col-lg-4'
                    }
                });
            });

            $('.filter-items').on('click', '.stories-trigger', function() {
                var filterValue = $(this).attr('data-filter');
                $storiesGrid.isotope({
                    filter: filterValue
                });
            });

            $('.stories-trigger').on('click', function(e) {
                $(this).closest('.filter-items').find('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });

        }

        doIsotope();

        // shortcode: Products Tab
        $(".sigma_post-filter-items").each(function(i, filterDynamicIds) {
            var $filterDaynamicId = $(filterDynamicIds);
            $filterDaynamicId.isotope({
                filter: $filterDaynamicId.prev().find('.sigma_filter-first-item').data('filter'),
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
        });

        $('body').on('click', '.sigma_post-filter a', function() {
            var wrapper = $(this).closest('.sigma-shortcode-wrapper');

            wrapper.find('.sigma_post-filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');

            wrapper.find('.sigma_post-filter-items').isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            // try it
            return false;
        });
        /*
         *  counter progress round circle
         */
        $('.chart-two').each(function() {
            var $this = $(this);
            $this.bind('inview', function(
                event,
                visible,
                visiblePartX,
                visiblePartY
            ) {
                if (visible) {
                    $(this)
                        .find('.countup')
                        .each(function() {
                            var $this = $(this);
                            $({
                                Counter: 0
                            }).animate({
                                Counter: $this.text()
                            }, {
                                duration: 2000,
                                easing: 'swing',
                                step: function() {
                                    $this.text(Math.ceil(this.Counter));
                                },
                            });
                        });
                    $(this).unbind('inview');
                }
            })
        });

        $('.chart-two').each(function() {
            var $this = $(this);
            $this.bind('inview', function(
                event,
                visible,
                visiblePartX,
                visiblePartY
            ) {
                if (visible) {
                    $('.chart-two').easyPieChart({
                        //your configuration goes here
                        easing: 'easeOut',
                        delay: 3000,
                        barColor: '#ffaa17',
                        trackColor: '#e2e8ee',
                        scaleColor: false,
                        lineWidth: 3,
                        trackWidth: 3,
                        size: 90,
                        animate: 2000,
                    });
                    $(this).unbind('inview');
                }
            });
        });
        /*
         * counter
         */
        $('.counter-box').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this)
                    .find('.counter')
                    .each(function() {
                        var $this = $(this);
                        $({
                            Counter: 0
                        }).animate({
                            Counter: $this.text()
                        }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.ceil(this.Counter));
                            },
                            complete: function() {
                                $this.text(this.Counter)
                            }
                        });
                    });
                $(this).unbind('inview');
            }
        });

        /*-------------------------------------------------------------------------------
        3d card
        -------------------------------------------------------------------------------*/
        var card = $(".sigma_card-3d");

        var cardHeight = card.innerHeight();
        var cardWidth = card.innerWidth();

        card.on('mousemove', handleMove);

        function handleMove(e) {
            var xVal = e.pageX - $(this).offset().left;
            var yVal = e.pageY - $(this).offset().top;

            var yRotation = 15 * ((xVal - cardWidth / 2) / cardWidth);
            var xRotation = -15 * ((yVal - cardHeight / 2) / cardHeight);
            $(this).css({
                "transform": "perspective(500px) rotateX(" + xRotation + "deg) rotateY(" + yRotation + "deg)",
                "transition": "0s"
            })
        }

        /* Add listener for mouseout event, remove the rotation */
        card.on('mouseout', function() {
            $(this).css({
                "transform": "perspective(500px) rotateX(0) rotateY(0)",
                "transition": ".3s"
            })
        })

        /* Add listener for mousedown event, to simulate click */
        card.on('mousedown', function() {
            $(this).css({
                "transform": "perspective(500px) rotateX(0) rotateY(0)",
                "transition": ".3s"
            })
        })

        /* Add listener for mouseup, simulate release of mouse click */
        card.on('mouseup', function() {
            $(this).css({
                "transform": "perspective(500px) rotateX(0) rotateY(0)",
                "transition": ".3s"
            })
        })


    });
})(jQuery);