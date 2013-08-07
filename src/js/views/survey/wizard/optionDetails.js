define(['backbone', 'events','views/BaseView','template!templates/survey/wizard/optionDetails','template!templates/survey/newOption','modelBinder','bootstrapAlert'],
    function(Backbone,Events,BaseView,optionDetailsTemplate,newOptionTemplate) {

    return BaseView.extend({
        el: '#optionDetails',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
        },
        events: {
            'submit .form-horizontal': 'processForm',
            'change :input': 'processField',
            'click .addOption': 'addOption',
            'click .removeOption': 'removeOption',
        },
        render: function() {
            this.$el.html(optionDetailsTemplate);
            this.$el.addClass("active");
            this._modelBinder.bind(this.model, this.el);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError,
                forceUpdate:true
            });
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
        },
        postData: function() {
            this.$('[data-name=option]').each(function(index){
                var targetParent$ = $(this).closest('.control-group')
                if($.trim($(this).val())==='') {
                    targetParent$.remove();
                }
            });
            console.log("In the post data function");
            console.log(this.model.toJSON());
            Events.trigger("change:wizardState",{id:200,message:"Option details & wizard completed successfully !!"});
        }

    });

});