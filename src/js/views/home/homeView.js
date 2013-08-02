define(['backbone','handlebars', 'template!templates/home/page'], function(Backbone, Handlebars, homePageTemplate){

    var HomePage = Backbone.View.extend({

        el: '.page',

        render: function () {
        	this.$el.html(homePageTemplate({data: 'Ashwin'}));
        }
    });

    return HomePage;
});
