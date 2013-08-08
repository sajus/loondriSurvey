define(['backbone'], function(Backbone) {

	var ListSurveyCollection = Backbone.Collection.extend({

		initialize:function(){
		},

		url: function() {
			return this.model.gateWayUrl+ '/getAllSurvey';
		}
	});

	return ListSurveyCollection;

});