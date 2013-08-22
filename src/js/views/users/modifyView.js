define(['jquery', 'underscore', 'backbone', 'template!templates/users/modifyUsers', 'views/users/editUserModalView', 'views/users/deleteUserModalView', 'views/users/summaryUserModalView', 'fueluxDataSource', 'fueluxDataGrid','bootstrapDropdown','fueluxComboBox','fueluxSelectBox','fueluxSearchBox'],
	function($, _,Backbone, modifyUsersTemplate, UserEditView, UserDeleteView, UsersSummaryView, FuelUxDataSource){
		var globalSelected = [];
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
				'click .userDelete': 'userDelete',
				'mouseover .userDelete': 'rowSelectedDelete',
				'mouseout .userDelete': 'rowSelectedNotDelete',
				'click .userDelete': 'userDelete',
				'click .summary': 'userTblSummary',
				'click .sendEmail': 'sendEmail',
				'change #selectUsersAtOnce': 'gridCheckBox',
				'loaded #MyGrid': 'gridCheckBox',
				'click .selectrows': 'rowSelected'
			},

			createDataGrid: function(userlist){
				var DataSource = new FuelUxDataSource({
					columns: [
						{
							property: "selectrows",
							label: "<input type='checkbox' id='selectUsersAtOnce'>",
							sortable: false
						},
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
							property: "designation",
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
							sortable: false
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

			userEdit: function(e) {
				var userEdit = new UserEditView();
				this.$('.modal-container').html(userEdit.render().el);
        		this.$('#editModal').modal({backdrop:'static'});
			},

			userDelete: function() {
				var userDelete = new UserDeleteView();
				this.$('.modal-container').html(userDelete.render().el);
        		this.$('#deleteModal').modal({backdrop:'static'});
			},

			userTblSummary: function() {
				var usersSummary = new UsersSummaryView();
				this.$('.modal-container').html(usersSummary.render().el);
        		this.$('#summaryModal').modal();
			},

			sendEmail: function() {
				console.log("Send Email");
			},

			gridCheckBox: function(e) {
				e.preventDefault();
           		e.stopPropagation();
				$('#selectUsersAtOnce').prop('checked', function () {
					if (this.checked) {
						$(this).prop("checked", true);
						$('.selectrows').prop("checked", true);
						$('table[id="MyGrid"] tbody tr').addClass('warning')
					} else {
						$(this).prop('checked', false);
						$('.selectrows').prop('checked', false);
						$('table[id="MyGrid"] tbody tr').removeClass('warning')
					}
				});
			},

			rowSelected: function(e) {
				console.log($(e.target).closest('input[type="checkbox"]').attr('data-id'));
				$($(e.target).closest('input[type="checkbox"]')).prop('checked', function () {
					if (this.checked) {
						$(e.target).closest('tr').addClass('warning selectedRow');
						globalSelected.push($(e.target).closest('input[type="checkbox"]').attr('data-id'));
					} else {
						$('.selectrows').prop('checked', function () {
							if($(e.target).closest('tr').hasClass('error')) {
								$(e.target).closest('tr').removeClass('error selectedRow');
							} else {
								$(e.target).closest('tr').removeClass('warning selectedRow');
							}
						});
						globalSelected.pop($(e.target).closest('input[type="checkbox"]').attr('data-id'));
					}
				});
				console.log("Users Selected::-")
				console.log(globalSelected);
			},

			rowSelectedDelete: function() {
				$('.selectrows').prop('checked', function () {
					if (this.checked) {
						$('.selectedRow').removeClass('warning').addClass('error');
					}
				});
			},

			rowSelectedNotDelete: function() {
				$('.selectrows').prop('checked', function () {
					if (this.checked) {
						$('.selectedRow').removeClass('erro').addClass('warning');
					}
				});
			}

		});

		return modifyUserPage;

	});