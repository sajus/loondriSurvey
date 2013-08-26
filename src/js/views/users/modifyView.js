define(['jquery', 'underscore', 'backbone', 'models/user/getUserModel','template!templates/users/modifyUsers', 'views/users/editUserModalView', 'views/users/deleteUserModalView', 'views/users/summaryUserModalView', 'fueluxDataSource', 'fueluxDataGrid','bootstrapDropdown','fueluxComboBox','fueluxSelectBox','fueluxSearchBox'],
	function($, _,Backbone, GetUserModel, modifyUsersTemplate, UserEditView, UserDeleteView, UsersSummaryView, FuelUxDataSource){
		var globalSelected = [];
		var checkCounter = 0;
		var modifyUserPage = Backbone.View.extend({

			el: '#modifyuser',
			initialize: function(){
				this.getUserModel = new GetUserModel();
			},
			render: function(){
				var self = this;
				this.collection.fetch({
					success: function(){
						self.$el.html(modifyUsersTemplate({totalUsers: self.collection.length}));
						self.usersData(self.collection.toJSON());
						self.createDataGrid(self.usersData(self.collection.toJSON()));
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
				//'loaded #MyGrid': 'gridCheckBox',
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
					$('#femaleUsers').html(( _.where(userlistData, {gender: "f"})).length);
					$('#maleUsers').html(( _.where(userlistData, {gender: "m"})).length);
					$('#activeUsers').html(( _.where(userlistData,{status: "active"})).length);
					$('#inactiveUsers').html(( _.where(userlistData,{status: "inactive"})).length);
					$('#uiHead').html(( _.where(userlistData, {designation: "UI Head"})).length);
					$('#srManagers').html(( _.where(userlistData, {designation: "Sr. Manager"})).length);
					$('#assoManagers').html(( _.where(userlistData, {designation: "Associate Manager"})).length);
					$('#managers').html(( _.where(userlistData, {designation: "Manager"})).length);
					$('#WebDevAnalyst').html(( _.where(userlistData, {designation: "WebDev Analyst"})).length);
					$('#designAnalyst').html((_.where(userlistData, {designation: "Designer Analyst"})).length);
					$('#srwebDeveloper').html(( _.where(userlistData, {designation: "Sr. Web Developer"})).length);
					$('#sruiDesigner').html((_.where(userlistData, {designation: "Sr. UI Designer"})).length);
					$('#webDeveloper').html((_.where(userlistData, {designation: "Web Developer"})).length);
					$('#uiDesigner').html((_.where(userlistData, {designation: "UI Designer"})).length);
					$('#trainee').html((_.where(userlistData, {designation: "Trainee"})).length);
					
					$('#totalUsers').html(userlistData.length);
			},

			userEdit: function(e) {
				var self = this;
				var userEdit = new UserEditView();
				this.$('.modal-container').html(userEdit.render().el);
        		this.$('#editModal').modal({backdrop:'static'});
				this.getUserModel.set({id: 9901});
				this.getUserModel.save(self.getUserModel.toJSON(), {
					success: function()  {
						console.log('success');
					},
					error: function() {
						console.log('error');
					}
				});
				
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
				$('body').append($('#summaryModal').find('.summaryModal').html());
				$('.container').siblings('.table-bordered').addClass('addPrint');
			},

			sendEmail: function() {
				console.log("Send Email");
			},

			gridCheckBox: function(e) {
				e.preventDefault();
           		e.stopPropagation();
				$('#selectUsersAtOnce').prop('checked', function () {
					if (this.checked) {
						$('.userDelete').removeProp('disabled').removeClass('disabled');
						$(this).prop("checked", true);
						$('.selectrows').prop("checked", true);
						$('table[id="MyGrid"] tbody tr').addClass('warning')
					} else {
						$(this).prop('checked', false);
						$('.selectrows').prop('checked', false);
						$('table[id="MyGrid"] tbody tr').removeClass('warning');
						$('.userDelete').prop('disabled','true');
					}
				});
			},

			rowSelected: function(e) {
				//console.log($(e.target).closest('input[type="checkbox"]').attr('data-id'));
				$($(e.target).closest('input[type="checkbox"]')).prop('checked', function () {
					if (this.checked) {
						$(e.target).closest('tr').addClass('warning selectedRow');
						globalSelected.push($(e.target).closest('input[type="checkbox"]').attr('data-id'));
						checkCounter++;
						if(checkCounter > 0){
							$('.userDelete').removeProp('disabled').removeClass('disabled');
						}
						
					} else {
						checkCounter--;
						if(checkCounter == 0){
						$('.userDelete').prop('disabled','true');
						}
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