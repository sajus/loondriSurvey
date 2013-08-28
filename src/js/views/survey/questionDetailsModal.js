define(function(require) {
    var Backbone = require('backbone'),
        questionDetailsTemplate = require('template!templates/survey/questionDetailedModal'),
        questionDeleteModalTemplate = require('template!templates/survey/questionDeleteModal'),
        BaseView = require('views/BaseView'),
        Events = require('events'),
        services = require('services');
    /* Requires with no assignment */
    require('modelBinder');
    return BaseView.extend({
        className: "modal hide fade",
        id: "surveyDetailedModal",
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
        },
        events: {
            'click .save': 'processForm',
            'click .deleteConfirm': 'deleteQuestion',
            'click .cancel': 'cancelModalAction'
        },
        render: function() {
            if (this.options.isDeleteMode) {
                this.$el.html(questionDeleteModalTemplate);
            } else {
                this.$el.html(questionDetailsTemplate);
            }
            this.originalType = this.model.get('questiontype');
            this._modelBinder.bind(this.model, this.el);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });
            return this;
        },
        postData: function() {
            if (this.originalType !== this.model.get('questiontype')) {
                Events.trigger('alert:error', [{
                    message: "This will wipe out the existing categories if any hence restricted."
                }]);
            } else {
                var id = this.model.get('questionid');
                var data = this.model.toJSON();
                data.id = id;
                delete data.questionid;
                services.updateQuestions(data).then(function(data) {
                    if (parseInt(data, 10)) {
                        $('#surveyDetailedModal').modal('hide');
                        Events.trigger("categoriesChanged");
                    }
                }, function() {
                    console.error('failed to update question');
                });
            }
        },
        deleteQuestion: function(e) {
            e.preventDefault();
            var qid=this.model.toJSON().questionid;
            console.log("in the delete question mode.");
            services.deleteQuestions({
                id: qid
            }).then(function(data, responseText) {
                if (responseText === 'success') {
                    $('#surveyDetailedModal').modal('hide');
                    Events.trigger("questionRemoved",qid);
                }
            }, function() {
                console.error('failed to delete question');
            });
        },
        cancelModalAction: function(e) {
            e.preventDefault();
            $('#surveyDetailedModal').modal('hide');
        }
    });

});