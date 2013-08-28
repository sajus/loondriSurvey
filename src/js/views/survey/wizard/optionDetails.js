define(['backbone', 'services', 'events', 'views/BaseView', 'template!templates/survey/wizard/optionDetails', 'template!templates/survey/newOption', 'modelBinder', 'bootstrapAlert'],
    function(Backbone, services, Events, BaseView, optionDetailsTemplate, newOptionTemplate) {

        return BaseView.extend({
            el: '#optionDetails',
            initialize: function() {
                this.idHash = this.getIdHashCookie();
                if (this.idHash[0] === null || this.idHash[1] === null || this.idHash[2] === null) {
                    Events.trigger('alert:error', [{
                        message: "Invalid operation. Please create survey/question/category before adding options."
                    }]);
                    Events.trigger("view:navigate", {
                        path: "wizard/surveyDetails",
                        options: {
                            trigger: true,
                        }
                    });
                }
                this._modelBinder = new Backbone.ModelBinder();
            },
            events: {
                'submit .form-horizontal': 'processForm',
                'change input[type=text]': 'processField',
                'click .addOption': 'addOption',
                'click .removeOption': 'removeOption',
            },
            render: function() {
                this.$el.html(optionDetailsTemplate({
                    isCustomResponse: $.cookie("isCustomResponse") === "true" ? true : false
                }));
                this.$el.addClass("active");
                this._modelBinder.bind(this.model, this.el);
                Backbone.Validation.bind(this, {
                    invalid: this.showError,
                    valid: this.removeError,
                    forceUpdate: true
                });
                return this;
            },
            addOption: function(e) {
                e.preventDefault();
                this.$('.form-actions').before(newOptionTemplate({
                    id: this.$('[data-name=option]').size() + 1
                }));
                this._modelBinder.bind(this.model, this.el);
                console.log("in add option");
            },
            removeOption: function(e) {
                e.preventDefault();
                var target = $(e.target);
                target.closest('.control-group').remove();
                this.updateOptionSequence();
            },
            updateOptionSequence: function() {
                this.$('[data-name=option]').each(function(index) {
                    var targetParent$ = $(this).closest('.control-group'),
                        targetIndex = index + 1,
                        label = "Option" + targetIndex,
                        value = "option" + targetIndex;
                    targetParent$.find(".control-label").attr("for", value).text(label).end()
                        .find("[data-name=option]").attr({
                            id: value,
                            name: value
                        });

                });
            },
            postData: function() {
                console.log("In the post data function");
                console.log(this.model.toJSON());
                var self = this,
                    sFunction += (this.model.get('id') === undefined) ? "createOptions" : "updateOptions";
                services[sFunction](this.convertOptionData(self.model.toJSON())).then(function(data) {
                    if (data.toLowerCase() === 'success') {
                        Events.trigger("change:wizardState", {
                            id: "NA",
                            message: "Option details & wizard completed successfully !!"
                        });
                    } else {
                        Events.trigger('alert:error', [{
                            message: "Some error occured while saving options"
                        }]);
                    }
                }, function() {
                    console.error('failed to create/update options');
                });
            },
            convertOptionData: function(data) {
                var correctOptions = [],
                    returnValue = {}, optionsArray = [];
                /* Push id's */
                returnValue.questionid = this.idHash[1];
                returnValue.categoriesid = this.idHash[2];
                _.each(data, function(value, key, arr) {
                    if (value === true) {
                        correctOptions.push(parseInt(key.charAt(key.length - 1), 10));
                    }
                });
                var finalOptions = _.invert(_.omit(_.invert(data), 'true', 'false'));
                _.each(finalOptions, function(value, key, arr) {
                    if (key.indexOf('option') !== -1) {
                        var option = {};
                        option.optionvalue = value;
                        if (correctOptions.indexOf(parseInt(key.charAt(key.length - 1), 10)) !== -1) {
                            option.answer = "YES";
                        } else {
                            option.answer = "NO";
                        }
                        optionsArray.push(option);
                    }
                });
                returnValue.options = optionsArray;
                console.log(returnValue);
                return returnValue;
            }

        });

    });