define(['backbone','events','views/BaseView','template!templates/survey/wizard/categoryDetails','modelBinder','bootstrapAlert','jqueryCookie'],
    function(Backbone,Events,BaseView,categoryDetailsTemplate) {

    return BaseView.extend({
        el: '#categoryDetails',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
        },
        events: {
            'submit .form-horizontal': 'processForm',
            'change :input': 'processField',
            /* Category */
            'click .addCategory':'addCategory',
            'keypress [name=categoryInput]':'toggleBorder'
        },
        render: function() {
            this.$el.html(categoryDetailsTemplate({noCategory:($.cookie("isNoCategory")==="true")?true:false}));
            this.$el.addClass("active");
            this._modelBinder.bind(this.model, this.el);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError,
                forceUpdate:true
            });
            return this;
        },
        addCategory:function(e){
            var target$=this.$(e.target),
                targetInput$=target$.prev(),
                select$=this.$("[name=category]");
            if($.cookie("isNoCategory")==="true" || select$.find('option').size()===1){
                return;
            }else if($.trim(targetInput$.val())===''){
                targetInput$.css('border','1px solid #b94a48');
                return;
            }else{
                targetInput$.css('border','1px solid #ccc');
                // Add to select control
                var option$=$("<option>",{
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
            Events.trigger("change:wizardState",{id:200,message:"Category details saved successfully !!"});
        }
    });
});