define(['backbone', 'template!templates/header/menu'], function(Backbone, headerMenuTemplate){

    var HeaderMenuView = Backbone.View.extend({

        el: '.main-menu-container',

        render: function () {
            this.$el.html(headerMenuTemplate);
        }
    })

    return HeaderMenuView;
});
