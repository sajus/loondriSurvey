define(['jquery', 'underscore', 'views/BaseView', 'backbone', 'events','template!templates/users/page', 'modelValidator', 'models/user/getDesignationModel' , 'collections/users/usersCollection', 'modelBinder','bootstrap','fuelux'], 
	function($, _, BaseView, Backbone,Events, userPageTemplate, Validator, DesignationModel, ModifyCollection){

    return BaseView.extend({

		initialize: function(){
			this.modelBinder = new Backbone.ModelBinder();
			this.designationModel = new DesignationModel();
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

			this.designationModel.fetch({
				success: function() {
					self.$el.html(userPageTemplate({designations:self.designationModel.toJSON()}));
					var ModifyView = require('views/users/modifyView');
					self.modifyCollection = new ModifyCollection();
		            var modifyView = new ModifyView({collection: self.modifyCollection});
					modifyView.render();
				}
			});

			Backbone.Validation.bind(this,{
				invalid: this.showError,
				valid: this.hideError
			});

			return this;
        },

		postData: function(){
			this.model.save({
				success: function() {
					console.log("Created User on Server");
				},
				error: function() {
					console.log("Create User Services Error");
				}
			});
		}
    });

});
