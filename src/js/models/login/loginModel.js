define(['backbone', 'modelValidator'], function(Backbone) {

    return Backbone.Model.extend({

        url: function() {
            return 'http://ygaikwad-w2k8:8080/UiPiggy/checkAuthorization?email=anuragsh&password=adminpass'
        },
        validation: {
            email: [{
                required: true,
                msg: 'Please enter Email Id.'
            }, {
                pattern: '^[a-z0-9_-]{3,15}$',
                msg: 'Please enter valid Email id.'
            }],
            password: [{
                required: true,
                msg: 'Please enter password'
            }, {
                pattern: '^[a-z0-9_-]{3,15}$',
                msg: 'Password should contain min 3 and max 15 characters.'
            }]
        }
    });
});