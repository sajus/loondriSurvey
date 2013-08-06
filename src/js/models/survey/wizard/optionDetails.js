define(['backbone','modelValidator'], function(Backbone) {
	return Backbone.Model.extend({
    	initialize:function(){
    	},
    	validation: {
    		option: {
		      required: true,
		      msg: 'Please enter an option'
		    }
    	}
    });

});
