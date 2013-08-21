define(['backbone','models/survey/wizard/questionDetails'], function(Backbone,QuestionModel) {

	return Backbone.Collection.extend({
		model: QuestionModel,

		initialize: function() {},

		url: function() {
			return this.model.gateWayUrl + '/getAllSurvey';
		}
	});
});