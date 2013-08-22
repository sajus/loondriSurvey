define(function(require) {
    var Backbone = require('backbone'),
        newSurveyTemplate = require('template!templates/survey/newSurvey'),
        Validator = require('modelValidator'),
        Router = require('router'),
        Events = require('events');
    /* Requires with no assignment */
    require('modelBinder');
    require('fueluxWizard');
    require('jqueryCookie');
    return Backbone.View.extend({
        el: '.page',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
            this.wizardStates = [false, false, false, false];
            this.idHash = this.getIdHashCookie();
            console.log(this.idHash);
            Events.on("change:wizardState", this.changeWizardState, this);
        },
        events: {
            /* Wizard events */
            'change #surveyWizard': 'beforeStepChange',
            'changed #surveyWizard': 'afterStepChange',
            'stepclick #surveyWizard': 'preventAction',
            'finished #surveyWizard': 'finishWizard'
        },
        preventAction: function(e) {
            e.preventDefault();
        },
        beforeStepChange: function(e) {
            var target$ = this.$(e.target),
                selectedStep = target$.wizard('selectedItem').step - 1;
            console.log(selectedStep);
            console.log(this.wizardStates[selectedStep]);
            console.log(this.successMessage);
            if (!this.isValidForNext(selectedStep)) {
                e.preventDefault();
                console.log("Not good to go ahead");
                Events.trigger('alert:error', [{
                    message: "Please complete current step to go ahead"
                }]);
            } else {
                Events.trigger('alert:success', [{
                    message: this.successMessage
                }]);
            }
        },
        finishWizard: function(e) {
            var target$ = this.$(e.target),
                selectedStep = target$.wizard('selectedItem').step - 1;
            if (!this.isValidForNext(selectedStep)) {
                e.preventDefault();
                Events.trigger('alert:error', [{
                    message: "Please complete current step to finish wizard"
                }]);
            } else {
                /* Remove cookies create while using wizard */
                this.unsetIdHashCookies();
                $.removeCookie('isCustomResponse');
                $.removeCookie('isNoCategory');

                console.log(this.getIdHashCookie());
                Events.trigger('alert:success', [{
                    message: this.successMessage
                }]);
                Events.trigger("view:navigate", {
                    path: "listSurvey",
                    options: {
                        trigger: true,
                    }
                });
            }
        },
        isValidForNext: function(selectedStep) {
            console.log(this.wizardStates[selectedStep]);
            console.log(this.idHash[selectedStep]);
            return this.wizardStates[selectedStep] && this.idHash[selectedStep] !== null;
        },
        afterStepChange: function(e) {
            var target$ = this.$(e.target),
                targetURL = target$.find('.active').data("target"),
                index = target$.wizard('selectedItem').step - 2;

            Events.trigger("view:navigate", {
                path: "wizard/" + targetURL.slice(1),
                options: {
                    trigger: true,
                }
            });
        },
        changeWizardState: function(options) {
            console.log("in change wizard state");
            console.log(options);
            var wizard$ = this.$("#surveyWizard"),
                index = wizard$.wizard('selectedItem').step - 1;
            this.idHash[index] = options.id;
            this.wizardStates[index] = true;
            this.setIdHashCookies(this.idHash.toString());
            this.successMessage = options.message;
            console.log(this.wizardStates);
            console.log(this.idHash);
            wizard$.wizard('next');
        },
        render: function() {
            this.$el.html(newSurveyTemplate);
            /* ==========================================================================
               =Load Subview
               ========================================================================== */
            this.getSubView(this.options.step.toLowerCase()).render();
            this.$el.find('[data-target=#' + this.options.step + ']').addClass('active').find('.badge').addClass('badge-info').end()
                .prevAll().addClass('complete').find('.badge').addClass('badge-success');


            this._modelBinder.bind(this.model, this.el);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });
            return this;
        },
        getSubView: function(step) {
            var SubView, subView, Model, targetModel;
            switch (step) {
                case "surveydetails":
                    SubView = require('views/survey/wizard/surveyDetails'),
                    Model = require('models/survey/wizard/surveyDetails'),
                    targetModel = new Model();
                    subView = new SubView({
                        model: targetModel
                    });
                    break;
                case "questiondetails":
                    SubView = require('views/survey/wizard/questionDetails'),
                    Model = require('models/survey/wizard/questionDetails'),
                    targetModel = new Model();
                    subView = new SubView({
                        model: targetModel
                    });
                    break;
                case "categorydetails":
                    SubView = require('views/survey/wizard/categoryDetails'),
                    Model = require('models/survey/wizard/categoryDetails'),
                    targetModel = new Model();
                    console.log(this.questionType);
                    subView = new SubView({
                        model: targetModel
                    });
                    break;
                case "optiondetails":
                    SubView = require('views/survey/wizard/optionDetails'),
                    Model = require('models/survey/wizard/optionDetails'),
                    targetModel = new Model();
                    subView = new SubView({
                        model: targetModel
                    });
                    break;
                default:
                    console.log("Something went wrong in getSubView");
            }
            return subView;
        },
        showError: function(view, attr, error) {
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.closest(".control-group"),
                inlineSpan = targetParent$.find('.help-inline');
            if ($.trim(inlineSpan.html()) === '') {
                inlineSpan.append(error);
            } else if (inlineSpan.html().toLowerCase() !== error.toLowerCase()) {
                inlineSpan.append(", " + error);
            }
            targetParent$.addClass("error");
        },
        removeError: function(view, attr, error) {
            var targetView$ = view.$el,
                targetSelector$ = targetView$.find("[name=" + attr + "]"),
                targetParent$ = targetSelector$.closest(".control-group");
            targetParent$.find(".help-inline").html("");
            targetParent$.removeClass("error");
        },
        // postData: function() {
        //     console.log("In the post data function");
        //     console.log(this.model.toJSON());
        // },
        setIdHashCookies: function(idHashStr) {
            $.cookie('isHash', idHashStr)
        },
        getIdHashCookie: function() {
            if ($.cookie('isHash') !== undefined) {
                return $.cookie('isHash').split(',');
            } else {
                return [null, null, null, null];
            }
        },
        unsetIdHashCookies: function() {
            $.removeCookie('isHash');
        }
    });

});