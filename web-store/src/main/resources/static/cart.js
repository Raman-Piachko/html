$('document').ready(function () {
    showCart()
})

function showCart() {
    $.getJSON('mig.json', function (data) {
        showCartData(data);
    })
}

function showCartData(data) {
    var out = '';
    var cart = JSON.parse(localStorage.getItem('cart'))||{};
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
                        out += '<div class="item_total">Стоимость:' + data.block[i].members[key1].cost + ' BYN</div>';
                        out += '<div class="item_total">Общая стоимость:' + cart[key] * data.block[i].members[key1].cost + ' BYN</div>';
                        out += '</div>';
                    }
                }
            }
        }

        $('#my-cart').html(out);
        calculateNumberOfItems();
        calculateTotalPrice(data);
        $('.plus').on('click', plusItem);
        $('.minus').on('click', minusItem);
        $('.delete').on('click', deleteItem);
    }
}


function plusItem() {
    var article = $(this).attr('data-atr');
    var cart = JSON.parse(localStorage.getItem('cart'))||{};
    cart[article]++;
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
}

function calculateNumberOfItems() {
        var cart=JSON.parse(localStorage.getItem('cart'))||{};
        var out1 = "";
        out1 += '<dic class="total">';
        var item_counter = Object.values(cart).reduce((a, b) => a + b, 0);
        out1 += '<p class="cart_name">Корзина</p>' + 'Товаров в корзине: ';
        out1 += item_counter;
        out1 += '<div id="totalPrice"></div>';
        $('#total').html(out1);
}

function calculateTotalPrice(data) {
    var cart=JSON.parse(localStorage.getItem('cart'))||{};
    var out2 = "";
    out2 += '<dic class="totalPrice">Общая сумма:  ';
    var total = 0;
    for (var key in cart) {
        for (var i in data.block) {
            for (key1 in data.block[i].members) {
                if (key == data.block[i].members[key1]['id']) {
                    total += cart[key] * data.block[i].members[key1].cost;
                }
            }
        }
    }
    out2 += total + '</div>';
    $('#totalPrice').html(out2);
}


function minusItem() {
    var article = $(this).attr('data-atr');
    var cart=JSON.parse(localStorage.getItem('cart'))||{};
    if (cart[article] > 1) {
            cart[article]--;
    } else { delete cart[article]; }
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
}

function deleteItem() {
    var article = $(this).attr('data-atr');
    var cart=JSON.parse(localStorage.getItem('cart'))||{};
    delete cart[article];
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
}

function chekCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}