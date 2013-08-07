define(function(require) {
var Backbone = require('backbone'),
    surveyDetailedTemplate = require('template!templates/survey/surveyDetailed'),
    newOptionTemplate=require('template!templates/survey/newOption');
/* Requires with no assignment */
return Backbone.View.extend({
    el: '.page',
    initialize: function() {

    },
    events: {
        'click .controls a':'addNewQuestion',
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
    addNewQuestion:function(e){
        e.preventDefault();
        this.$('.formContainer').slideToggle('slow');
        this.$(e.target).find('i').toggleClass('icon-plus').toggleClass('icon-minus');
    },
    render: function() {
        this.$el.html(surveyDetailedTemplate);
        return this;
    },
    addOption: function(e) {
        e.preventDefault();
        this.$('.form-actions').before(newOptionTemplate({
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