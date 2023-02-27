var _shopping = {
    // Verifing and show shopping bar bottom
    showVerifyShoppingBar: () => {
        $('#shopping-cart-bar').show();
        $('#shopping-title').html('Cargando...');
        setTimeout(() => {
            if (localStorage.getItem('shopping_courses') == null) {
                $('#shopping-cart-bar').hide();
            } else {
                var shopping_items = JSON.parse(localStorage.getItem('shopping_courses'));
                if (shopping_items.length > 0) {
                    // Showing Bar
                    $('#shopping-title').html(`<span class="font-weight-bold">${shopping_items.length}</span> Certificados añadidos`);
                    $('#shopping-buttons').html(`
                        <button class="btn qbg-success ml-2 p-1" data-toggle="modal" data-target="#shopping-cart">
                            <i class="fa fa-eye"></i> Ver pedido
                        </button>
                    `);
                    // Loading Modal Items
                    refreshModalItems(shopping_items);
                } else {
                    localStorage.removeItem('shopping_courses');
                }

            }
        }, "1000");
    },
    // Deleting one element from Shopping Items
    deleteItemShoppingCart: (id_item) => {
        var shopping_items = JSON.parse(localStorage.getItem('shopping_courses'));
        var index_item = shopping_items.findIndex((item) => parseInt(item.id) == id_item);
        if (index_item > -1) shopping_items.splice(index_item, 1);
        if (shopping_items.length > 0) {
            localStorage.setItem("shopping_courses", JSON.stringify(shopping_items));
            $('#shopping-title').html(`<span class="font-weight-bold">${shopping_items.length}</span> Certificados añadidos`);
            var items_counter = 0; var real_price = 0; var discount_price = 0;
            shopping_items.forEach(item => {
                items_counter++;
                real_price += parseInt(item.price);
                switch (items_counter) {
                    case 1: discount_price += parseInt(item.price); break;
                    case 2: discount_price += 50; break;
                    case 3: discount_price += 30; break;
                    case 4: discount_price += 40; break;
                    default: discount_price += 50; break;
                }
            });
            $('#shopping-price').html(`
                <span class="shopping-dashed-price"> ${real_price == discount_price ? '' : real_price + ' Bs.'} </span> ${discount_price} Bs.
            `);
        } else {
            localStorage.removeItem('shopping_courses');
            $('#shopping-cart-content').html(`
                <div class="d-block text-center mb-4">
                     <div class="icon mb-2">
                         <i class="icofont-warning-alt qtext-danger h3"></i>
                     </div>
                     <p class="h5 text-muted">(No hay certificados)</p>
                </div>
            `);
            $('#shopping-footer').hide();
            $('#shopping-cart-bar').hide();
            $('#shopping-buttons').html('');
        }
    },
    // Add one course to Shopping Cart
    addItemToShoppingCart: (item_received) => {
        var shopping_items = [];
        if (localStorage.getItem('shopping_courses') == null) {
            $('#shopping-cart-bar').show();
            $('#shopping-title').html('Cargando...');
            shopping_items.push(item_received);
            setTimeout(() => {
                $('#shopping-title').html(`<span class="font-weight-bold">${shopping_items.length}</span> Certificados añadidos`);
                $('#shopping-buttons').html(`
                    <button class="btn qbg-success ml-2 p-1" data-toggle="modal" data-target="#shopping-cart">
                        <i class="fa fa-eye"></i> Ver pedido
                    </button>
                `);
                $('#shopping-footer').show();
            }, "1000");
        } else {
            shopping_items = JSON.parse(localStorage.getItem('shopping_courses'));
            if (!shopping_items.some((item) => item.id == item_received.id)) {
                shopping_items.push(item_received);
                $('#shopping-title').html(`<span class="font-weight-bold">${shopping_items.length}</span> Certificados añadidos`);
            }
        }

        localStorage.setItem("shopping_courses", JSON.stringify(shopping_items));
        refreshModalItems(shopping_items);
    },
    // Redirect to Purchase Form
    redirectToPurchase: () => {
        $(window).attr('location', './purchase.html');
    }
};

// External Function refresh List
function refreshModalItems(shopping_items) {
    var shop_label = ``;
    var items_counter = 0; var real_price = 0; var discount_price = 0;
    shopping_items.forEach(item => {
        items_counter++;
        shop_label += `
            <div class="alert alert-secondary text-dark pr-5 alert-dismissible fade show d-flex align-items-center" role="alert">
                <i class="fa fa-graduation-cap qtext-primary" style="font-size:1.2rem;"></i>
                <span class="ml-2">${item.title_course}</span>
                <button type="button" class="close btn-delete-item" data-dismiss="alert" aria-label="Close" data-id-course="${item.id}">
                    <span aria-hidden="true">&times;</span>
                </button>
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
    $('#shopping-cart-content').html(shop_label);
    $('#shopping-price').html(`
        <span class="shopping-dashed-price"> ${real_price == discount_price ? '' : real_price + ' Bs.'} </span> ${discount_price} Bs.
    `);
}