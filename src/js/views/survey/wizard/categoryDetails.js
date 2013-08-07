define(['backbone','events','views/BaseView','template!templates/survey/wizard/categoryDetails','modelBinder','bootstrapAlert'],
    function(Backbone,Events,BaseView,categoryDetailsTemplate) {

    return BaseView.extend({
        el: '#categoryDetails',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
        },
        events: {
            'submit .form-horizontal': 'processForm',
            'change :input': 'processField'
        },
        render: function() {
            this.$el.html(categoryDetailsTemplate);
            this.$el.addClass("active");
            this._modelBinder.bind(this.model, this.el);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError,
                forceUpdate:true
            });
            return this;
        },
        postData: function() {
            console.log("In the post data function");
            console.log(this.model.toJSON());
            Events.trigger("change:wizardState",{id:200,message:"Category details saved successfully !!"});
        }
    });
});