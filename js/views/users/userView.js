define(['jquery', 'underscore', 'backbone', 'template!templates/users/page','bootstrap'], function($, _, Backbone, userPageTemplate){

    var userPage = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(userPageTemplate);
        }
    });

    return userPage;
});
