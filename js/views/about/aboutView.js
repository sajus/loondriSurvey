define(['jquery', 'underscore', 'backbone', 'template!templates/about/page'], function($, _, Backbone, aboutPageTemplate){

    var AboutPage = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(aboutPageTemplate);
        }
    });

    return AboutPage;
});
