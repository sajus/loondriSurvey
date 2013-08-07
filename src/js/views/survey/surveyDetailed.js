define(function(require) {
var Backbone = require('backbone'),
    surveyDetailedTemplate = require('template!templates/survey/surveyDetailed');
/* Requires with no assignment */
return Backbone.View.extend({
    el: '.page',
    initialize: function() {

    },
    events: {
        'click .controls a':'addNewQuestion'
    },
    addNewQuestion:function(e){
        e.preventDefault();
        this.$('.formContainer').slideToggle('slow');
        this.$('.controls i').toggleClass('icon-plus').toggleClass('icon-minus');
    },
    render: function() {
        this.$el.html(surveyDetailedTemplate);
        return this;
    }

});

});