define(['jquery', 'underscore', 'backbone', 'text!templates/contact/page.html'], function($, _, Backbone, contactPageTemplate){
	
	var ContactPage = Backbone.View.extend({

		el: '.page',

		render: function () {
	  		this.$el.html(contactPageTemplate);
		}
		
	});
	
	return ContactPage;
});
