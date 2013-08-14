define(['backbone', 'template!templates/header/menu','jqueryCookie'], function(Backbone, headerMenuTemplate){

    var HeaderMenuView = Backbone.View.extend({

        el: '.main-menu-container',

        initialize:function(){
            if($.cookie('accesslevel') === "admin") {
                this._admin = true;
                this._superAdmin = false;
            } else if($.cookie('accesslevel') === "super admin") {
                this._admin = true;
                this._superAdmin = true;
            } else {
                this._admin = false;
                this._superAdmin = false;
            }
        },

        render: function () {
            this.$el.html(headerMenuTemplate({admin:this._admin, superAdmin:this._superAdmin}));
        }
    })

    return HeaderMenuView;
});
