define(['backbone', 'models/userAssesment/userAssesmentModel'], function(Backbone, userAssesmentModel) {

    var UserAssesmentCollection = Backbone.Collection.extend({

        model: userAssesmentModel

    });

    return UserAssesmentCollection;
});
