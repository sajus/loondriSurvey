define(['jquery', 'backbone', 'template!templates/users/deleteUserModal'],
	function($, Backbone, deleteUserModalTemplate){

		var deleteModalUserPage = Backbone.View.extend({

			className:"modal hide fade",

    		id:"deleteModal",

			render: function(){
				this.$el.html(deleteUserModalTemplate);
				return this;
			}

		});

		return deleteModalUserPage;

	});
