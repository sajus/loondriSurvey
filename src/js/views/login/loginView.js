define(['backbone','events', 'views/BaseView', 'template!templates/login/login', 'modelBinder', 'bootstrapAlert', 'jqueryCookie'],
    function(Backbone, Events, BaseView, loginPageTemplate) {

        return BaseView.extend({

            el: '.page',
            initialize: function() {
                this._modelBinder = new Backbone.ModelBinder();
                this._isAuthenticated = $.cookie('isAuthenticated');
                this._accesslevel = $.cookie('accesslevel');
                if (this._isAuthenticated && (this._accesslevel === "admin" || this._accesslevel === "super admin")) {
                    Events.trigger("view:navigate", {
                        path: "dashboard",
                        options: {
                            trigger: true
                        }
                    });
                } else if (this._isAuthenticated && this._accesslevel === "user") {
                    Events.trigger("view:navigate", {
                        path: "home",
                        options: {
                            trigger: true
                        }
                    });
                } else {
                    $('.main-menu-container').remove();
                    $('.footer').remove();
                    $('.alert-container').remove();
                }
            },
            events: {
                'submit .form-horizontal': 'processForm',
                'change :input,blue :input': 'processField'
            },
            isAuthorized: function(params) {
                console.log(this.model.isAuthorized().id);
                var accesslevel = this.model.isAuthorized().accesslevel,
                    empid = this.model.isAuthorized().id;
                if(accesslevel === undefined) {
                    Events.trigger("alert:error", [{
                        message: "Authentication Failed.Check username/password."
                    }]);
                } else if (accesslevel.toLowerCase() === "admin" || accesslevel.toLowerCase() === "super admin") {
                    $.cookie('isAuthenticated', true);
                    $.cookie('accesslevel', accesslevel.toLowerCase());
                    $.cookie('empid', empid);
                    Events.trigger("alert:success", [{
                        message: "Authentication successful. Redirecting ...."
                    }]);
                    setTimeout(this.redirectToAdmin, 1000);
                } else {
                    // Call setSessionCookies globally
                    $.cookie('isAuthenticated', true);
                    $.cookie('accesslevel', accesslevel.toLowerCase());
                    $.cookie('empid', empid);
                    Events.trigger("alert:success", [{
                        message: "Authentication successful. Redirecting ...."
                    }]);
                    setTimeout(this.redirectToUser, 1000);
                }
                console.log($.cookie('empid'));
            },
            render: function() {
                this.$el.html(loginPageTemplate);
                //binding modelbinder to el and model together
                this._modelBinder.bind(this.model, this.el);

                Backbone.Validation.bind(this, {
                    invalid: this.showError,
                    valid: this.removeError
                });
                if(this.options.authorizationFailed===true){
                    Events.trigger("alert:error", [{
                        message: "You are not authorized to view this page."
                    }]);
                }
                return this;
            },
            postData: function() {
                this.isAuthorized(this.model.toJSON());
            },
            redirectToAdmin: function() {
                Events.trigger('redirectAdmin',this.options);
            },
            redirectToUser: function() {
                Events.trigger('redirectUser',this.options);
            }
        });
    });