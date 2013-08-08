define(['backbone','modelValidator'], function(Backbone) {

    var LoginModel = Backbone.Model.extend({

        url: function() {
            return 'http://ygaikwad-w2k8:8080/UiPiggy/checkAuthorization?email=anuragsh&password=adminpass'
        },

        validation:{
            inputEmail: [{
                    required: true,
                    msg: 'Please enter Email Id.'
                },
                {
                    pattern: '^[a-z0-9_-]{3,15}$',
                    msg: 'Please enter valid Email id.'
                }
            ],
            inputPassword: {
                required:true,
                msg:'Please enter password'
            }
        }
    });

    return LoginModel;
});
