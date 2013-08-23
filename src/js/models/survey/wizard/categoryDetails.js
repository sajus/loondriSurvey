define(['backbone', 'collections/survey/options', 'modelValidator', 'jqueryCookie'], function(Backbone, OptionsCollection) {
    return Backbone.Model.extend({
        initialize: function() {
            this.optionsCollection = new OptionsCollection();
            console.log(this.optionsCollection);
        },
        fetchOptions: function() {
            var self=this;
            if (this.get('categorytype') === 'other') {
                return;
            } else {
                $.ajax({
                    url: Backbone.Model.gateWayUrl + "/getOptionsByCategoryId",
                    data: JSON.stringify({
                        categoriesid: this.get('categoriesid')
                    }),
                    success: function(data, response) {
                        self.optionsCollection.reset(data.Optionslist);
                    },
                    error:function(){
                        console.log("in the error of fetch options");
                    }
                });

            }
        },
        validation: {
            categoryname: 'validateCategory',
            categorytype: {
                required: true,
                msg: 'Please check type of response'
            }
        },
        validateCategory: function(value, attr, computedState) {
            if ($.cookie("isNoCategory") === "true") {
                this.set('categoryname', 'NA');
            } else {
                if (value === undefined) {
                    return "Please enter a category";
                }
            }
        }
    });

});