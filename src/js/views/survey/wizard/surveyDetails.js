define(['backbone','events','views/BaseView','template!templates/survey/wizard/surveyDetails','modelBinder','datePicker','bootstrapAlert'],
    function(Backbone,Events,BaseView,surveyDetailsTemplate) {

    return BaseView.extend({
        el: '#surveyDetails',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
            console.log(this);
        },
        events: {
            'submit .form-horizontal': 'processForm',
            'change input[type=text], blur input[type=text]': 'processField'
        },
        render: function() {
            this.$el.html(surveyDetailsTemplate);
            this.$el.addClass("active");
            var self=this;
            /*Initialize the datepicker*/
            $('.date').datepicker();
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
            Events.trigger("change:wizardState",{id:100,message:"Survey details saved successfully !!"});
            // Events.trigger("alert:success",[{message:"Survey details saved successfully !!"}]);
        }
    });
});