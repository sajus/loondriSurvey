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
						self.usersData(self.collection.toJSON());
						self.createDataGrid(self.usersData(self.collection.toJSON()));
						//self.summaryData(self.collection.toJSON());
						//console.log(self.collection.userData());
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
			usersData: function(Userlist){
					var userlistObj = {};
					var userslistObj = [];
					var self = this;
					var operationHTML = '<button class="btn btn-small btn-primary userEdit" type="button"><i class="icon-edit icon-white"></i> Edit</button>';

					_.each(Userlist, function(userlist){
						userlist.selectRows = "<input type='checkbox' class='selectrows' data-id="+userlist.id+">";
						userlist.gender==='M' ? userlist.gender = "Male" : userlist.gender = "Female";
						userlist.status = userlist.status.toLowerCase();
						userlist.status==='active' ? userlist.status = '<span class="label label-success">' + self.capitaliseFirstLetter(userlist.status) + '</span>' : userlist.status = '<span class="label label-inverse">' + self.capitaliseFirstLetter(userlist.status) + '</span>';

						userlistObj = _.object([
							"selectrows",
							"empid",
							"firstname",
							"lastname",
							"email",
							"gender",
							"designation",
							"status",
							"accesslevel",
							"operations"
						],[
							userlist.selectRows,
							userlist.id,
							userlist.firstname,
							userlist.lastname,
							userlist.email,
							userlist.gender,
							userlist.designation,
							userlist.status,
							userlist.accesslevel,
							operationHTML
						]);

						userslistObj.push(userlistObj);
					});

					return userslistObj;
			},
			capitaliseFirstLetter: function(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			},
			
			createDataGrid: function(userslistObj){
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
					data: userslistObj,
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
			summaryData: function(userlistData){
					var femaleUsers = _.where(userlistData, {gender: "f"});
					var maleUsers = _.where(userlistData, {gender: "m"});
					var activeUsers = _.where(userlistData,{status: "active"});
					var inactiveUsers = _.where(userlistData,{status: "inactive"});
					
					$('#femaleUsers').html(femaleUsers.length);
					$('#maleUsers').html(maleUsers.length);
					$('#inactiveUsers').html(inactiveUsers.length);
					$('#activeUsers').html(activeUsers.length);
					
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
				this.summaryData(this.collection.toJSON());
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
				//console.log($(e.target).closest('input[type="checkbox"]').attr('data-id'));
				$($(e.target).closest('input[type="checkbox"]')).prop('checked', function () {
					if (this.checked) {
						$('.userDelete').removeProp('disabled').removeClass('disabled');
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
				//console.log("Users Selected::-")
				//console.log(globalSelected);
			},

			rowSelectedDelete: function() {
				$('.selectrows').prop('checked', function () {
					if (this.checked) {
						$(this).parent().parent().removeClass('warning').addClass('error');
						//$('.selectedRow').removeClass('warning').addClass('error');
					}
				});
			},

			rowSelectedNotDelete: function() {
				$('.selectrows').prop('checked', function () {
					if (this.checked) {
						$(this).parent().parent().removeClass('error').addClass('warning');
						//$('.selectedRow').removeClass('erro').addClass('warning');
					}
				});
			}

		});

		return modifyUserPage;

	});