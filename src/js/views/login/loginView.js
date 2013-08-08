define(['backbone','events','template!templates/login/login', 'modelValidator', 'modelBinder','bootstrapAlert', 'jqueryCookie'],
	function(Backbone, Events, loginPageTemplate, Validator){

	var LoginPage = Backbone.View.extend({

		el: '.page',

		initialize: function(){
			this.modelBinder = new Backbone.ModelBinder();
			// $('.main-menu-container').hide();
		},

		events:{
			'submit .form-horizontal': 'processForm',
			'blur input[type=text]':'processField'
		},

		processField:function(e){
			var target=$(e.target),fieldNameAttr=target.attr('name');
			this.model.set(fieldNameAttr,target.val(),{validate:true});
		},

		//User authentication and establishing cookie.
		isAuthorized:function(){
			console.log("Authorized user");
			$.cookie('isAuthenticated', true);
			if($.cookie('isAuthenticated')!=='undefined') {
				Events.trigger("view:navigate", {
					path: "surveyDetailed",
					options: {
						trigger: true,
					}
				});
			} else {
				Events.trigger("alert:error",[{message:"Authentication Failed"}]);
			}
		},

		processForm: function(e){
			var self = this;
			e.preventDefault();
			if(this.model.isValid(true)){
				self.model.save(self.model.toJSON(), {
					success: function(model,response) {
						if(response){
							self.isAuthorized();
							// $('.main-menu-container').show();
							Events.trigger("alert:success",[{message:"You have successfully logged in!!"}]);
						} else {
							Events.trigger("alert:error",[{message:"Invalid Username or password."}]);
						}
					},
					error: function() {
						Events.trigger("alert:error",[{message:"Invalid service calls."}]);
					}
				});
			}
		},

		resetForm: function(e){
			e.preventDefault();
			this.$('.form-horizontal').find("input[type=text], textarea, select").val("");
			this.hideError(view, attr, error);
		},

		render: function () {
			this.$el.html(loginPageTemplate);
			//binding modelbinder to el and model together
			this.modelBinder.bind(this.model, this.el);


			// validation binding
			Backbone.Validation.bind(this,{
				invalid: this.showError,
				valid: this.hideError
			});
			return this;
		},

		showError: function(view, attr, error){
			var targetView = view.$el,
			targetSelector = targetView.find("[name="+attr+"]"),
			targetParent = targetSelector.closest(".control-group"),
			errorSpan = targetParent.find('.help-inline');
			//adding error message to errorspan
			if($.trim(errorSpan.html())===''){
				errorSpan.append(error);
			}else if(errorSpan.html().toLowerCase()!==error.toLowerCase()){
				errorSpan.html(error);
			}

			targetParent.addClass('error');
		},

		hideError: function(view, attr, error){
			var targetView = view.$el,
			targetSelector = targetView.find("[name="+attr+"]"),
			targetParent = targetSelector.closest(".control-group");
			targetParent.find('.help-inline').html('');
			targetParent.removeClass('error');
		},

		postData:function(){
			console.log("In the post data function");
			console.log(this.model.toJSON());
		}

	});

	return LoginPage;
});
