define(['backbone', 'core', 'text!templates/help/page.html'], function(Backbone, Core, helpPageTemplate){
    
    var HelpPage = Backbone.View.extend({
        
        el: '.page',

        render: function () {
            this.$el.html(helpPageTemplate);
        }
    });

    return HelpPage;
});
