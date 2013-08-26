define(['backbone'], function(Backbone) {

	return Backbone.Collection.extend({

		initialize: function() {},

		url: function() {
			return this.model.gateWayUrl + '/getAllSurvey';
		},

		fromToday: function() {
			var sampleData;
            return _.filter(this.toJSON()[0].SurveyList,function(survey){
                if((moment(survey.startDate).unix() <= moment().unix()) &&
                    (moment(survey.endDate).unix() >= moment().unix())) {
                    return true;
                }
            });
        }
	});

});