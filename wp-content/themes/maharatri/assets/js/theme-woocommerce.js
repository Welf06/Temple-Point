(function($) {
    "use strict"

    /*-------------------------------------------------------------------------------
    Checkout Notices
    -------------------------------------------------------------------------------*/
    $(".sigma_notice a").on('click', function(e) {
        e.preventDefault();

        $(this).closest('.sigma_notice').next().slideToggle();
    });

    /*-------------------------------------------------------------------------------
    Add / Subtract Quantity
    -------------------------------------------------------------------------------*/
    $("body").on('click', '.qty span', function() {
        var qty = $(this).closest('.qty').find('input');
        var qtyVal = parseInt(qty.val());

        if ($(this).hasClass('qty-add')) {
            if (qty.val() >= 1) {
                $("[name='update_cart']").removeAttr('disabled');
                qty.val(qtyVal + 1);
            } else {
                $("[name='update_cart']").removeAttr('disabled');
                qty.val(1);
            }
        } else {
            $("[name='update_cart']").removeAttr('disabled');
            return qtyVal >= 1 ? qty.val(qtyVal - 1) : 0;
        }

    });

    /*-------------------------------------------------------------------------------
    Login / Register Toggle
    -------------------------------------------------------------------------------*/
    $(".sigma_auth-toggle button").on('click', function() {

        var index = $(".sigma_auth-toggle button").index(this);

        $(".sigma_auth-toggle button").removeClass('active');
        $(this).addClass('active');

        $(".sigma_auth-wrapper").addClass('hidden');
        $(".sigma_auth-wrapper").eq(index).removeClass('hidden');

    });


    /*-------------------------------------------------------------------------------
    Cart: Notification on added
    -------------------------------------------------------------------------------*/
    $('body').on('added_to_cart', function() {
        var snackBar = $(".maharatri-snackbar");
        if (!snackBar.hasClass('show')) {
            snackBar.addClass('show');
            setTimeout(function() {
                snackBar.removeClass('show');
            }, 3000);
        }
    });

    /*-------------------------------------------------------------------------------
    Cart Trigger
    -------------------------------------------------------------------------------*/
    $("body").on('click', '.cart-trigger .sigma_cart-icon', function(e) {
        e.preventDefault();
        $(this).closest('.sigma_header-cart-inner').toggleClass('open');
    });

    /*-------------------------------------------------------------------------------
    Related Products / Posts
    -------------------------------------------------------------------------------*/
    $(".sigma_related-posts-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    $(document).on('added_to_wishlist removed_from_wishlist', function() {
        var counter = $('.wishlist-item');
        $.ajax({
            url: yith_wcwl_l10n.ajax_url,
            data: {
                action: 'yith_wcwl_update_wishlist_count'
            },
            dataType: 'json',
            success: function(data) {
                counter.html(data.count);
            },
            beforeSend: function() {
                counter.block();
            },
            complete: function() {
                counter.unblock();
            }
        })
    });

    /*-------------------------------------------------------------------------------
    Woo compare
    -------------------------------------------------------------------------------*/

    /*--- Add compare products ----*/

    $("body").on('click', '.maharatri-product-compare-button a', function(e) {
        var $this = $(this),
            id = $this.data('id'),
            addedText = $this.data('added-text');
        if ($this.hasClass('added')) return true;
        e.preventDefault();
        $this.addClass('loading');
        var compare_snackBar = $(".maharatri-compare-snackbar");

        $.ajax({
            url: ajax_woocommerce_object.ajaxurl,
            dataType: 'json',
            data: {
                action: 'maharatri_add_to_compare',
                id: id,
            },
            method: 'GET',
            success: function(response) {
                if (response.table) {
                    $(document).trigger('added_to_compare');
                    if (!compare_snackBar.hasClass('show')) {
                        compare_snackBar.addClass('show');
                        setTimeout(function() {
                            compare_snackBar.removeClass('show');
                        }, 3000);
                    }

                } else {
                    console.log(response);
                }
            },
            complete: function() {
                $this.removeClass('loading').addClass('added');
            },
        });

    });

    /*---- Remove Compare Products ----*/
    $("body").on('click', '.maharatri-compare-remove', function(e) {
        e.preventDefault();
        var $this = $(this),
            id = $this.data('id');

        $this.addClass('loading');

        $.ajax({
            url: ajax_woocommerce_object.ajaxurl,
            dataType: 'json',
            data: {
                action: 'maharatri_remove_from_compare',
                id: id,
            },
            method: 'GET',
            success: function(response) {
                if (response.table) {
                    updateCompare(response);
                } else {
                    console.log(response);
                }
            },
            complete: function() {
                $this.addClass('loading');
            },
        });

    });

    // Elements update after ajax
    function updateCompare(data) {
        if ($('.maharatri-compare-table').length > 0) {
            $('.maharatri-compare-table').replaceWith(data.table);
        }

    }

    // Show product compare data in snackbar
    $("body").on('click', '.maharatri-product-compare-button a', function(e) {

        var id = $(this).data('id');
        $.ajax({
            url: ajax_woocommerce_object.ajaxurl,
            type: "POST",
            data: {
                action: 'maharatri_product_compare_snackbar_data',
                id: id
            },
            success: function(response) {
                $(".maharatri-compare-snackbar").html(response);
            }
        });
    });

    // Woocommerce product control quick view
    $(".sigma_product-inner .sigma_product-thumb .sigma_product-controls a").each(function() {
        $('.yith-wcqv-button').on("click", function() {
            $(this).addClass("hover-loader");
            setTimeout(QvRemoveClass, 5000);
        });
    });

    function QvRemoveClass() {
        $('.sigma_product-inner .sigma_product-thumb .sigma_product-controls a.yith-wcqv-button').removeClass("hover-loader");
    }



})(jQuery);