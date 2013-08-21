define(['backbone', 'collections/survey/questions', 'modelValidator'], function(Backbone, QuestionsCollection) {
	return Backbone.Model.extend({
		initialize: function() {
			this.questions = new QuestionsCollection();
			this.on('change', this.fetchQuestions, this);
		},
		fetchQuestions: function() {
            var self = this;
            $.ajax({
                async:false,
                url: Backbone.Model.gateWayUrl + "/getQuestionsBySurveyId",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    surveyid: this.get('id')
                }),
                success: function(data, response) {
                    self.questions.reset(data.questionsListBySurveyId);
                    console.log(self.questions.toJSON());
                },
                error: function(data, error, options) {
                   console.log("some error occured while fetching question collection.");
                }
            })
		}
	});
});