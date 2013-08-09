define(['backbone', 'modelValidator'], function(Backbone) {

    return Backbone.Model.extend({
        setParams: function(params) {
            this.email = params.email;
            this.password = params.password;
        },
        url: function() {
            return Backbone.Model.gateWayUrl + '/checkAuthorization?email='+this.email+'&password='+this.password;
        },
        isAuthorized: function() {
            return true;
            var returnValue=false;
            this.fetch({
                async:false,
                success:function(model,response){
                    returnValue=response;
                }
            });
            return returnValue;
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