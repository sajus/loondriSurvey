define(['backbone'], function(Backbone) {

	var ListSurveyCollection = Backbone.Collection.extend({

		initialize:function(){
		},

		url: function() {
			return 'http://ygaikwad-w2k8:8080/UiPiggy/getAllSurvey';
		}
	});

	return ListSurveyCollection;

});