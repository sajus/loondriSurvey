define(['backbone','modelValidator'], function(Backbone) {
	return Backbone.Model.extend({
    	initialize:function(){
    	},
    	validation: {
    		category: {
		      required: true,
		      msg: 'Please enter a category'
		    },
            responseType: {
              required: true,
              msg: 'Please check type of response'
            }
        }
    });

});