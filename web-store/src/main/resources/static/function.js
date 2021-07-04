var cart = {};

$('document').ready(function() {
    loadMIG();
    chekCart();
    showMiniCart();
});

$(function() {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
    $("#navi").load("nav.html");
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
                out += '<div class="bascket_area">' + '<p>' + '<span class="item_price">' + data.block[key].members[key1]['cost'] + '</span> BYN</p>' + '<button class="add_item" data-art="' + data.block[key].members[key1]['id'] + '" data-cost="' + data.block[key].members[key1]['cost'] + '">В корзину</button>' + '</div>';
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

    showMiniCart();
}

function chekCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function showMiniCart() {
    $.getJSON('mig.json', function(data) {
        var out = '<div class="mini-cart"><p><a class="cart_name" href="cart.html">Корзина</a></p>' + 'Товаров в корзине: ';
        var item_counter = 0;
        for (var id in cart) {
            item_counter += cart[id];
        }
        out += item_counter + '</div>';

        $('#mini-cart').html(out);
    })
}