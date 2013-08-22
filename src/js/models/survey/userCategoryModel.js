define(['backbone','modelValidator'], function(Backbone) {
	return Backbone.Model.extend({
    	initialize:function(){
    	},
        url: function() {
            return Backbone.Model.gateWayUrl + '/response';
        },
    	validation: {}
    });

});
