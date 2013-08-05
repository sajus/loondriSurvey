define(['backbone', 'models/user/userModel'], function(Backbone, userModel) {

    var UsersCollection = Backbone.Collection.extend({

        model: userModel

    });

    return UsersCollection;
});
