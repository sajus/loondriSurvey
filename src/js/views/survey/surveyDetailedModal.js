define(function(require) {
var Backbone = require('backbone'),
    surveyDetailedModalTemplate = require('template!templates/survey/surveyDetailedModal'),
    newOptionTemplate=require('template!templates/survey/newOption');
/* Requires with no assignment */
return Backbone.View.extend({
    className:"modal hide fade",
    id:"surveyDetailedModal",
    initialize: function() {

    },
    events: {
        // 'click .controls a':'addNewQuestion',
        'change [name=questionType]':'toggleCategory',
        'change [name=responseType]':'toggleOptions',
        'click .addOption': 'addOption',
        'click .removeOption': 'removeOption'
    },
    toggleCategory:function(e){
        var target$=$(e.target);
        if(target$.val().toLowerCase()==='category'){
            this.$('.categoryGroup').fadeIn();
        }else{
            this.$('.categoryGroup').fadeOut();
        }
    },
    toggleOptions:function(e){
        var target$=$(e.target);
        if(target$.val().toLowerCase()==='other'){
            this.$('.optionGroup').fadeOut();
        }else{
            this.$('.optionGroup').fadeIn();
        }
    },
    render: function() {
        this.$el.html(surveyDetailedModalTemplate);
        return this;
    },
    addOption: function(e) {
        e.preventDefault();
        this.$('.form-horizontal').append(newOptionTemplate({
            id: this.$('[data-name=option]').size() + 1
        }));
        console.log("in add option");
    },
    removeOption: function(e) {
        e.preventDefault();
        var target = $(e.target);
        target.closest('.control-group').remove();
        this.updateOptionSequence();
    },
    updateOptionSequence: function() {
        this.$('[data-name=option]').each(function(index) {
            var targetParent$ = $(this).closest('.control-group'),
                targetIndex = index + 1,
                label = "Option" + targetIndex,
                value = "option" + targetIndex;
            targetParent$.find(".control-label").attr("for", value).text(label).end()
                .find("[data-name=option]").attr({
                    id: value,
                    name: value
                });

        });
    }

});

});