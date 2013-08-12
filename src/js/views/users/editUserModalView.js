define(['jquery', 'backbone', 'template!templates/users/editUserModal', 'models/user/getDesignationModel'],
	function($, Backbone, editUserModalTemplate, DesignationModel){

		var editModalUserPage = Backbone.View.extend({
			initialize: function() {
				this.designationModel = new DesignationModel();
			},

			className:"modal hide fade",

    		id:"editModal",

			render: function(){
				var self = this;
				this.designationModel.fetch({
					success: function() {
						self.$el.html(editUserModalTemplate({designations:self.designationModel.toJSON()}));
					}
				});

				return this;
			}

		});

		return editModalUserPage;

	});
