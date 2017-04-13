(function($, window, document) {

// Listen for the jQuery ready event on the document
$(function() {

     $('.js-validate-form').validateMe();

});

$.fn.validateMe = function() {
    var fields = [];
    var isValid = true;
    var FIELD_TYPES = ['input','textarea','select'];
    var RULES = {
        'name' : {
            regular: '^[a-zA-Z\-]*$',
            errorMessage: 'Only latin letters',
            minLength: 3,
            maxLength: 20
        }
    }
    var errorEl = $('<p>').addClass('error-message');



    $(this).find(FIELD_TYPES.join(',')).each(function(){
         // without buttons
        if (($(this).attr('type') !== 'button') && ($(this).attr('type') !== 'submit')) {
            fields.push(this);
        }
    });

    fields.forEach(function(field){

        $(field).wrap( "<div class='field-group'></div>" );

        $(field).on('blur', function(){
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

        var result = field.value.match( RULES[fieldRuleBy].regular );

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