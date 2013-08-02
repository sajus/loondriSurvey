define(['backbone', 'core', 'template!templates/help/page'], function(Backbone, Core, helpPageTemplate){

    var HelpPage = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(helpPageTemplate);
        }
    });

    return HelpPage;
});
