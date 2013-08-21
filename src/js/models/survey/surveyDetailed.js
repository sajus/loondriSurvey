define(['backbone','modelValidator'], function(Backbone) {
	return Backbone.Model.extend({
    	initialize:function(){
    	},
    	validation: {
    		question:'validateQuestion',
            questionType:'validateQuestionType',
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
        },
        validateQuestion:function(value,attr,computedState){
            if(computedState.categoryView){
                // return true;
            }else{
                if(value===undefined){
                    return "Question is required";
                }
            }
        },
        validateQuestionType:function(value,attr,computedState){
            if(computedState.categoryView){
                // return true;
            }else{
                if(value===undefined){
                    return "Question type is required";
                }
            }
        }
    });

});
