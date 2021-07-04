var cart = {};

$.getJSON('mig.json', function(data) {
    chekCart();
    showCart();

    function showCart() {
        var totalPrice = 0;
        var out = '';
        if ($.isEmptyObject(cart)) {
            out = '<h1 class="empty_cart"> На данный момент товаров в вашей корзине нет</h1>';
            $('#my-cart').html(out);
            out1 = "";
            $('#total').html(out1);
        } else {
            for (var key in cart) {
                for (var i in data.block) {
                    for (key1 in data.block[i].members) {
                        if (key == data.block[i].members[key1]['id']) {
                            out += '<div class="cart_box">';
                            out += '<button class ="delete" data-atr="' + key + '">x</button>';
                            out += '<div class="cart_image">' + '<img src="' + data.block[i].members[key1].image + '"></div>';
                            out += '<div class="item_box_name">Наименование:</div> <div class ="item_area_name"><p>' + data.block[i].members[key1].name + '</p></div>';
                            out += '<button class ="minus" data-atr="' + key + '">-</button>';
                            out += cart[key];
                            out += '<button class ="plus" data-atr="' + key + '">+</button>';
                            out += '<div class="item_total_name">' + cart[key] * data.block[i].members[key1].cost + ' BYN</div>';
                            out += '</div>';
                        }
                    }
                }

            }

            out += totalPrice;

            $('#my-cart').html(out);
            calculateNumberOfItems();
            $('.plus').on('click', plusItem);
            $('.minus').on('click', minusItem);
            $('.delete').on('click', deleteeItem);
        }
    }


    function plusItem() {
        var articul = $(this).attr('data-atr');
        cart[articul]++;
        saveToLocalStorage();
        showCart();
    }

    function calculateNumberOfItems() {
        var out1 = "";
        out1 += '<dic class="total">';
        var item_counter = 0;
        for (var id in cart) {
            item_counter += cart[id];
        }
        out1 += '<p><a class="cart_name" href="cart.html">Корзина</a></p>' + 'Товаров в корзине: ';
        out1 += item_counter + '</div>';
        $('#total').html(out1);
    }

    function minusItem() {
        var articul = $(this).attr('data-atr');

        if (cart[articul] > 1) {
            cart[articul]--;
        } else { delete cart[articul]; }
        saveToLocalStorage();
        showCart();
    }

    function deleteeItem() {
        var articul = $(this).attr('data-atr');
        delete cart[articul];
        saveToLocalStorage();
        showCart();
    }
})

function chekCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}