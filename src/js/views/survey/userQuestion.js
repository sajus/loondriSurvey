define(function(require) {
    var Backbone = require('backbone'),
        questionTemplate = require('template!templates/survey/userQuestion'),
        CategoryModel = require('models/survey/wizard/categoryDetails');
    /* Requires with no assignment */
    return Backbone.View.extend({
        className: 'accordion-group',
        initialize: function() {
            this.model.fetchCategories(this.model.get('questionid'));
        },
        events: {
            'change #category':'selectChoice'
        },
        render: function() {
            this.$el.html(questionTemplate({
                question: this.model.toJSON(),
                category: this.model.categories.toJSON()
            }));
            return this;
        },
        selectChoice: function() {
            var $Id = $('#category').find('option:selected').val();
            var $Type = $('#category').find('option:selected').attr('type');
            this.CategoryView = require('views/survey/userCategoryView');
            var categoryView = new this.CategoryView({categoryId:$Id, categoryType:$Type});
            this.$('.userCategory').html(categoryView.render().el);
        }
    });

});