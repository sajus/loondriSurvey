define(['backbone', 'template!templates/survey/newSurvey', 'modelValidator', 'modelBinder'], function(Backbone, newSurveyTemplate, Validator) {

    return Backbone.View.extend({
        el: '.page',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
        },
        'events': {
            'submit .form-horizontal': 'processForm',
            'blur input[type=text]':'processField'
        },
        processField:function(e){
            var target$=$(e.target),fieldNameAttr=target$.attr('name');
            this.model.set(fieldNameAttr,target$.val(),{validate:true});
        },
        processForm: function(e) {
            e.preventDefault();
            if(this.model.isValid(true)){
                this.$('.alert-success').fadeIn();
                this.$('.alert-error').hide();
                this.postData();
            }else{
                this.$('.alert-error').fadeIn();
                this.$('.alert-success').hide();
            }
        },
        render: function() {
            this.$el.html(newSurveyTemplate);
            this._modelBinder.bind(this.model, this.el);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid:this.removeError
            });
            return this;
        },
        showError:function(view, attr, error){
            var targetView$ = view.$el,
            targetSelector$=targetView$.find("[name="+attr+"]"),
            targetParent$=targetSelector$.closest(".control-group"),
            inlineSpan=targetParent$.find('.help-inline');
            if($.trim(inlineSpan.html())===''){
                inlineSpan.append(error);
            }else if(inlineSpan.html().toLowerCase()!==error.toLowerCase()){
                inlineSpan.append(", "+error);
            }
            targetParent$.addClass("error");
        },
        removeError:function(view, attr, error){
            var targetView$ = view.$el,
            targetSelector$=targetView$.find("[name="+attr+"]"),
            targetParent$=targetSelector$.closest(".control-group");
            targetParent$.find(".help-inline").html("");
            targetParent$.removeClass("error");
        },
        postData:function(){
            console.log("In the post data function");
            console.log(this.model.toJSON());
        }
    });

});