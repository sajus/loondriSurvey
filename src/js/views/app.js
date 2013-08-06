define(['jquery', 'backbone', 'core', 'events', 'template!templates/layout','utilities/alerts','views/alert'], function($, Backbone, Core, Events, layoutTemplate,alerts,AlertView) {

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
            /* ==========================================================================
               Events
               ========================================================================== */
            Events.on("view:navigate",this.navigate,this);
            Events.on("alert:success",this.alertSuccess,this);
            Events.on("alert:error",this.alertError,this);

        },
        navigate:function(navigationData){
            Events.trigger('page:navigate', navigationData);
        },
        alertSuccess:function(messages){
            this.alert(alerts.render({type: 'success', messages: messages}));
        },
        alertError:function(messages){
            this.alert(alerts.render({type: 'error', messages: messages}));
        },
        alert: function(alertModel) {
            this.alertView = new AlertView({ el: '.alert-container' });
            this.alertView.model = alertModel;
            this.alertView.render();
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
