define(['jquery', 'underscore', 'backbone', 'template!templates/users/page', 'modelValidator','modelBinder','bootstrap','fuelux'], function($, _, Backbone, userPageTemplate,Validator){
	
	//var User = require();

    var userPage = Backbone.View.extend({
		initialize: function(){
			//instance of new modelBinder
			
			this.modelBinder = new Backbone.ModelBinder();
		},
        el: '.page',
		events: {
			'submit .form-horizontal': 'processForm',
			'blur input[type=text]':'processField',
			'click #resetForm': 'resetForm'
		},
		 processField:function(e){
            var target=$(e.target),fieldNameAttr=target.attr('name');
            this.model.set(fieldNameAttr,target.val(),{validate:true});
        },
		processForm: function(e){
			e.preventDefault();
			if(this.model.isValid(true)){
				this.$('.alert-success').removeClass('hide').fadeIn();	
				this.$('.alert-error').addClass('hide').fadeOut();	
			}
			else{
				console.log('validation');
				this.$('.alert-error').removeClass('hide').fadeIn();
				this.$('.alert-success').addClass('hide').fadeOut();	
			}
		},
		resetForm: function(e){
			e.preventDefault();
			this.$('.form-horizontal').find("input[type=text], textarea, select").val("");
			this.hideError(view, attr, error);
		},
        render: function () {
            this.$el.html(userPageTemplate);
			//binding modelbinder to el and model together
			this.modelBinder.bind(this.model, this.el);
			
			
			// validation binding
			Backbone.Validation.bind(this,{
				invalid: this.showError,
				valid: this.hideError
			});
			return this;
			//$('#userGrid').datagrid({dataSource: null, stretchHeight: true});
        },
		showError: function(view, attr, error){
			// showing errors on UI
			console.log(error);
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
			// hiding errors on UI
			console.log(error);
			var targetView = view.$el,
            targetSelector = targetView.find("[name="+attr+"]"),
            targetParent = targetSelector.closest(".control-group");
			targetParent.find('.help-inline').html('');
			targetParent.removeClass('error');
		}
    });

    return userPage;
});
