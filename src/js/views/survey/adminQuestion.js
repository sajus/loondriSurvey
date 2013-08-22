define(function(require) {
    var Backbone = require('backbone'),
        questionTemplate = require('template!templates/survey/adminQuestion'),
        SurveyDetailedModel=require('models/survey/surveyDetailed'),
        QuestionDetailsModalView = require('views/survey/questionDetailsModal'),
        SurveyDetailedModalView = require('views/survey/surveyDetailedModal'),
        Events = require('events');
    /* Requires with no assignment */
    return Backbone.View.extend({
        className: 'accordion-group',
        initialize: function() {
            this.model.fetchCategories(this.model.get('questionid') || this.model.get('id'));
            /* Events */
            Events.on("categoriesChanged", this.refreshView, this);
            Events.on("questionRemoved", this.removeView, this);
        },
        removeView:function(){
            this.remove();
        },
        events: {
            'click .newCategory': 'addNewCategory',
            'click .updateCategory': 'updateCategory',
            'click .deleteCategory': 'deleteCategory',
            'click .updateQuestion': 'updateQuestion',
            'click .deleteQuestion': 'deleteQuestion',
            'change select': 'toggleControls'
        },
        refreshView: function() {
            console.log("in the refresh view");
            this.model.fetchCategories(this.model.get('questionid'));
            this.render();
        },
        render: function() {
            console.log("in the question render");
            this.$el.html(questionTemplate({
                question: this.model.toJSON(),
                noCategory: (this.model.get('questiontype') === 'category') ? false : true,
                category: this.model.categories.toJSON()
            }));
            return this;
        },
        toggleControls: function(e) {
            var target$ = this.$(e.target);
            if (target$.val() !== undefined) {
                this.$('.updateCategory').attr("disabled", false);
                this.$('.deleteCategory').attr("disabled", false);
            } else {
                this.$('.updateCategory').attr("disabled", true);
                this.$('.deleteCategory').attr("disabled", true);
            }
        },
        updateCategory: function(e) {
            e.preventDefault();
            /* Modal Loading */
            var surveyDetailedModel = new SurveyDetailedModel();
            surveyDetailedModel.set('categoryView', true);
            // Load model contents and bind it to modal view.
            var surveyDetailedModalView = new SurveyDetailedModalView({
                model: surveyDetailedModel,
                questionid: this.model.get('questionid'),
                categoryId: parseInt(this.$('[name=category]').val(), 10)
            });
            $('.modalContainer').html(surveyDetailedModalView.render({
                category: true
            }).el);
            $('#surveyDetailedModal').modal();
        },
        updateQuestion: function(e) {
            e.preventDefault();
            /* Modal Loading */
            QuestionDetailsModel=require('models/survey/wizard/questionDetails');
            var questionDetailsModel = new QuestionDetailsModel();
            // Load model contents and bind it to modal view.
            var questionDetailsModalView = new QuestionDetailsModalView({
                model: this.model,
                isDeleteMode:false
            });
            $('.modalContainer').html(questionDetailsModalView.render().el);
            $('#surveyDetailedModal').modal();
        },
        deleteQuestion: function(e) {
            e.preventDefault();
            /* Modal Loading */
            // Load model contents and bind it to modal view.
            var questionDetailsModalView = new QuestionDetailsModalView({
                model: this.model,
                isDeleteMode:true
            });
            $('.modalContainer').html(questionDetailsModalView.render().el);
            $('#surveyDetailedModal').modal();
        },
        addNewCategory: function(e) {
            e.preventDefault();
            /* Modal Loading */
            var surveyDetailedModel = new SurveyDetailedModel();
            surveyDetailedModel.set('categoryView', true);
            var surveyDetailedModalView = new SurveyDetailedModalView({
                model: surveyDetailedModel,
                questionid: this.model.get('questionid')
            });
            $('.modalContainer').html(surveyDetailedModalView.render({
                category: true
            }).el);
            $('#surveyDetailedModal').modal();
        },
        deleteCategory: function(e) {
            e.preventDefault();
            $.ajax({
                async: false,
                url: Backbone.Model.gateWayUrl + '/deleteCategories',
                type: "POST",
                contentType: "json; charset=utf-8",
                data: JSON.stringify({
                    id: parseInt(this.$('[name=category]').val(), 10)
                }),
                success: function(data, response) {
                    console.log("category deleted successfully");
                    if (response === "success") {
                        Events.trigger("categoriesChanged");
                        Events.trigger('alert:success', [{
                            message: "Category deleted successfully"
                        }]);
                    }
                }
            });
        }
    });

});