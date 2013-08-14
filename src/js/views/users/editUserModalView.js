define(['jquery', 'backbone', 'template!templates/users/editUserModal', 'models/user/getDesignationModel'],
	function($, Backbone, editUserModalTemplate, DesignationModel){

		var editModalUserPage = Backbone.View.extend({
			className:"modal hide fade",

    		id:"editModal",

			render: function(){
				this.$el.html(editUserModalTemplate);
				return this;
			}

		});

		return editModalUserPage;

	});
