define(['backbone', 'modelValidator'], function(Backbone) {
    return Backbone.Model.extend({
        initialize: function() {},
        validation: {
            option1: 'validateOptions',
            option2: 'validateOptions'
        },
        validateOptions: function(value, attr, computedState) {
            if ($.cookie("isCustomResponse") === "true") {
                this.set(attr, 'NA');
            } else {
                if (value === undefined) {
                    return "Please enter this option";
                }
            }
        }
    });

});