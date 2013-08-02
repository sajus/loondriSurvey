define(['backbone','events','text!templates/login/login.html'], function(Backbone, Events, loginPageTemplate){
    
    var LoginPage = Backbone.View.extend({
        
        el: '.page',

        events:{
		      'click button[type=submit]': 'validateUser',
		      'click button[type=button]': 'forgotMYPaswd'
		    },

		validateUser: function(){
		    console.log('Submit button');
		},
		forgotMYPaswd: function(){
		    console.log('Forgot my password');
		 },
        
        render: function () {
            this.$el.html(loginPageTemplate);
        }
    });
    
    return LoginPage;
});
