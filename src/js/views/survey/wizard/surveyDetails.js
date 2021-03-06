define(['backbone', 'services', 'events', 'views/BaseView', 'template!templates/survey/wizard/surveyDetails', 'modelBinder', 'datePicker', 'bootstrapAlert'],
    function(Backbone, services, Events, BaseView, surveyDetailsTemplate) {
        return BaseView.extend({
            el: '#surveyDetails',
            initialize: function() {
                var self = this;
                this._modelBinder = new Backbone.ModelBinder();
                if (parseInt(this.getIdHashCookie()[0], 10)) {
                    services.getSurveyById({
                        id: this.getIdHashCookie()[0]
                    }).then(function(data) {
                        self.model.set(data);
                    }, function() {
                        console.error('failed to get SurveyById');
                    });
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
                'change :input,blur :input': 'processField',
                'keypress #startdate,#enddate': 'preventAction'
            },
            preventAction: function(e) {
                e.preventDefault();
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
                console.log("In the post data function survey");
                var self = this,
                    url = Backbone.Model.gateWayUrl;
                url += (this.model.get('id') === undefined) ? "/createSurvey" : "/updateSurvey";
                console.log("url: " + url);
                console.log(this.formatDate(this.model.toJSON()));
                this.model.save(this.formatDate(this.model.toJSON()), {
                    async: false,
                    url: url,
                    success: function(model, response, options) {
                        console.log("response is : " + response);
                        Events.trigger("change:wizardState", {
                            id: parseInt(response, 10),
                            message: "Survey details saved successfully !!"
                        });
                    }
                });
            },
            formatDate: function(modelData) {
                if (modelData.startdate.indexOf("00:00:00") === -1) {
                    modelData.startdate += " 00:00:00";
                    modelData.enddate += " 00:00:00";
                }
                return modelData;
            }
        });
    });