define(['backbone', 'modelValidator'], function(Backbone) {
    return Backbone.Model.extend({
        url:function(){
            return Backbone.Model.gateWayUrl+"/createSurvey";
        },
        validation: {
            title: {
                required: true,
                msg: 'Please enter a title'
            },
            startdate:'validateStartDate',
            enddate:'validateEndDate',
            desc:{
                required:true,
                msg:"Please enter description"
            }
        },
        validateStartDate:function(value,attr,computedState){
            var finalValidationMessage="";
            if(value===undefined){
                return "Start date is required";
            }
            if(computedState.startDate!==undefined && computedState.endDate!==undefined){
                var sArray=computedState.startDate.split("-"),
                    eArray=computedState.endDate.split("-"),
                    sDate=new Date(sArray[0],sArray[1]-1,sArray[2]),
                    eDate=new Date(eArray[0],eArray[1]-1,eArray[2]),
                    today=new Date();
                if(sDate>eDate){
                    finalValidationMessage+="Start date must be less than End date";
                }
            }else if(computedState.startDate!==undefined){
                var sArray=computedState.startDate.split("-"),
                sDate=new Date(sArray[0],sArray[1]-1,sArray[2]),
                today=new Date();
                if(sDate<today){
                    finalValidationMessage+="Please enter date in the present";
                }
            }
            return finalValidationMessage;
        },
        validateEndDate:function(value,attr,computedState){
            if(value===undefined){
                return "End date is required";
            }
            if(computedState.startDate!==undefined && computedState.endDate!==undefined){
                console.log("in the check state");
                var sArray=computedState.startDate.split("-"),
                    eArray=computedState.endDate.split("-"),
                    sDate=new Date(sArray[0],sArray[1]-1,sArray[2]),
                    eDate=new Date(eArray[0],eArray[1]-1,eArray[2]),
                    today=new Date();
                if(sDate>eDate){
                    return "Start date must be less than End date";
                }
            }
        }
    });

});