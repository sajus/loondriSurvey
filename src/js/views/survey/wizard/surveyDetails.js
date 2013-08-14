define(['backbone', 'events', 'views/BaseView', 'template!templates/survey/wizard/surveyDetails', 'modelBinder', 'datePicker', 'bootstrapAlert'],
    function(Backbone, Events, BaseView, surveyDetailsTemplate) {
        return BaseView.extend({
            el: '#surveyDetails',
            initialize: function() {
                var self = this;
                this._modelBinder = new Backbone.ModelBinder();
                if (parseInt(this.getIdHashCookie()[0], 10)) {
                    $.ajax({
                        url: Backbone.Model.gateWayUrl + "/getSurveyById",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            surveyid: this.getIdHashCookie()[0]
                        }),
                        success: function(data, response) {
                            self.model.set(data);
                            console.log(data);
                        }
                    })
                    // this.model.save({url:"/getSurveyById"},{
                    //     error:function(){
                    //         console.log("in the error of fetch");
                    //     }
                    // });
                }
                console.log(this);
            },
            events: {
                'submit .form-horizontal': 'processForm',
                'change :input,blur :input': 'processField'
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
                    forceUpdate: false
                });
                return this;
            },
            postData: function() {
                console.log("In the post data function");
                var self = this,
                    url = Backbone.Model.gateWayUrl;
                url += (this.model.get('id') === undefined) ? "/createSurvey" : "/updateSurvey";
                this.model.save(this.model.toJSON(), {
                    async: false,
                    url: url,
                    success: function(model, response) {
                        console.log("response is : " + response);
                        Events.trigger("change:wizardState", {
                            id: parseInt(response, 10),
                            message: "Survey details saved successfully !!"
                        });
                    }
                });
            }
        });
    });