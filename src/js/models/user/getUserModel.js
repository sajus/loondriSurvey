define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var GetUserModel = Backbone.Model.extend({
		url: function(){
			return globals.gateWayUrl + "/getUserByEmpId";
		}
		
    });

    return GetUserModel;

});
