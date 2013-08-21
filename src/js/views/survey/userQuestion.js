define(function(require) {
    var Backbone = require('backbone'),
        questionTemplate = require('template!templates/survey/userQuestion');
    /* Requires with no assignment */
    return Backbone.View.extend({
        className: 'accordion-group',
        initialize: function() {

        },
        events: {},
        render: function() {
            this.$el.html(surveyDetailedTemplate(this.model.toJSON()));
            return this;
        }
    });

});