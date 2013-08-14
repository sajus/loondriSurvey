define(['backbone', 'modelValidator'], function(Backbone) {

    return Backbone.Model.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/checkAuthorization';
        },
        isAuthorized: function() {
            var returnValue={};
            this.save(this.toJSON(),{
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
            userpassword: [{
                required: true,
                msg: 'Please enter password'
            }, {
                pattern: '^[a-z0-9_-]{3,15}$',
                msg: 'Password should contain min 3 and max 15 characters.'
            }]
        }
    });
});