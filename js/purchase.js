'use strict'
$(document).ready(function () {
    readShoppingItems();
    getLocations();
    $('#profesion-custom-form').hide();
    $('#preview-title').hide();

    // Reading Courses in LocalStorage
    function readShoppingItems() {
        var items_label = ``;
        var items_counter = 0; var real_price = 0; var discount_price = 0;
        if (localStorage.getItem('shopping_courses') != null) {
            var shopping_items = JSON.parse(localStorage.getItem('shopping_courses'));
            $('#purchase-count').html('(' + shopping_items.length + ')');
            shopping_items.forEach(item => {
                items_label += `
                <div class="alert alert-secondary text-dark p-2 d-flex align-items-center">
                    <i class="fa fa-graduation-cap qtext-secondary" style="font-size:1.2rem;"></i>
                    <p class="ml-2 mb-0">
                        <span class="font-weight-bold">${item.title_course}</span><br>
                        <small>Carga horaia de ${item.time_gain} horas</small>
                    </p>
                </div>
                `;
                real_price += parseInt(item.price);
                switch (items_counter) {
                    case 1: discount_price += parseInt(item.price); break;
                    case 2: discount_price += 50; break;
                    case 3: discount_price += 30; break;
                    case 4: discount_price += 40; break;
                    default: discount_price += 50; break;
                }
            });
            $('#purchase-prices').html(`Total: <span class="shopping-dashed-price">${real_price} Bs.</span>
            <span class="qtext-secondary h2" id="some">${discount_price} Bs.</span>`);
            $('#price-form').val(discount_price);
        } else {
            items_label = `
            <div class="alert alert-secondary text-dark p-2 d-flex align-items-center">
                <i class="fa fa-graduation-cap qtext-secondary" style="font-size:1.2rem;"></i>
                <p class="ml-2 mb-0">
                    (No hay cursos seleccionados)
                </p>
            </div>
            `;
        }
        $('#purchase-courses').html(items_label);
    }

    // Getting locations
    function getLocations() {
        $.getScript('js/global.js', function () {
            $.ajax({
                type: "POST",
                url: _global.server_url + 'web/web.php',
                data: "web_action=getLocations",
                dataType: "json",
                success: function (response) {
                    setLocationsForm(response);
                }, error: function (error) {
                    console.error(error);
                }
            });
        });
    }

    // Set location to Form
    function setLocationsForm(locations) {
        var locations_label = `<option selected value="">Departamento de envio</option>`;
        locations.forEach(location => {
            locations_label += `
                <option value="${location.id}">${location.location_name}</option>
            `;
        });
        $('#location-form').html(locations_label);
    }

    // Event change options profesion select
    $('#profesion-select').change(function (e) {
        e.preventDefault();
        if ($(this).val() == 'op-other') {
            $('#profesion-select-form').hide();
            $('#profesion-custom-form').show();
            $('#profesion-custom').focus();
        } else {
            $(this).val() == 'op-none' ? $('#label-abrev').html('"') : $('#label-abrev').html('"' + $(this).val());
        }
        $('#preview-title').show();
    });

    // Keyup functions
    $('#profesion-custom').keyup(function (e) { $('#label-abrev').html($(this).val()); });
    $('#name').keyup(function (e) { $('#label-first-name').html($(this).val()); });
    $('#second-name').keyup(function (e) { $('#label-second-name').html($(this).val()); });
    $('#last-name').keyup(function (e) { $('#label-last-name').html($(this).val() + '"'); });

    // Button Submit Form Client
    $('#form-client').submit(function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        if (localStorage.getItem('shopping_courses') != null) {
            var shopping_courses = JSON.parse(localStorage.getItem('shopping_courses'));
            shopping_courses.forEach(course => {
                formData.append("courses[]", course.id);
            });
        }
        $.getScript('js/global.js', function () {
            $.ajax({ 
                type: "POST",
                url: _global.server_url + 'web/web.php',
                cache: false,
                async: false,
                contentType: false,
                processData: false,
                data: formData,
                success: function (response) {
                    if(response) {
                        localStorage.removeItem('shopping_courses');
                        $(window).attr('location', './success.html');
                    } else {
                        alert("Ha ocurrido un error al registrar al cliente");
                    }
                },
                error: function (error) {
                    console.error(error);
                }
            });
        });
    });
});