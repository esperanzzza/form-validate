(function($, window, document) {

    // Listen for the jQuery ready event on the document
    $(function() {

        $('.js-validate-form').validateMe();

    });

    $.fn.validateMe = function() {
        var fields = [];
        var isValid = true;
        var FIELD_TYPES = ['input', 'textarea', 'select'];
        var RULES = {
            'name': {
                regular: '^[a-zA-Z\-]*$',
                errorMessage: 'Only latin letters',
                minLength: 3,
                maxLength: 20
            },
            'password': {
                regular: '([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*',
                errorMessage: 'Include at least one letter and one number',
                minLength: 8,
                maxLength: 15
            },

            'email': {
                regular: '^[_a-zA-Z0-9\'-]+(\.[_a-zA-Z0-9\'-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(name))$',
                errorMessage: 'Not valid email address',
                maxLength: 320
            }

        }
        var errorEl = $('<p>').addClass('error-message');



        $(this).find(FIELD_TYPES.join(',')).each(function() {
            // without buttons
            if (($(this).attr('type') !== 'button') && ($(this).attr('type') !== 'submit')) {
                fields.push(this);
            }
        });

        fields.forEach(function(field) {

            $(field).wrap("<div class='field-group'></div>");

            $(field).on('blur', function() {
                console.log(checkLength(this) && checkReg(this));
            });
        });

        function checkLength(field) {
            var fieldRuleBy = $(field).data('validme');

            var errorMessageMin = 'Less letters/symbols than ' + RULES[fieldRuleBy].minLength;
            var errorMessageMax = 'More letters/symbols than ' + RULES[fieldRuleBy].maxLength;

            var errorElLength = errorEl.clone().addClass('error-message-length');

            $(field).parent().find('.error-message-length').remove();

            if (field.value.length < RULES[fieldRuleBy].minLength) {
                errorElLength.html(errorMessageMin).prependTo($(field).parent());
                return false;
            } else if (field.value.length > RULES[fieldRuleBy].maxLength) {
                errorElLength.html(errorMessageMax).prependTo($(field).parent());
                return false;
            }

            return true;
        }

        function checkReg(field) {
            var errorElReg = errorEl.clone().addClass('error-message-reg');

            var fieldRuleBy = $(field).data('validme');
            var errorMessageReg = RULES[fieldRuleBy].errorMessage;

            var result = field.value.match(RULES[fieldRuleBy].regular);

            $(field).parent().find('.error-message-reg').remove();

            if (!result) {
                errorElReg.html(errorMessageReg).prependTo($(field).parent());
            }

            return !!result;
        }

        // fields.forEach(function(field){
        //     isValid = isValid && checkLength(field) && checkReg(field);
        // });

        // console.log(isValid);

    };

}(window.jQuery, window, document));