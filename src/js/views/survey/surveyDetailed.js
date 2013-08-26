define(function(require) {
    var Backbone = require('backbone'),
        Events = require('events'),
        surveyDetailedTemplate = require('template!templates/survey/surveyDetailed'),
        newOptionTemplate = require('template!templates/survey/newOption'),
        SurveyDetailedModel = require('models/survey/surveyDetailed'),
        SurveyDetailedModalView = require('views/survey/surveyDetailedModal');
    /* Requires with no assignment */
    require('jqueryCookie');
    return Backbone.View.extend({
        el: '.page',
        initialize: function() {
            var self = this,
                accessLevel = $.cookie('accesslevel');
            $.ajax({
                url: Backbone.Model.gateWayUrl + "/getSurveyById",
                data: JSON.stringify({
                    id: this.model.get('id')
                }),
                success: function(data, response) {
                    self.model.set(data);
                    /* Fetch the questions now. */
                    self.model.fetchQuestions();
                    console.log(data);
                },
                error: function(data, error, options) {
                    Events.trigger("view:navigate", {
                        path: "listSurvey",
                        options: {
                            trigger: true,
                        }
                    });
                    Events.trigger('alert:error', [{
                        message: error + " while fetching the survey  with id : " + self.model.get('id')
                    }]);
                }
            })
            if (accessLevel === "admin" || accessLevel === "super admin") {
                /* Admin view loading */
                this.QuestionView = require('views/survey/adminQuestion');
                this.isAdmin = true;
            } else if (accessLevel === "user" || !accessLevel) {
                /* User view loading */
                this.QuestionView = require('views/survey/userQuestion');
                this.isAdmin = false;
            }
            Events.on("addQuestion", this.addQuestion, this);
            Events.on('filterQuestions', this.filterQuestions, this);
            this.model.questions.on('remove', this.filterSurvey, this);
        },
        events: {
            'click .controls a': 'addNewQuestion'
        },
        addNewQuestion: function(e) {
            e.preventDefault();

            /* Modal Loading */
            var surveyDetailedModel = new SurveyDetailedModel(),
                surveyDetailedModalView = new SurveyDetailedModalView({
                    model: surveyDetailedModel,
                    surveyId: this.model.get('id')
                });

            this.$('.modalContainer').html(surveyDetailedModalView.render({
                category: false
            }).el);
            this.$('#surveyDetailedModal').modal();
        },
        render: function() {
            this.$el.html(surveyDetailedTemplate({
                questions: this.model.toJSON(),
                isAdmin: this.isAdmin
            }));
            var questionCollection = this.model.questions;
            if (questionCollection.toJSON().length !== 0) {
                /* ==========================================================================
                   Filter questions and create question view based on admin/other user
                   ========================================================================== */
                /* Set the cookie hash for tracking states */
                if (!this.isAdmin) {
                    var surveyStatus = [];
                    questionCollection.each(function() {
                        surveyStatus.push(false);
                    });
                    console.log(surveyStatus);
                    this.setStatusCookies(surveyStatus.toString());

                }
                questionCollection.each(function(qModel) {
                    this.addQuestion(qModel);
                }, this);
            } else {
                this.$('.accordion').append("No question in this survey yet");
            }
            return this;
        },
        setStatusCookies: function(idHashStr) {
            $.cookie('statusSurvey', idHashStr);
        },
        addQuestion: function(qModel) {
            var questionView = new this.QuestionView({
                model: qModel
            });
            this.$('.accordion').append(questionView.render().el);
        },
        filterQuestions: function(data) {
            console.log("in the filter questions");
            this.model.questions.remove(data.qModel);
        },
        filterSurvey: function(data) {
            console.log("in the filerSurvey");
            console.log(this.model.questions.toJSON());
            if (this.model.questions.length === 0) {
                alert('survey completed successfully');
            } else {
                Events.trigger("removeQuestionView", data.toJSON());
                // alert('Survey is still pending');
            }
        }
    });

});