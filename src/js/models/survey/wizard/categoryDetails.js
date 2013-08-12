define(['backbone', 'modelValidator', 'jqueryCookie'], function(Backbone) {
    return Backbone.Model.extend({
        initialize: function() {},
        validation: {
            category: 'validateCategory',
            responseType: {
                required: true,
                msg: 'Please check type of response'
            }
        },
        validateCategory: function(value, attr, computedState) {
            console.log(value);
            console.log(computedState);
            if ($.cookie("isNoCategory") === "true") {
                this.set('category', 'NA');
            } else {
                if (value === undefined) {
                    return "Please enter a category";
                }
            }
        }
    });

});