define(['backbone','modelValidator'], function(Backbone) {

    var UserModel = Backbone.Model.extend({
		defaults: {
			title: 'users'
		},
		validation:{
			userName:{
				required: true,
				msg: 'Please enter username.'
			},
			userId: {
				required: true,
				pattern: 'number',
				msg: 'Please enter valid userid.'
			},
			userEmail:[{
					required: true,
					msg: 'Please enter email.'
				},
				{
					pattern: '^[a-z0-9_-]{3,15}$',
					msg: 'Email is not correct.'
				}
			]
		}
    });

    return UserModel;

});