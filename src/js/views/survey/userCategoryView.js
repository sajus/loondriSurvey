define(function(require) {
    var Backbone = require('backbone'),
        categoryTemplate = require('template!templates/survey/userCategory'),
        CategoryModel = require('models/survey/wizard/categoryDetails');;
    /* Requires with no assignment */
    return Backbone.View.extend({
        className: 'userCategory',
        initialize: function() {
            this.single = false;
            this.multi = false;
            this.other = false;
            var self = this;
            self.categoryModel = new CategoryModel();
            self.categoryModel.set({
                categoriesid:  this.options.categoryId
            });
            self.categoryModel.fetchOptions();
            this.optionvalue = [];
            for (var i = 0; i < self.categoryModel.optionsCollection.toJSON().length; i++) {
                this.optionvalue.push(self.categoryModel.optionsCollection.toJSON()[i].optionvalue);
            };
        },
        events: {
            'click .save': 'save'
        },
        render: function() {
            if(this.options.categoryType === "single") {
                this.single = true;
            } else if(this.options.categoryType === "multi") {
                this.multi = true;
            } else {
                this.other = true;
            }
            this.$el.html(categoryTemplate({single:this.single, multi:this.multi, other:this.other, optionvalue: this.optionvalue}));
            return this;
        },
        save: function() {
            if(this.options.categoryType === "single") {
                console.log("single");
                console.log($("input[type='radio']:checked").val());
            } else if(this.options.categoryType === "multi") {
                console.log("multi");
                var checked = new Array();
                 $("input[type='checkbox']:checked").each(function() {
                    checked.push($(this).attr('name'));
                });
                console.log(checked);
            } else {
                console.log("other");
                console.log($("#focusedInput").val());
            }
        }
    });

});