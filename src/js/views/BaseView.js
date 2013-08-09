define(function(require){
    var Backbone = require('backbone');
    var Events = require('events');
    require('jqueryCookie');
    return Backbone.View.extend({
        processField: function(e) {
            var target$ = $(e.target),
                fieldNameAttr = target$.attr('name');
            console.log("in the process field");
            this.model.set(fieldNameAttr, target$.val(), {
                validate: true
            });
        },
        processForm: function(e) {
            e.preventDefault();
            this.$('[data-name=option]').slice(2).each(function(index){
                var targetParent$ = $(this).closest('.control-group')
                if($.trim($(this).val())==='') {
                    targetParent$.remove();
                }
            });
            if (this.model.isValid(true)) {
                this.postData();
            } else {
                Events.trigger("alert:error",[{message:"Oops!! Did not pass the validation."}]);
            }
        },
        showError:function(view, attr, error) {
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.closest(".control-group"),
                inlineSpan = targetParent$.find('.help-inline');
            if ($.trim(inlineSpan.html()) === '') {
                inlineSpan.append(error);
            } 
            targetParent$.addClass("error");
        },
        removeError :function(view, attr, error) {
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.closest(".control-group");
            targetParent$.find(".help-inline").html("");
            targetParent$.removeClass("error");
        },
        getIdHashCookie:function(){
            if($.cookie('isHash')!==undefined){
                return $.cookie('isHash').split(',');
            }else{
                return [null,null,null,null];
            }
        }
    });
});