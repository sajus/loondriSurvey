define(function(require) {
var Backbone = require('backbone'),
    surveyDetailedTemplate = require('template!templates/survey/surveyDetailed'),
    newOptionTemplate=require('template!templates/survey/newOption');
    SurveyDetailedModalView=require('views/survey/surveyDetailedModal'),
    SurveyDetailedModel=require('models/survey/surveyDetailed');
/* Requires with no assignment */
return Backbone.View.extend({
    el: '.page',
    initialize: function() {

    },
    events: {
        'click .controls a':'addNewQuestion'
        // 'change [name=questionType]':'toggleCategory',
        // 'change [name=responseType]':'toggleOptions',
        // 'click .addOption': 'addOption',
        // 'click .removeOption': 'removeOption'
    },
    addNewQuestion:function(e){
        e.preventDefault();

        /* Modal Loading */
        var surveyDetailedModel=new SurveyDetailedModel(),
            surveyDetailedModalView=new SurveyDetailedModalView({model:surveyDetailedModel});

        this.$('.modalContainer').html(surveyDetailedModalView.render().el);
        this.$('#surveyDetailedModal').modal();
    },
    render: function() {
        this.$el.html(surveyDetailedTemplate);
        return this;
    }
});

});