$(document).ready(function () {
    getAnnouncesMinimal();
    var today = dayjs(); dayjs.locale('es');
    var all_announces = [];

    // Get current announces
    function getAnnouncesMinimal() {
        $.getScript('js/global.js', function () {
            $.ajax({
                type: "POST",
                url: _global.server_url + 'web/web.php',
                data: "web_action=getAnnouncesMinimal",
                dataType: "json",
                success: function (response) {
                    all_announces = response;
                    setAnnounces(response);
                }, error: function (error) {
                    console.error(error);
                }
            });
        });
    }

    // Set label announces
    function setAnnounces(announces, search_text = '') {
        var announces_label = ``;
        if (search_text != '') {
            announces_label = `
                <p class="col-lg-12 text-center text-dark"><strong>${announces.length}</strong> resultados de la búsqueda de "${search_text}"</p>
            `;
        }

        if (announces.length > 0) {
            announces.forEach(announce => {
                var images_label = ``;
                var locations_label = `<i class="fa fa-dot-circle mr-1"></i>`;
                announce.locations.forEach(location => {
                    images_label += `<img src="./images/map-locations/${location.location == 'Potosí' ? 'Potosi' : location.location}.png" class="position-absolute" width="85" alt="">`;
                    locations_label += `${location.region.length == '' ? location.location : location.region}, `;
                });
                announces_label += `
                    <div class="col-lg-6">
                        <div class="media-body d-block mb-4">
                            <span class="d-block">Se solicita</span>
                            <h4 class="mb-0">${announce.profesion_required}</h4>
                            <small class="text-muted mb-1">
                                Publicado ${_global.differenceDays(today, dayjs(announce.publication_date))} | 
                            </small>
                            ${today.isBefore(dayjs(announce.limit_date)) ?
                        '<small class="qtext-success mb-1 font-weight-bold">EXPIRA EL ' + _global.dateSpanish(announce.limit_date).toUpperCase() + '</small>' :
                        '<small class="qtext-danger mb-1 font-weight-bold">EXPIRADA</small>'}
                            
                            <div class="d-flex mt-1">
                                <p class="flex-1 mr-3">
                                    ${images_label}
                                    <img src="./images/map-locations/Bolivia.png" width="85" alt="">
                                </p>
                                <p class="flex-fill">
                                    <span class="mb-0 text-dark text-uppercase">${announce.entity_caller}</span><br>
                                    <span class="qtext-danger">${locations_label.substring(0, locations_label.length - 2)}</span><br>
                                    <a href="ann-single.html?id=${announce.id}" class="d-inline-block text-white qbg-danger p-2 mt-1 h6">
                                        <i class="fa fa-arrow-right mr-1"></i> Ver convocatoria</a><br>
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        $('#announces-content').html(announces_label);
    }

    // Search location select
    $('#search-select-location').change(function (e) {
        $('#input-search-profesion').val('');
        $('#input-search-entity').val('');
        e.preventDefault();
        if ($(this).val() != '') {
            $('#announces-content').html('');
            var announces_filtered = all_announces.filter(announce => announce.locations.some(location => location.location == $(this).val()));
            setAnnounces(announces_filtered, $(this).val());
        } else {
            getAnnouncesMinimal();
        }
    });

    // Search announces by profesion
    $('#input-search-profesion').keyup(function (e) {
        e.preventDefault();
        searchAnnouncesAction('profesion', $(this).val());
    });
    
    // Search announces by entity
    $('#input-search-entity').keyup(function (e) {
        e.preventDefault();
        searchAnnouncesAction('entity', $(this).val());
    });

    // Search announces action
    function searchAnnouncesAction(announce_field, text) {
        if (text != '') {
            $('#announces-content').html('');
            switch (announce_field) {
                case 'profesion':
                    var announces_filtered = all_announces.filter(announce => announce.profesion_required.toLowerCase().includes(text));
                break;
                case 'entity':
                    var announces_filtered = all_announces.filter(announce => announce.entity_caller.toLowerCase().includes(text));
                break;
            }
            setAnnounces(announces_filtered, text);
        } else {
            getAnnouncesMinimal();
        }
    }
});