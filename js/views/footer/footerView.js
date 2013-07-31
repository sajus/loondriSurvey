define(['backbone', 'events', 'text!templates/footer/footer.html'], function(Backbone, Events, footerTemplate){
    
    var FooterView = Backbone.View.extend({
        
        el: '.footer',
    
        render: function () {
          	this,$el.html(footerTemplate);          
        }
        
    });

    return FooterView;
});
