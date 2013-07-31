define(['jquery', 'underscore', 'backbone', 'text!templates/about/page.html'], function($, _, Backbone, aboutPageTemplate){
    
    var AboutPage = Backbone.View.extend({
        
        el: '.page',

        render: function () {
            this.$el.html(aboutPageTemplate);
        }
    });
    
    return AboutPage;
});
