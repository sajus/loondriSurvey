define(function(require) {
var Backbone = require('backbone'),
    surveyDetailedModalTemplate = require('template!templates/survey/surveyDetailedModal'),
    newOptionTemplate=require('template!templates/survey/newOption'),
    BaseView=require('views/BaseView');
    /* Requires with no assignment */
    require('modelBinder');
return BaseView.extend({
    className:"modal hide fade",
    id:"surveyDetailedModal",
    initialize: function() {
        this._modelBinder = new Backbone.ModelBinder();
        console.log(this);
    },
    events: {
        // 'click .controls a':'addNewQuestion',
        'change [name=questionType]':'toggleCategory',
        'change [name=responseType]':'toggleOptions',
        'click .addOption': 'addOption',
        'click .removeOption': 'removeOption',
        /* Category */
        'click .addCategory':'addCategory',
        'keypress [name=categoryInput]':'toggleBorder',
        /* Save */
        'change input[type=text],textarea,select':'processField',
        'click .save':'processForm'
    },
    toggleCategory:function(e){
        var target$=$(e.target),
            targetSelect$=this.$('.categoryGroup').find('select');
        if(target$.val().toLowerCase()==='category'){
            targetSelect$.attr("disabled",false);
            targetSelect$.html("");
            this.model.unset(targetSelect$.attr('name'));
        }else{
            targetSelect$.html($("<option>",{text:"NA",value:"NA"})).attr("disabled",false);
            this.model.set(targetSelect$.attr('name'), "NA", {
                validate: true
            });
        }
        this.model.set(target$.attr('name'), target$.val(), {
            validate: true
        });
    },
    toggleOptions:function(e){
        var target$=$(e.target);
        if(target$.val().toLowerCase()==='other'){
            this.$('.optionGroup').attr("disabled",true);
        }else{
            this.$('.optionGroup').attr("disabled",false);
        }
        this.model.set(target$.attr('name'), target$.val(), {
            validate: true
        });
    },
    render: function(options) {
        if(options.category){
            console.log("in the category modal rendering");
            this.$el.html(surveyDetailedModalTemplate({category:true}));
        }else{
            console.log("in regular modal rendering");
            this.$el.html(surveyDetailedModalTemplate({category:false}));
        }
        this._modelBinder.bind(this.model, this.el);
        console.log(Backbone.Validation);
        Backbone.Validation.bind(this, {
            invalid: this.showError,
            valid: this.removeError
        });
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
    },
    addCategory:function(e){
        var target$=this.$(e.target),
            targetInput$=target$.prev();
        if(this.$('input[name=questionType]:radio:checked').val().toLowerCase()==='non-category'){
            return;
        }else if($.trim(targetInput$.val())===''){
            targetInput$.css('border','1px solid #b94a48');
            return;
        }else{
            targetInput$.css('border','1px solid #ccc');
            // Add to select control
            var select$=this.$("[name=category]"),
                option$=$("<option>",{
                    text:targetInput$.val(),
                    value:targetInput$.val()
                });
            select$.append(option$);
            targetInput$.val("");
        }
    },
    toggleBorder:function(e){
        console.log("in toggle Border");
        var target$=this.$(e.target);
        console.log(target$.text());
        if($.trim(target$.val())===''){
            target$.css('border','1px solid #b94a48');
        }else{
            target$.css('border','1px solid #ccc');
        }
    },
    postData: function() {
        console.log("In the post data function");
        console.log(this.model.toJSON());
        // Events.trigger("change:wizardState",{id:100,message:"Survey details saved successfully !!"});
    }
});

});