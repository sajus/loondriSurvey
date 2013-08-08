define(['jquery', 'underscore', 'backbone', 'template!templates/users/modifyUsers', 'fueluxDataSource', 'fueluxDataGrid','bootstrapDropdown','fueluxComboBox','fueluxSelectBox','fueluxSearchBox'],
	function($, _,Backbone, modifyUsersTemplate, FuelUxDataSource){

		var modifyUserPage = Backbone.View.extend({

			el: '#modifyuser',

			render: function(){
				var self = this;
				this.$el.html(modifyUsersTemplate);

				this.model.fetch({
					success: function(){
						console.log('showing the service call');
						var sampleData = self.model.toJSON();
						self.createDataGrid(sampleData);
					}
				});
			},

			createDataGrid: function(sampleData){
				var DataSource = new FuelUxDataSource({
					columns: [
						{
							property: "id",
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
							property: "designationid",
							label: "Designation",
							sortable: true
						},
						{
							property: "gender",
							label: "Gender",
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
						}
					],
					data: sampleData,
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
			}
		});

		return modifyUserPage;

	});
