define(['backbone','events','template!templates/login/login','modelValidator','CryptoJS','modelBinder','bootstrapAlert'], 
	function(Backbone, Events, loginPageTemplate, Validator,CryptoJS){

    var LoginPage = Backbone.View.extend({
		el: '.page',
        initialize: function(){
			this.modelBinder = new Backbone.ModelBinder();
   		},
        events:{
        	  'submit .form-horizontal': 'processForm',
        	  'blur input[type=text]':'processField'
		},
		 processField:function(e){
            var target=$(e.target),fieldNameAttr=target.attr('name');
            this.model.set(fieldNameAttr,target.val(),{validate:true});
        },
		processForm: function(e){
			e.preventDefault();
			//Sample implementation of crypto;
			console.log(CryptoJS.decryptCrypto(CryptoJS.encryptCrypto('secretMesg')));
			if(this.model.isValid(true)){
				 Events.trigger("alert:success",[{message:"You have successfully logged in!!"}]);	
			}
			else{
				console.log('validation');	
				Events.trigger("alert:error",[{message:"Please enter correct values."}]);
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
