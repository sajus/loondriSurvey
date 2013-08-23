define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var ModifyCollection = Backbone.Collection.extend({

		url: function(){
			return globals.gateWayUrl + "/getAllUsers";
		},

		parse: function(response){
			
			return response.userslist;
		}
    });

    return ModifyCollection;

});
