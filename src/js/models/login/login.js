define(['backbone','modelValidator'], function(Backbone) {

    var LoginModel = Backbone.Model.extend({
        defaults: {
            title: 'users'
        },
        url: function() {
            return 'http://ygaikwad-w2k8:8080/UiPiggy/checkAuthorization'
        },
        parse: function(response) {
            console.log(response);

            return response; 
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

    var loginService = new LoginModel();
    console.log(loginService);

    loginService.fetch({
        success: function() {
            console.log("fetch success");
            console.log(loginService.toJSON());
        },
        error: function() {
            console.log("Some error triggered");
        }
    });


    return LoginModel;

});
