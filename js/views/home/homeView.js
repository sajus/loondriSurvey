define(['backbone','text!templates/home/page.html'], function(Backbone, homePageTemplate){
    
    var HomePage = Backbone.View.extend({
        
        el: '.page',
        
        render: function () {
            this.$el.html(homePageTemplate);
        }
    });
    
    return HomePage;
});
