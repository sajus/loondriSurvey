define(['backbone'], function(Backbone) {

    var UserModel = Backbone.Model.extend({
		defaults: {
			title: 'users'
		}
    });

    return UserModel;

});