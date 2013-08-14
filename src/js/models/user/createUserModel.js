define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var UserModel = Backbone.Model.extend({
		url: function(){
			return globals.gateWayUrl + "/createUsers";
		},
		validation: {

        }
    });

    return UserModel;

});
