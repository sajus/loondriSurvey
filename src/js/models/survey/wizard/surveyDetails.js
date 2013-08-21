define(['backbone', 'collections/survey/questions', 'modelValidator'], function(Backbone, QuestionsCollection) {
    _.extend(Backbone.Validation.validators, {
        validateStartDate: function(value, attr, customValue, model) {
            if (value === undefined) {
                return 'Start date is required';
            }
            var sArray = value.split("-"),
                sDate = new Date(sArray[0], sArray[1] - 1, sArray[2]),
                today = new Date();
            if (sDate < today) {
                return "Past dates are not allowed";
            }
        },
        validateEndDate: function(value, attr, customValue, model) {
            if (value === undefined) {
                return 'End date is required';
            }
            if (model.get('startdate') === undefined) {
                var eArray = value.split("-"),
                    eDate = new Date(eArray[0], eArray[1] - 1, eArray[2]),
                    today = new Date();
                if (eDate < today) {
                    return "Past dates are not allowed";
                }
            } else {

                var sArray = model.get('startdate').split("-"),
                    eArray = value.split("-"),
                    sDate = new Date(sArray[0], sArray[1] - 1, sArray[2]),
                    eDate = new Date(eArray[0], eArray[1] - 1, eArray[2]),
                    today = new Date();
                if (sDate > eDate) {
                    return "End date must be greater than start date";
                }
            }

        }
    });
    return Backbone.Model.extend({
        initialize: function() {
            this.questions = new QuestionsCollection();
        },
        validation: {
            title: {
                required: true,
                msg: 'Please enter a title'
            },
            startdate: [{
                required: true,
                msg: "Start date is required"
            }, {
                validateStartDate: true
            }],
            enddate: [{
                required: true,
                msg: "End date is required"
            }, {
                validateEndDate: true
            }],
            description: {
                required: true,
                msg: "Please enter description"
            }
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