define(['backbone', 'text!templates/header/menu.html'], function(Backbone, headerMenuTemplate){
    
    var HeaderMenuView = Backbone.View.extend({
        
        el: '.main-menu-container',
        
        render: function () {
            this.$el.html(headerMenuTemplate);
        }       
    })

    return HeaderMenuView;
});
