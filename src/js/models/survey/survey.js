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
            },
            startDate:{
                required:true,
                msg:'Please enter start date'
            },
            endDate:{
                required:true,
                msg:'Please enter end date'
            }
    	}
    });

});
