define(function(require) {
    var Backbone = require('backbone'),
        questionDetailsTemplate = require('template!templates/survey/questionDetailedModal'),
        questionDeleteModalTemplate = require('template!templates/survey/questionDeleteModal'),
        BaseView = require('views/BaseView'),
        Events = require('events');
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
                $.ajax({
                    async: false,
                    url: Backbone.Model.gateWayUrl + '/updateQuestions',
                    type: "POST",
                    contentType: "json; charset=utf-8",
                    data: JSON.stringify(data),
                    success: function(data, response) {
                        if (parseInt(data, 10)) {
                            console.log("question updated successfully");
                            console.log(response);
                            $('#surveyDetailedModal').modal('hide');
                            Events.trigger("categoriesChanged");
                        }
                    }
                });
            }
        },
        deleteQuestion: function(e) {
            e.preventDefault();
            console.log("in the delete question mode.");
            $.ajax({
                async: false,
                url: Backbone.Model.gateWayUrl + '/deleteQuestions',
                type: "POST",
                contentType: "json; charset=utf-8",
                data: JSON.stringify({
                    id:this.model.toJSON().questionid
                }),
                success: function(data, response) {
                    if (response==='success') {
                        console.log("question deleted successfully");
                        console.log(response);
                        $('#surveyDetailedModal').modal('hide');
                        Events.trigger("questionRemoved");
                    }
                }
            });
        },
        cancelModalAction:function(e){
            e.preventDefault();
            $('#surveyDetailedModal').modal('hide');
        }
    });

});