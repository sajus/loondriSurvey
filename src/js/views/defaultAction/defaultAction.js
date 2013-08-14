define(['backbone','template!templates/defaultAction/404'], function(Backbone, defaultTemplate){

    var DefaultPage = Backbone.View.extend({

        el: '.page',

        // initialize: function() {
        // 	$('.main-menu-container').remove();
        //     $('.footer').remove();
        //     $('.alert-container').remove();
        // },

        render: function () {
        	this.$el.html(defaultTemplate({data: 'Ashwin'}));
        }
    });

    return DefaultPage;
});
