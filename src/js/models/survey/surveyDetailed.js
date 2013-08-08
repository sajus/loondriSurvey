define(['backbone','modelValidator'], function(Backbone) {
	return Backbone.Model.extend({
    	initialize:function(){
    	},
    	validation: {
    		question:{
                required:true,
                msg:"Question is required"
            },
            questionType:{
                required:true,
                msg:"Question type is required"
            },
            responseType:{
                required:true,
                msg:"Response type is required"
            },
            category:{
                required:true,
                msg:"Category is required"
            },
            option1:{
                required:true,
                msg:"Option1 is required"
            },
            option2:{
                required:true,
                msg:"Option2 is required"
            }
        }
    });

});
