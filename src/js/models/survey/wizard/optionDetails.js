define(['backbone','modelValidator'], function(Backbone) {
	return Backbone.Model.extend({
    	initialize:function(){
    	},
    	validation: {
    		option1: {
		      required: true,
		      msg: 'Please enter option1'
		    },
            option2: {
              required: true,
              msg: 'Please enter option2'
            }
    	}
    });

});
