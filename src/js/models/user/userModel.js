define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var UserModel = Backbone.Model.extend({
		url: function(){
			return globals.gateWayUrl + "/getAllDesignations";
		},

		validation:{
			username:{
				required: true,
				msg: 'Please enter username.'
			},
			empid: {
				required: true,
				pattern: 'number',
				msg: 'Please enter valid userid.'
			},
			email:[{
					pattern: '^[a-z0-9_-]{3,15}$',
					msg: 'Email is not correct.'
				},
				{
					required: true,
					msg: 'Please enter email.'
				}
			]
		},

		parse: function(response) {
			return response.DesignationsList;
		}
    });

    return UserModel;

});