define(['backbone','modelValidator'], function(Backbone) {
	return Backbone.Model.extend({
    	initialize:function(){
    	},
    	validation: {
    		surveyType: {
		      required: true,
		      msg: 'Please check the surveyType'
		    },
            question:{
                required:true,
                msg:'Please enter question'
            }
    	}
    });

});
