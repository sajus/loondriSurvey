define(['jquery', 'underscore', 'backbone', 'template!templates/users/modifyUsers', 'views/users/editUserModalView', 'views/users/deleteUserModalView', 'fueluxDataSource', 'fueluxDataGrid','bootstrapDropdown','fueluxComboBox','fueluxSelectBox','fueluxSearchBox'],
	function($, _,Backbone, modifyUsersTemplate, UserEditView, UserDeleteView, FuelUxDataSource){

		var modifyUserPage = Backbone.View.extend({

			el: '#modifyuser',

			render: function(){
				var self = this;
				this.collection.fetch({
					success: function(){
						self.$el.html(modifyUsersTemplate({totalUsers: self.collection.length}));
						self.createDataGrid(self.collection.toJSON());
					}
				});
			},

			events: {
				'click .userEdit': 'userEdit',
				'click .userDelete': 'userDelete'
			},

			createDataGrid: function(userlist){
				var DataSource = new FuelUxDataSource({
					columns: [
						{
							property: "empid",
							label: "Employee Id",
							sortable: true
						},
						{
							property: "firstname",
							label: "First Name",
							sortable: true
						},
						{
							property: "lastname",
							label: "Last Name",
							sortable: true
						},
						{
							property: "email",
							label: "Email",
							sortable: true
						},
						{
							property: "gender",
							label: "Gender",
							sortable: true
						},
						{
							property: "designationid",
							label: "Designation",
							sortable: true
						},
						{
							property: "accesslevel",
							label: "Access Level",
							sortable: true
						},
						{
							property: "status",
							label: "User Status",
							sortable: true
						},
						{
							property: "operations",
							label: "Operations",
							sortable: true
						}
					],
					data: userlist,
					delay: 250
				});

				this.$('#MyGrid').datagrid({
					dataSource: DataSource,
					dataOptions:{
						pageIndex: 0,
						pageSize: 5
					},
					stretchHeight: false
				});
			},

			userEdit: function() {
				console.log("User Edit Mode Activate");
				var userEdit = new UserEditView();

				this.$('.modal-container').html(userEdit.render().el);
        		this.$('#editModal').modal({backdrop:'static'});
			},

			userDelete: function() {
				console.log("User Delete Model Activate");
				var userDelete = new UserDeleteView();

				this.$('.modal-container').html(userDelete.render().el);
        		this.$('#deleteModal').modal({backdrop:'static'});
			}
		});

		return modifyUserPage;

	});
