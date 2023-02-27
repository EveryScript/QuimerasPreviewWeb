var _global = {
    server_url: "http://localhost/QuimerasBootstrap/QuimerasAdminBootstrap/",
    differenceDays: function (date_start, date_end) {
        if (date_start.diff(date_end, 'days') == 0) {
            return 'hoy';
        }
        if (date_start.diff(date_end, 'days') == 1) {
            return 'ayer';
        }
        if (date_start.diff(date_end, 'days') > 1) {
            return 'hace ' + date_start.diff(date_end, 'days') + ' dias';
        }
        if (date_start.diff(date_end, 'days') > 30) {
            return 'hace ' + date_start.diff(date_end, 'month') + ' mes';
        }
    },
    dateSpanish: function (any_date) {
        var days = dayjs(any_date).format('D');
        var month = dayjs(any_date).format('MMMM');
        return days + ' de ' + month;
    },
    discountAlgorithm: function (array_items) {
        var array_counter = 0; var real_price = 0; var discount_price = 0;
        array_items.forEach(item => {
            array_counter ++;
            switch (array_counter) {
                case 1: discount_price += parseInt(item.price);  break;
                case 2: discount_price += 50; break;
                case 3: discount_price += 30; break;
                case 4: discount_price += 40; break;
                default: discount_price += 50; break;
                    break;
            }
            real_price += parseInt(item.price);
        });
        return {real_price: real_price, discount_price: discount_price};
    }
}
