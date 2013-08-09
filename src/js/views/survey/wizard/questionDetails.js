define(['backbone','events','views/BaseView','template!templates/survey/wizard/questionDetails','modelBinder','bootstrapAlert'],
    function(Backbone,Events,BaseView,questionDetailsTemplate) {

    return BaseView.extend({
        el: '#questionDetails',
        initialize: function() {
            console.log("in questionDetails");
            this._modelBinder = new Backbone.ModelBinder();
            this.idHash = this.getIdHashCookie();
        },
        events: {
            'submit .form-horizontal': 'processForm',
            'change :input': 'processField'
        },
        render: function() {
            this.$el.html(questionDetailsTemplate);
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
            console.log("Survey ID is");
            console.log(this.idHash[0]);
            console.log(this.model.toJSON());
            var qType=(this.model.toJSON().questionType!==undefined)?this.model.toJSON().questionType:"category";
            $.cookie("qType",qType);
            Events.trigger("change:wizardState",{id:101,message:"Question details saved successfully !!"});
        }
    });
});