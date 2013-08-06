define(['backbone', 'template!templates/survey/wizard/surveyDetails','modelBinder','datePicker','bootstrapAlert'],
    function(Backbone, surveyDetailsTemplate) {

    return Backbone.View.extend({
        el: '#surveyDetails',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
            console.log(this);
        },
        events: {
            'submit .form-horizontal': 'processForm',
            'change input[type=text], blur input[type=text]': 'processField',
        },
        processField: function(e) {
            var target$ = $(e.target),
                fieldNameAttr = target$.attr('name');
            this.model.set(fieldNameAttr, target$.val(), {
                validate: true
            });
        },
        processForm: function(e) {
            e.preventDefault();
            if (this.model.isValid(true)) {
                this.postData();
            } else {
                // Error case
            }
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
        showError: function(view, attr, error) {
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.closest(".control-group"),
                inlineSpan = targetParent$.find('.help-inline');
            if ($.trim(inlineSpan.html()) === '') {
                inlineSpan.append(error);
            } else if (inlineSpan.html().toLowerCase() !== error.toLowerCase()) {
                inlineSpan.append(", " + error);
            }
            targetParent$.addClass("error");
        },
        removeError: function(view, attr, error) {
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.closest(".control-group");
            targetParent$.find(".help-inline").html("");
            targetParent$.removeClass("error");
        },
        postData: function() {
            console.log("In the post data function");
            console.log(this.model.toJSON());
        }
    });
});