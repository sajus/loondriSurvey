define(['backbone'], function(Backbone) {

	return Backbone.Collection.extend({

		initialize: function() {},

		url: function() {
			return this.model.gateWayUrl + '/getCategoriesByQuestionId';
		}
	});
});