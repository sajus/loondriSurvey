define(['backbone','text!templates/login/login.html'], function(Backbone, loginPageTemplate){
    
    var LoginPage = Backbone.View.extend({
        
        el: '.page',
        
        render: function () {
            this.$el.html(loginPageTemplate);
        }
    });
    
    return LoginPage;
});
