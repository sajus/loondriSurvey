define(['jquery', 'underscore', 'backbone', 'events','template!templates/users/page', 'modelValidator', 'models/user/modifyModel', 'modelBinder','bootstrap','fuelux'], function($, _, Backbone,Events, userPageTemplate, Validator, ModifyModel){

    var UserPage = Backbone.View.extend({

		initialize: function(){
			this.modelBinder = new Backbone.ModelBinder();
			this.on("reset", this.updateView);
		},

        el: '.page',

		events: {
			'click #addUser': 'processForm',
			'blur input[type=text], select, input[type=checkbox], input[type=radio], change :input': 'processField',
			'click .keygen': 'keygen',
			'click #resetForm': 'resetForm'
		},

		keygen: function() {
			var specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
			var lowercase = 'abcdefghijklmnopqrstuvwxyz';
			var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			var numbers = '0123456789';

			var all = specials + lowercase + uppercase + numbers;

			String.prototype.pick = function(min, max) {
			    var n, chars = '';

			    if (typeof max === 'undefined') {
			        n = min;
			    } else {
			        n = min + Math.floor(Math.random() * (max - min));
			    }

			    for (var i = 0; i < n; i++) {
			        chars += this.charAt(Math.floor(Math.random() * this.length));
			    }

			    return chars;
			};

			String.prototype.shuffle = function() {
			    var array = this.split('');
			    var tmp, current, top = array.length;

			    if (top) while (--top) {
			        current = Math.floor(Math.random() * (top + 1));
			        tmp = array[current];
			        array[current] = array[top];
			        array[top] = tmp;
			    }

			    return array.join('');
			};

			var password = (specials.pick(1) + lowercase.pick(1) + uppercase.pick(1) + all.pick(3, 10)).shuffle();
			$('#password').val(password);
		},

		processField:function(e){
            var target=$(e.target),fieldNameAttr=target.attr('name');
            this.model.set(fieldNameAttr,target.val(),{validate:true});
        },

		processForm: function(e){
			e.preventDefault();
			if(this.model.isValid(true)){
				this.postData();
			}
			else{
			 	Events.trigger("alert:error",[{message:"Oops!! Did not pass the validation."}]);
			}
		},

		resetForm: function(e){
			e.preventDefault();
			this.trigger('reset');
		},

		updateView: function(){
			this.render();
			this.model.clear();
			document.getElementById('userForm').reset();
		},

        render: function () {
			var self = this;

			this.modelBinder.bind(this.model, this.el);

			this.model.fetch({
				success: function() {
					self.$el.html(userPageTemplate({designations:self.model.toJSON()}));
					var ModifyView = require('views/users/modifyView');
					self.modifyModel = new ModifyModel();
		            var modifyView = new ModifyView({model: self.modifyModel});
					modifyView.render();
				}
			});

			Backbone.Validation.bind(this,{
				invalid: this.showError,
				valid: this.hideError
			});

			return this;
        },

		showError: function(view, attr, error){
			// showing errors on UI
			var targetView = view.$el,
            targetSelector = targetView.find("[name="+attr+"]"),
            targetParent = targetSelector.closest(".control-group"),
			errorSpan = targetParent.find('.help-inline');
			//adding error message to errorspan
			if($.trim(errorSpan.html())===''){
				errorSpan.append(error);
			} else if(errorSpan.html().toLowerCase()!==error.toLowerCase()){
                errorSpan.html(error);
            }

			targetParent.addClass('error');
		},

		hideError: function(view, attr, error){
			// hiding errors on UI
			var targetView = view.$el,
            targetSelector = targetView.find("[name="+attr+"]"),
            targetParent = targetSelector.closest(".control-group");
			targetParent.find('.help-inline').html('');
			targetParent.removeClass('error');
		},

		postData: function(){
			console.log("Data:");
			console.log(this.model.toJSON());
		}
    });

    return UserPage;
});
