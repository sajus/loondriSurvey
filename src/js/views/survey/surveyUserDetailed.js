define(function(require) {
var Backbone = require('backbone'),
    surveyDetailedTemplate = require('template!templates/survey/surveyUserDetailed'),
    newOptionTemplate=require('template!templates/survey/newOption');
/* Requires with no assignment */
return Backbone.View.extend({
    el: '.page',
    initialize: function() {

    },
    events: {
        'click .selectVal':'selectChoice'
    },
    selectChoice:function(e){
        e.preventDefault();
        console.log($('.dropdown-label').text());
        var selectValue = $('.dropdown-label').text();
        if(selectValue == "Radio Option"){
          $('.optionGroup').show();
          $('.checkGroup').hide();
          $('.inputGroup').hide();
        }
        else if(selectValue == "Checkbox Option"){
          $('.optionGroup').hide();
          $('.checkGroup').show();
          $('.inputGroup').hide();
        }
        else if (selectValue == "Input Option") {
          $('.optionGroup').hide();
          $('.checkGroup').hide();
          $('.inputGroup').show();
        };
       
    },
    render: function() {
        this.$el.html(surveyDetailedTemplate);
        return this;
    }
});

});