define(['jquery', 'underscore', 'backbone', 'template!templates/contact/page'], function($, _, Backbone, contactPageTemplate){

	var ContactPage = Backbone.View.extend({

		el: '.page',

		render: function () {
	  		this.$el.html(contactPageTemplate);
		}

	});

	return ContactPage;
});
