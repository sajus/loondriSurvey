define(function(require) {
    var Backbone = require('backbone'),
        questionTemplate = require('template!templates/survey/userQuestion'),
        CategoryModel = require('models/survey/wizard/categoryDetails'),
        CategoryView = require('views/survey/userCategoryView');
    /* Requires with no assignment */
    require('jqueryCookie');
    return Backbone.View.extend({
        className: 'accordion-group',
        initialize: function() {
            this.model.fetchCategories(this.model.get('questionid'));
            this.surveyId = this.model.get('surveyid');
            this.questionId = this.model.get('questionid');
            console.log($.cookie('statusSurvey'));
        },
        events: {
            'change .category': 'selectChoice'
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
        filterQuestion: function() {
            /* Check whether this question is already answered */

        },
        filterCategories: function() {
            /* check whether the user has already answered the category */
            /* If all categories are answered then set the question as complete */
            /* Set the cookie for survey ---Add question flag to true */

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
        }
    });

});