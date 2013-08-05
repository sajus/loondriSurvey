define(['backbone','modelValidator'], function(Backbone) {

    var UserModel = Backbone.Model.extend({
		defaults: {
			title: 'users'
		},
		validation:{
			userName:{
				required: true,
				msg: 'please enter user Name.'
			},
			userId: {
				required: true,
				pattern: 'number',
				msg: 'Please enter valid User Id.'
			},
			userEmail:[{
					required: true,
					msg: 'Please enter Email Id.'
				},
				{
					pattern: 'email',
					msg: 'Email Id is not correct.'
				}
			]
		}
    });

    return UserModel;

});