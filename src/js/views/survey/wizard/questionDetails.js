define(['backbone', 'events', 'views/BaseView', 'template!templates/survey/wizard/questionDetails', 'modelBinder', 'bootstrapAlert'],
    function(Backbone, Events, BaseView, questionDetailsTemplate) {

        return BaseView.extend({
            el: '#questionDetails',
            initialize: function() {
                var self=this;
                this.idHash=this.getIdHashCookie();
                /* Redirect if invalid */
                if(this.idHash[0]===null){
                    Events.trigger('alert:error', [{
                        message: "Invalid operation. Please create survey before adding question."
                    }]);
                    Events.trigger("view:navigate", {
                        path: "wizard/surveyDetails",
                        options: {
                            trigger: true,
                        }
                    });
                }
                this._modelBinder = new Backbone.ModelBinder();
                if (parseInt(this.idHash[1], 10)) {
                    $.ajax({
                        url: Backbone.Model.gateWayUrl + "/getQuestionById",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            id: self.idHash[1]
                        }),
                        success: function(data, response) {
                            self.model.set(data);
                            console.log(data);
                        }
                    })
                }
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
                    forceUpdate: true
                });
                return this;
            },
            postData: function() {
                console.log("In the post data function question");
                var data = this.model.toJSON(),
                    self = this,
                    url = Backbone.Model.gateWayUrl;
                url += (this.model.get('id') === undefined) ? "/createQuestions" : "/updateQuestions";
                data.surveyid = this.idHash[0];
                this.model.save(data, {
                    async: false,
                    url: url,
                    success: function(model, response) {
                        var isNoCategory = (self.model.toJSON().questiontype.toLowerCase() === "non-category") ? true : false;
                        $.cookie("isNoCategory", isNoCategory);
                        Events.trigger("change:wizardState", {
                            id: parseInt(response, 10),
                            message: "Question details saved successfully !!"
                        });
                    }
                })

            }
        });
    });