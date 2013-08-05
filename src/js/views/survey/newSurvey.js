define(['backbone', 'template!templates/survey/newSurvey','template!templates/survey/newOption', 'modelValidator', 'modelBinder','bootstrapAlert','datePicker'],
    function(Backbone, newSurveyTemplate,newOptionTemplate, Validator) {

    return Backbone.View.extend({
        el: '.page',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
        },
        'events': {
            'submit .form-horizontal': 'processForm',
            'blur input[type=text]':'processField',
            'click .addOption':'addOption',
            'click .removeOption':'removeOption',
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
            // Initialize the datepicker
            $('.date').datepicker();
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
        addOption:function(e){
            e.preventDefault();
            this.$('.form-actions').before(newOptionTemplate({id:this.$('[data-name=option]').size()+1}));
            console.log("in add option");
        },
        removeOption:function(e){
            e.preventDefault();
            var target = $(e.target);
            target.closest('.control-group').remove();
            this.updateOptionSequence();
        },
        updateOptionSequence:function(){
            this.$('[data-name=option]').each(function(index){
                var targetParent$=$(this).closest('.control-group'),
                    targetIndex=index+1,
                    label="Option"+targetIndex,
                    value="option"+targetIndex;
                targetParent$.find(".control-label").attr("for",value).text(label).end()
                    .find("[data-name=option]").attr({id:value,name:value});

            });
        },
        postData:function(){
            console.log("In the post data function");
            console.log(this.model.toJSON());
        }
    });

});