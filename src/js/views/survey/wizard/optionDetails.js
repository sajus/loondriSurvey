define(['backbone', 'template!templates/survey/wizard/optionDetails'],
    function(Backbone, surveyDetailsTemplate) {

    return Backbone.View.extend({
        el: '#optionDetails',
        initialize: function() {
        },
        events: {

        },
        render: function() {
            this.$el.html(surveyDetailsTemplate);
            this.$el.addClass("active");
            return this;
        },

    });

});