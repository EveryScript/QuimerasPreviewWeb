'use strict'
$(document).ready(function () {
    getCourses();
    showAdCourses();
    var all_courses = [];
    // Verify and show Shopping Bar
    $.getScript('js/shopping.js', function () {
        _shopping.showVerifyShoppingBar();
    });

    // Get all courses
    function getCourses() {
        $.getScript('js/global.js', function () {
            $.ajax({
                type: "POST",
                url: _global.server_url + 'web/web.php',
                data: "web_action=getCourses",
                dataType: "json",
                success: function (response) {
                    all_courses = response;
                    setCourses(response, '', 10);
                }, error: function (error) {
                    console.error(error);
                }
            });
        });
    }

    // Set Courses content
    function setCourses(courses, search_text = '', limit_range = 0) {
        var courses_label = search_text == '' ? `` : `<p class="col-12 text-center text-dark"><span class="font-weight-bold">${courses.length}</span> Resultados de la búsqueda de "${search_text}"</p>`;
        if (courses.length > 0) {
            var counter_range = 0;
            courses.forEach(course => {
                var themes_label = ``;
                counter_range++;
                if (counter_range <= limit_range) {
                    course.themes.forEach(theme => {
                        themes_label += `
                            <a href="${theme.link}" class="btn btn-rounded bg-secondary text-light p-0 pl-2 pr-2 mt-2 link-course-video btn-add-item" target="_blank" data-id-course="${course.id}">
                                ${theme.theme}
                            </a>
                        `;
                    });
                    courses_label += `
                    <article class="col-lg-6 mb-5">
                        <h4 class="mb-1">${course.title_course}</h4>
                        <p class="text-muted mb-1">${course.description}</p>
                        <div class="media img-block mb-lg-0">
                            <img src="${_global.server_url + 'assets/img/courses/' + course.image}" class="img-fluid rounded mr-2 mb-2">
                            <div class="media-body">
                                <p class="qtext-primary mb-0"><i class="fa fa-shopping-cart mr-1"></i> Costo de ${course.price} Bs. con factura </p>
                                <p class="qtext-primary mb-0"><i class="fa fa-user-clock mr-1"></i> Carga horaria de ${course.time_gain} horas </p>
                                <p class="qtext-primary mb-0"><i class="fa fa-graduation-cap mr-1"></i> ${course.realization_date} </p>
                                <p class="d-flex justify-content-space-around mb-2">
                                    ${themes_label}
                                </p>
                                <button class="btn btn-block btn-rounded qbg-primary p-2 btn-right-contain btn-add-item" data-id-course="${course.id}">
                                    <i class="fa fa-plus mr-1"></i> Añadir curso
                                </button>
                            </div>
                        </div>
                        <button class="btn btn-block btn-rounded qbg-primary p-2 btn-block-contain btn-add-item" data-id-course="${course.id}">
                            <i class="fa fa-plus mr-1"></i> Añadir curso
                        </button>
                    </article>`;
                }
            });
            $('#search-control-block').hide();
        }
        if (search_text == '' && limit_range < courses.length) {
            courses_label += `<div class="col-12 text-center">
                <button class="btn border-dark btn-rounded" id="btn-see-more" data-counter-more="${limit_range + 10}">
                    <i class="fa fa-arrow-down mr-2"></i>Ver más</button>
            </div>`;
        }
        $('#courses-content').html(courses_label);
    }

    // Action button See More
    $(document).on("click", "#btn-see-more", function (e) {
        e.preventDefault();
        setCourses(all_courses, '', $(this).data('counter-more'));
    });

    // Search course by word
    $('#input-search-course').keyup(function (e) {
        e.preventDefault();
        var value_text = $(this).val();
        $('#search-control-title').html('Buscando');
        $('#search-control-block').show();
        $('#courses-content').hide();
        if (value_text.length > 0) {
            if (all_courses.length > 0) {
                setTimeout(() => {
                    var array_text = value_text.split(' ');
                    var courses_filtered = all_courses.filter(course =>
                        array_text.every((text) => course.title_course.toLowerCase().includes(text))
                    );
                    setCourses(courses_filtered, $(this).val(), all_courses.length);
                    $('#search-control-block').hide();
                    $('#courses-content').show();
                }, 1000);
            }
        } else {
            setCourses(all_courses, '', 10);
            $('#search-control-block').hide();
            $('#courses-content').show();
        }
    });

    // Action button add item to Shopping Courses
    $(document).on("click", ".btn-add-item", function () {
        var id_item = $(this).data('id-course');
        var found = all_courses.find((course) => course.id == id_item);
        if (typeof found === 'object') {
            $.getScript('js/shopping.js', function () {
                var item_send = { id: found.id, title_course: found.title_course, time_gain: found.time_gain, price: found.price };
                _shopping.addItemToShoppingCart(item_send);
            });
        }

    });

    // Action button redirect to Purchase
    $('#shopping-purchase').click(function (e) {
        e.preventDefault();
        $(window).attr('location', './purchase.html');
    });

    // Action button delete a item of {Shopping Cart}
    $(document).on("click", ".btn-delete-item", function () {
        var id_item = $(this).data('id-course');
        $.getScript('js/shopping.js', function () {
            _shopping.deleteItemShoppingCart(id_item);
        });
    });

    // Show Ad Quimeras Courses
    function showAdCourses() {
        setTimeout(() => {
            $('#modal-ad-courses').modal('show');
        }, 7000);
    }
});