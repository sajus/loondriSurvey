define(function(require) {
    var Backbone = require('backbone'),
        questionTemplate = require('template!templates/survey/adminQuestion'),
        SurveyDetailedModel = require('models/survey/surveyDetailed'),
        SurveyDetailedModalView = require('views/survey/surveyDetailedModal'),
        Events = require('events');
    /* Requires with no assignment */
    return Backbone.View.extend({
        className: 'accordion-group',
        initialize: function() {
            this.model.fetchCategories(this.model.get('questionid'));
            /* Events */
            Events.on("categoriesChanged", this.refreshView, this);
        },
        events: {
            'click .newCategory': 'addNewCategory',
            'click .updateCategory': 'updateCategory',
            'change select': 'toggleUpdateButton'
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
        toggleUpdateButton: function(e) {
            var target$ = this.$(e.target);
            if (target$.val() !== undefined) {
                this.$('.updateCategory').attr("disabled", false);
            } else {
                this.$('.updateCategory').attr("disabled", true);
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
        }
    });

});