define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var UserModel = Backbone.Model.extend({
		url: function(){
			return globals.gateWayUrl + "/getAllDesignations";
		},

		validation:{
			empid: {
				required: true,
				pattern: 'number',
				msg: 'Employee ID can\'t be empty'
			},
			firstname: {
				required: true,
				msg: 'First name can\'t be emply'
			},
			lastname: {
				required: true,
				msg: 'Last name can\'t be emply'
			},
			email: {
				required: true,
				msg: 'Email can\'t be emply'
			},
			password: {
				required: true,
				msg: 'Password can\'t be emply'
			}
		}
    });

    return UserModel;

});