var form = document.querySelector('.formWithValidation');
var fields = form.querySelectorAll('.field');
var count = fields.length;

var generateError = function(text) {
    var error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
};

var removeValidation = function() {
    var errors = form.querySelectorAll('.error');

    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    count = fields.length;
};

var checkFieldsPresence = function() {
    for (var i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            var error = generateError('Поле обязательно для заполнения');
            form[i].parentElement.insertBefore(error, fields[i]);
        } else { count--; }
        if (count == 0) {
            window.location.href = "send.html";
        }
    }
};


form.addEventListener('submit', function(event) {
    event.preventDefault();
    removeValidation();
    checkFieldsPresence();
});