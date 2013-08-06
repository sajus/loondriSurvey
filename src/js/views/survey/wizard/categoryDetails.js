define(['backbone', 'template!templates/survey/wizard/categoryDetails'],
    function(Backbone, surveyDetailsTemplate) {

    return Backbone.View.extend({
        el: '#categoryDetails',
        initialize: function() {},
        events: {

        },
        render: function() {
            this.$el.html(surveyDetailsTemplate);
            this.$el.addClass("active");
            return this;
        }
    });
});