define(function(require){
    var Backbone = require('backbone');
    var Events = require('events');
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
            if (this.model.isValid(true)) {
                this.postData();
            } else {
                Events.trigger("alert:error",[{message:"Oops!! Did not pass the validation."}]);
            }
        },
        showError:function(view, attr, error) {
            console.log(error);
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.closest(".control-group"),
                inlineSpan = targetParent$.find('.help-inline');
            if ($.trim(inlineSpan.html()) === '') {
                console.log("in first error case");
                inlineSpan.append(error);
            } else if (inlineSpan.html().toLowerCase() !== error.toLowerCase()) {
                inlineSpan.append(", " + error);
                console.log("in second error case");
            }
            targetParent$.addClass("error");
        },
        removeError :function(view, attr, error) {
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.closest(".control-group");
            targetParent$.find(".help-inline").html("");
            targetParent$.removeClass("error");
        }
    });
});