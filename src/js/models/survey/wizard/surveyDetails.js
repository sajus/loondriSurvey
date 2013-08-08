define(['backbone', 'modelValidator'], function(Backbone) {
    return Backbone.Model.extend({
        initialize: function() {
            this.on('change', function() {
                console.log(this.toJSON());
            });
        },
        validation: {
            title: {
                required: true,
                msg: 'Please enter a title'
            },
            // startDate: {
            //     required: true,
            //     msg: 'Please enter start date'
            // },
            startDate:'validateStartDate',
            endDate:'validateEndDate',
            // endDate: {
            //     required: true,
            //     msg: 'Please enter end date'
            // },
            // endDate:'validateDate',
            description:{
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
        // validateDate:function(value,attr,computedState){
        //     console.log("in validate Date");
        //     if(computedState.startDate!==undefined && computedState.endDate!==undefined){
        //         console.log("in the check state");
        //         var sArray=computedState.startDate.split("-"),
        //             eArray=computedState.endDate.split("-"),
        //             sDate=new Date(sArray[0],sArray[1]-1,sArray[2]),
        //             eDate=new Date(eArray[0],eArray[1]-1,eArray[2]),
        //             today=new Date();
        //         if(sDate>eDate){
        //             return "Start date must be less than End date";
        //         }
        //     }
        // },
        // validatePastDate:function(value,attr,computedState){
        //     console.log("in validate past date");
        //     if(computedState.startDate!==undefined){
        //         var sArray=computedState.startDate.split("-"),
        //         sDate=new Date(sArray[0],sArray[1]-1,sArray[2]),
        //         today=new Date();
        //         if(sDate<today){
        //             return "Please enter date in the present";
        //         }
        //     }
        // }
    });

});