define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var ModifyModel = Backbone.Model.extend({

		url: function(){
			return globals.gateWayUrl + "/getAllUsers";
		},

		parse: function(response){
			return response.rows;
		}
    });

    return ModifyModel;

});