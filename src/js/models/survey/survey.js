define(['backbone','modelValidator'], function(Backbone) {
	return Backbone.Model.extend({
    	initialize:function(){
    	},
    	validation: {
    		title: {
		      required: true,
		      msg: 'Please enter a title'
		    },
            welcomeMessage:{
                required:true,
                msg:'Please enter welcome message'
            }
    	}
    });

});
