define(function(require) {
    var Backbone = require('backbone'),
        categoryTemplate = require('template!templates/survey/userCategory'),
        CategoryDetailModel = require('models/survey/wizard/categoryDetails'),
        CategoryModel = require('models/survey/userCategoryModel'),
        BaseView = require('views/BaseView');
        Events = require('events');
    /* Requires with no assignment */
        require('modelBinder');
        require('jqueryCookie');
    return BaseView.extend({
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
            this.model = new CategoryModel();
            this.single = false;
            this.multi = false;
            this.other = false;
            var self = this;
            console.log($.cookie('empid'));
            self.categoryDetailModel = new CategoryDetailModel();
            self.categoryDetailModel.set({
                categoriesid:  this.options.categoryId
            });
            self.categoryDetailModel.fetchOptions();
            this.optionvalue = [];
            for (var i = 0; i < self.categoryDetailModel.optionsCollection.toJSON().length; i++) {
                this.optionvalue.push(self.categoryDetailModel.optionsCollection.toJSON()[i].optionvalue);
            };
        },
        events: {
            'click .save': 'processForm',
            'blur select, change :input': 'processField'
        },
        render: function() {
            if(this.options.categoryType === "single") {
                this.single = true;
            } else if(this.options.categoryType === "multi") {
                this.multi = true;
            } else {
                this.other = true;
            }
            this.$el.html(categoryTemplate({single:this.single,
                    multi:this.multi,
                    other:this.other,
                    optionvalue: this.optionvalue
                })
            );
            this._modelBinder.bind(this.model, this.el);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError,
                forceUpdate: false
            });
            console.log(this.model);
            return this;
        },
        postData: function() {
            var selectedvalue;
            if(this.options.categoryType === "single") {
                console.log("single");
                console.log($("input[type='radio']:checked").val());
                selectedvalue = $("input[type='radio']:checked").val();
            } else if(this.options.categoryType === "multi") {
                console.log("multi");
                var checked = new Array();
                 $("input[type='checkbox']:checked").each(function() {
                    checked.push($(this).attr('value'));
                });
                console.log(checked);
                selectedvalue = checked;
            } else {
                console.log("other");
                console.log($("#focusedInput").val());
                selectedvalue = $("#focusedInput").val();
            }
            console.log($.cookie('empid'));
            var urlCategory = Backbone.Model.gateWayUrl + "/response";
            var surveyPostData = {
                selectedvalue: selectedvalue,
                empid: $.cookie('empid'),
                surveyid: this.options.surveyId,
                categoryid: this.options.categoryId,
                questionid: this.options.questionId,
                status: "incomplete"
            };
            $.ajax({
                url: urlCategory,
                data: JSON.stringify(surveyPostData),
                success: function(data, response) {
                    // console.log("in the success of createOptions");
                    Events.trigger('alert:success', [{
                        message: "success"
                    }]);
                },
                error: function(data) {
                    Events.trigger('alert:error', [{
                        message: "error"
                    }]);
                }
            })
        }
    });

});