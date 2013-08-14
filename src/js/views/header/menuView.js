define(['backbone', 'template!templates/header/menu','jqueryCookie'], function(Backbone, headerMenuTemplate){

    var HeaderMenuView = Backbone.View.extend({

        el: '.main-menu-container',

        initialize:function(){
            this._accesslevel = $.cookie('accesslevel');
            this._admin = false;
            this._superAdmin = false;
            this._user = false;
            if(this._accesslevel === "admin") {
                this._admin = true;
            } else if(this._accesslevel === "super admin") {
                this._admin = true;
                this._superAdmin = true;
            } else {
                this._user = true;
            }
        },

        render: function () {
            this.$el.html(headerMenuTemplate({admin:this._admin, superAdmin:this._superAdmin, user:this._user}));
        }
    })

    return HeaderMenuView;
});
