define(['jquery', 'backbone', 'core', 'events', 'text!templates/layout.html'], function($, Backbone, Core, Events, layoutTemplate) {
    
    var AppView = Backbone.View.extend({

        el: '.container',

        initialize: function () {
            var NestedView2 = Backbone.View.extend({});
            var NestedView1 = Backbone.View.extend({
                initialize: function () {
                    var nestedView2 = Core.create(this, 'Nested View 2', NestedView2);
                }
            });
            var nestedView1 = Core.create(this, 'Nested View 1', NestedView1);
        },

        render: function () {
            var self = this;
            
            this.$el.html(layoutTemplate);
            
            require(['views/header/menuView'], function (HeaderMenuView) {
                var headerMenuView = Core.create(self, 'HeaderMenuView', HeaderMenuView);
                headerMenuView.render();
            });

            require(['views/footer/footerView'], function (FooterView) {
                /*
                    Pass the appView down into the footer so we can render the visualisation
                */
                var footerView = Core.create(self, 'FooterView', FooterView, {appView: self});
                footerView.render();
            });
        }
    });

    return AppView;
});
