define(['backbone', 'collections/survey/categories', 'modelValidator'], function(Backbone, CategoryCollection) {
    return Backbone.Model.extend({
        initialize: function() {
            this.categories = new CategoryCollection();
        },
        fetchCategories: function(id) {
            var self = this;
            $.ajax({
                async: false,
                url: Backbone.Model.gateWayUrl + "/getCategoriesByQuestionId",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    questionid: id
                }),
                success: function(data, response) {
                    self.categories.reset(data.categoriesListByQuestionId);
                    console.log(self.categories.toJSON());
                },
                error: function(data, error, options) {
                    console.log("some error occured while fetching category collection.");
                }
            })
        },
        validation: {
            questiontype: {
                required: true,
                msg: 'Please check the type of question'
            },
            questionvalue: {
                required: true,
                msg: 'Please enter question'
            }
        }
    });

});