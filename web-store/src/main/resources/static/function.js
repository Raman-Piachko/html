var cart = {};

$('document').ready(function() {
    loadMIG();
    chekCart();
    showMiniCart();
});

$(function() {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
    $("#nav").load("nav.html");
});

let GoBack = function() {
    window.history.back();
};



function loadMIG() {
    $.getJSON('mig.json', function(data) {
        var out = '';

        for (var key in data.block) {
            out += '<div class="group_name">' + data.block[key]['group'] + '</div>';

            for (key1 in data.block[key].members) {
                out += '<div class="item_box">';
                out += '<div class="image">' + '<img src="' + data.block[key].members[key1].image + '">' + '</div>';
                out += '<div class="description">' + '<span class="item_title">' + data.block[key].members[key1]['name'] + '</span>' + data.block[key].members[key1]['description'] + '</div>';
                out += '<div class="bascket_area">' + '<p>' + '<span class="item_price">' + data.block[key].members[key1]['cost'] + '</span> BYN</p>' + '<button class="add_item" data-art="' + data.block[key].members[key1]['id'] + '">В корзину</button>' + '</div>';
                out += '</div>';
            }
        }
        $('#mig').html(out);
        $('button.add_item').on('click', addToCart)
    })
}

function addToCart() {
    var articul = $(this).attr('data-art');

    if (cart[articul] != undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    //console.log(cart);
    showMiniCart();
}

function chekCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function showMiniCart() {
    var out = '<div class="mini-cart"><div class="cart_name">Корзина</div>' + 'Товаров в корзине: ';

    var item_counter = 0;
    var total_cost = 0;
    for (var item in cart) {
        item_counter += cart[item];
    }
    out += item_counter;
    out += '<div class="total_cost">Общая сумма</div>' + total_cost + '</div>';

    $('#mini-cart').html(out);
}