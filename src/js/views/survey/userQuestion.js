define(function(require) {
    var Backbone = require('backbone'),
        questionTemplate = require('template!templates/survey/userQuestion'),
        CategoryModel = require('models/survey/wizard/categoryDetails'),
        CategoryView = require('views/survey/userCategoryView'),
        Events = require('events');
    /* Requires with no assignment */
    require('jqueryCookie');
    return Backbone.View.extend({
        className: 'accordion-group',
        initialize: function() {
            this.model.fetchCategories(this.model.get('questionid'));
            this.surveyId = this.model.get('surveyid');
            this.questionId = this.model.get('questionid');
            console.log($.cookie('statusSurvey'));
            /* Post Chaining */
            Events.on('postResponse', this.filterCategories, this);
            Events.on('removeQuestionView', this.removeQuestionView, this);
        },
        events: {
            'change .category': 'selectChoice'
        },
        removeCategory: function() {
            var returnValue = false;
            var select$ = this.$('[name=category]');
            if (select$.length !== 0) {
                /* Remove option */
                // DOM
                select$.find('option:selected').remove();
                returnValue = (select$.find('option').length === 0) ? true : false;
                // From DB
            } else {
                returnValue = true;
                console.warn("no option to remove");
            }
            return returnValue;
        },
        render: function() {
            console.log(this.model.categories.toJSON());
            console.log(this.model.toJSON());
            if (this.model.get('questiontype') === "category") {
                // $('#category').show();
                this.$el.html(questionTemplate({
                    question: this.model.toJSON(),
                    category: this.model.categories.toJSON(),
                    noCategory: false
                }));
            } else {
                this.$el.html(questionTemplate({
                    question: this.model.toJSON(),
                    category: this.model.categories.toJSON(),
                    noCategory: true
                }));
                var $Id = this.$('.noCategory').data('id');
                var $Type = this.$('.noCategory').data('type');
                var categoryView = new CategoryView({
                    categoryId: $Id,
                    categoryType: $Type,
                    surveyId: this.surveyId,
                    questionId: this.questionId
                });
                this.$('.userCategory').html(categoryView.render().el);
                // $('#category').hide();
            }
            return this;
        },
        filterCategories: function(responsePostData) {
            if (this.model.get('questionid') !== responsePostData.questionid) {
                return;
            }
            console.log("in the filter categories");
            console.log(responsePostData);
            console.log(this.model.toJSON());
            console.log(this.model.categories.toJSON());
            //noCategory
            if (this.removeCategory()) {
                /* Check if no question */
                Events.trigger('filterQuestions', {
                    responsePostData: responsePostData,
                    qModel: this.model
                });
            } else {
                console.warn("Still many categories are left");
            }
        },
        selectChoice: function() {
            var $Id = $('.category').find('option:selected').val();
            var $Type = $('.category').find('option:selected').attr('data-type');
            console.log($Id);
            console.log($Type);
            var categoryView = new CategoryView({
                categoryId: $Id,
                categoryType: $Type,
                surveyId: this.surveyId,
                questionId: this.questionId
            });
            this.$('.userCategory').html(categoryView.render().el);
        },
        removeQuestionView: function(data) {
            console.log("in the remove question view");
            if (this.model.get('questionid') !== data.questionid) {
                return;
            }
            this.remove();
            console.log("removed the view with qid: "+data.questionid);
        }
    });

});