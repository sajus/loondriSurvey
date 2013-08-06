define(['backbone','modelValidator'], function(Backbone) {

    var UserModel = Backbone.Model.extend({
		defaults: {
			title: 'users'
		},
		url: function(){
			return "http://ygaikwad-w2k8:8080/UiPiggy/getAllUsers";
			//return "http://maps.googleapis.com/maps/api/directions/json?origin=Pune&destination=Mumbai&sensor=false";
		},
		parse: function(response) {

			return response;
			
		},
		initialize: function(){
			console.log('model initalized');
		}
    });

    return UserModel;

});