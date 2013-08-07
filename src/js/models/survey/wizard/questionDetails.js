define(['backbone','modelValidator'], function(Backbone) {
	return Backbone.Model.extend({
    	initialize:function(){
    	},
    	validation: {
    		questionType: {
		      required: true,
		      msg: 'Please check the type of question'
		    },
            question:{
                required:true,
                msg:'Please enter question'
            }
    	}
    });

});
