define(['backbone','events', 'views/BaseView', 'template!templates/login/login', 'modelBinder', 'bootstrapAlert', 'jqueryCookie'],
    function(Backbone, Events, BaseView, loginPageTemplate) {

        return BaseView.extend({

            el: '.page',
            initialize: function() {
                this._modelBinder = new Backbone.ModelBinder();
                if ($.cookie('isAuthenticated')) {
                    Events.trigger("view:navigate", {
                        path: "listSurvey",
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
                this.model.setParams(params);
                if (this.model.isAuthorized()) {
                    $.cookie('isAuthenticated', true);
                    Events.trigger("alert:success", [{
                        message: "Authentication successful. Redirecting ...."
                    }]);
                    setTimeout(this.redirectToHome, 1000);
                } else {
                    Events.trigger("alert:error", [{
                        message: "Authentication Failed.Check username/password."
                    }]);
                }
            },
            render: function() {
                this.$el.html(loginPageTemplate);
                //binding modelbinder to el and model together
                this._modelBinder.bind(this.model, this.el);

                Backbone.Validation.bind(this, {
                    invalid: this.showError,
                    valid: this.removeError
                });
                return this;
            },
            postData: function() {
                this.isAuthorized(this.model.toJSON());
            },
            redirectToHome: function() {
                Events.trigger('redirectHome');
            }

        });
    });