define(['backbone', 'template!templates/survey/wizard/surveyDetails'],
    function(Backbone, surveyDetailsTemplate) {

    return Backbone.View.extend({
        el: '#surveyDetails',
        initialize: function() {
        },
        events: {

        },
        render: function() {
            this.$el.html(surveyDetailsTemplate);
            return this;
        },

    });

});