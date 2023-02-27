'use strict'
$(document).ready(function () {
    getAnnounceByID();
    const captcha = new Captcha($('#canvas'), { caseSensitive: false });
    var selected_courses = [];
    // Verify and show Shopping Bar
    $.getScript('js/shopping.js', function () {
        _shopping.showVerifyShoppingBar();
    });

    // Verify and get announce from URL (id)
    function getAnnounceByID() {
        var url_params = new URLSearchParams(window.location.search);
        if (url_params.has('id')) {
            var id_announce = url_params.get('id');
            $.getScript('js/global.js', function () {
                $.ajax({
                    type: "POST",
                    url: _global.server_url + 'web/web.php',
                    data: "web_action=getAnnounceByID&id=" + id_announce,
                    dataType: "json",
                    success: function (response) {
                        setAnnounce(response);
                    }, error: function (error) {
                        console.error(error);
                    }
                });
            });
        }
    }

    // Set values in label announce
    function setAnnounce(announce) {
        if (typeof announce === 'object') {
            var locations_maps = ``;
            var locations_label = '';
            announce.locations.forEach(location => {
                locations_maps += `<img src="./images/map-locations/${location.location == 'Potosí' ? 'Potosi' : location.location}.png" class="position-absolute" width="70" alt="">`;
                locations_label += location.region == '' ? location.location + ' ,' : location.region + ', ';
            }); locations_maps += `<img src="./images/map-locations/Bolivia.png" width="70" alt="">`;
            var requires_label = ``;
            announce.requires.forEach(require => {
                requires_label += `
                    <li class="qtext-dark"><i class="far fa-check-circle"></i><strong> ${require.require_name}</strong></li>
                `;
            });
            var courses_label = ``;
            selected_courses = announce.courses;
            announce.courses.forEach(course => {
                courses_label += `<div class="d-flex align-items-center alert border-secondary p-2">
                    <i class="fa fa-graduation-cap qtext-primary" style="font-size:2rem;"></i>
                    <span class="ml-2 d-block">
                        ${course.title_course.length > 100 ? course.title_course.substring(0, 100) + '...' : course.title_course}
                    </span>
                </div>`;
            });
            $('#locations-maps').html(locations_maps);
            $('#profesion-required').html(announce.profesion_required);
            $('#entity-caller').html(announce.entity_caller);
            $('#future-position').html(announce.future_position);
            $('#locations-content').html(locations_label.substring(0, locations_label.length - 2));
            $('#requires-content').html(requires_label);
            $('#salary').html(announce.salary == 0 ? 'No declarado por la institución' : announce.salary + ' Bs.');
            $('#limit-time').html(_global.dateSpanish(announce.limit_date) + ' - Hrs: ' + announce.limit_hour.substring(0, announce.limit_hour.length - 3));
            $('#download-link').data('document-name', announce.announce_document);
            $('#courses-content').html(courses_label);
        } else {
            console.error('No es un objeto');
        }
    }

    // Action click Download (verify captcha)
    $('#download-link').click(function (e) {
        e.preventDefault();
        var input_value = $('#input-announce-captcha');
        if (input_value.val().length == 0) {
            input_value.focus();
        } else {
            if (captcha.valid(input_value.val())) {
                window.location.href = _global.server_url + 'assets/documents/' + $(this).data('document-name');
            } else {
                input_value.val('').focus();
            }
        }
    });

    // Action button redirect to Purchase
    $('#shopping-purchase').click(function (e) {
        e.preventDefault();
        $(window).attr('location', './purchase.html');
    });

    // Action click add suggest courses to {Shopping Cart}
    $('#add-courses-cart').click(function (e) {
        e.preventDefault();
        if (selected_courses.length > 0) {
            $.getScript('js/shopping.js', function () {
                localStorage.setItem('shopping_courses', JSON.stringify(selected_courses));
                _shopping.showVerifyShoppingBar();
            });
        }
    });

    // Action button delete a item of {Shopping Cart}
    $(document).on("click", ".btn-delete-item", function () {
        var id_item = $(this).data('id-course');
        $.getScript('js/shopping.js', function () {
            _shopping.deleteItemShoppingCart(id_item);
        });
    });
});