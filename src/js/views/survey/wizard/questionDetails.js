define(['backbone', 'template!templates/survey/wizard/questionDetails'],
    function(Backbone, questionDetailsTemplate) {

    return Backbone.View.extend({
        el: '#questionDetails',
        initialize: function() {
        },
        events: {

        },
        render: function() {
            this.$el.html(questionDetailsTemplate);
            this.$el.addClass("active");
            return this;
        }
    });
});