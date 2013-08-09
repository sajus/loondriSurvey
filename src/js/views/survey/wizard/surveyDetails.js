define(['backbone', 'events', 'views/BaseView', 'template!templates/survey/wizard/surveyDetails', 'modelBinder', 'datePicker', 'bootstrapAlert'],
    function(Backbone, Events, BaseView, surveyDetailsTemplate) {
    return BaseView.extend({
        el: '#surveyDetails',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
            console.log(this);
        },
        events: {
            'submit .form-horizontal': 'processForm',
            'change :input': 'processField'
        },
        render: function() {
            this.$el.html(surveyDetailsTemplate);
            this.$el.addClass("active");
            var self = this;
            /*Initialize the datepicker*/
            var nowTemp = new Date(),
                now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            $('.date').datepicker({
                onRender: function(date) {
                    console.log("in on render");
                    return date.valueOf() < now.valueOf() ? 'disabled' : '';
                }
            });
            this._modelBinder.bind(this.model, this.el);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError,
                forceUpdate: true
            });
            return this;
        },
        postData: function() {
            console.log("In the post data function");
            var self = this;
            this.model.save(this.model.toJSON(),{
                async:false,
                success:function(model, response,options){
                    console.log("response is : " + response);
                    Events.trigger("change:wizardState", {
                        id: parseInt(response,10),
                        message: "Survey details saved successfully !!"
                    });
                }
            });
        }
    });
});