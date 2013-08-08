define(['backbone', 'views/app','core' ,'events', 'views/BaseView', 'template!templates/login/login', 'modelBinder', 'bootstrapAlert', 'jqueryCookie'],
function(Backbone,AppView,Core, Events, BaseView, loginPageTemplate) {

	return BaseView.extend({

		el: '.page',
		initialize: function() {
			this._modelBinder = new Backbone.ModelBinder();
			$('.main-menu-container').remove();
			$('.footer').remove();
			$('.alert-container').remove();
		},
		events: {
			'submit .form-horizontal': 'processForm',
			'change :input,blue :input': 'processField'
		},
		isAuthorized: function() {
			$.cookie('isAuthenticated', true);
			if ($.cookie('isAuthenticated') !== 'undefined') {
				Events.trigger("view:navigate", {
					path: "surveyDetailed",
					options: {
						trigger: true,
					}
				});
			} else {
				Events.trigger("alert:error", [{
					message: "Authentication Failed"
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
			console.log(this.model.toJSON());
			Events.trigger("alert:success", [{
				message: "Authentication successful. Redirecting ...."
			}]);
			setTimeout(this.redirectToHome,1000);
		},
		redirectToHome:function(){
			Events.trigger("view:navigate", {
				path: "listSurvey",
                options: {
                    trigger: true
                }
			});
			var appView = Core.create({}, 'AppView', AppView);
    		appView.render();
		}

	});
});