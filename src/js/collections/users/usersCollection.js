define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var ModifyCollection = Backbone.Collection.extend({

		url: function(){
			return globals.gateWayUrl + "/getAllUsers";
		},

		parse: function(response){
			var userlistObj = {};
			var userslistObj = [];
			var self = this;
			var operationHTML = '<button class="btn btn-small btn-primary userEdit" type="button"><i class="icon-edit icon-white"></i> Edit</button>&nbsp;<button class="btn btn-small btn-danger userDelete" type="button"><i class="icon-trash icon-white"></i> Delete</button>';
			_.each(response.userslist, function(userlist){
				userlist.gender==='M' ? userlist.gender = "Male" : userlist.gender = "Female";
				userlist.status = userlist.status.toLowerCase();
				userlist.status==='active' ? userlist.status = '<span class="label label-success">' + self.capitaliseFirstLetter(userlist.status) + '</span>' : userlist.status = '<span class="label label-inverse">' + self.capitaliseFirstLetter(userlist.status) + '</span>';

				userlistObj = _.object([
					"empid",
					"firstname",
					"lastname",
					"email",
					"gender",
					"designationid",
					"status",
					"accesslevel",
					"operations"
				],[
					userlist.id,
					userlist.firstname,
					userlist.lastname,
					userlist.email,
					userlist.gender,
					userlist.designationid,
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
		}
    });

    return ModifyCollection;

});
