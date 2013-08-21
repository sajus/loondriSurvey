define(['backbone', 'events', 'views/BaseView', 'template!templates/survey/wizard/categoryDetails', 'modelBinder', 'bootstrapAlert', 'jqueryCookie'],
    function(Backbone, Events, BaseView, categoryDetailsTemplate) {

        return BaseView.extend({
            el: '#categoryDetails',
            initialize: function() {
                this.idHash = this.getIdHashCookie();
                /* Redirect if invalid */
                if (this.idHash[0] === null || this.idHash[1] === null) {
                    Events.trigger('alert:error', [{
                        message: "Invalid operation. Please create survey/question before adding categories."
                    }]);
                    Events.trigger("view:navigate", {
                        path: "wizard/surveyDetails",
                        options: {
                            trigger: true,
                        }
                    });
                }
                console.log(this.idHash);
                var self = this;
                this._modelBinder = new Backbone.ModelBinder();
                if (parseInt(this.idHash[2], 10)) {
                    $.ajax({
                        async: false,
                        url: Backbone.Model.gateWayUrl + "/getCategoryById",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            id: self.idHash[2]
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
                'change :input': 'processField',
                /* Category */
                'click .addCategory': 'addCategory',
                'click .updateCategory': 'updateCategory',
                'keypress [name=categoryInput]': 'toggleBorder',
                'click option': 'updateOption'
            },
            render: function() {
                var noCategory = ($.cookie("isNoCategory") === "true") ? true : false;
                this.$el.html(categoryDetailsTemplate({
                    noCategory: noCategory,
                    category: this.model.get('categoryname')
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
            addDisabledOption: function(categoryName) {
                if (categoryName === undefined) {
                    return;
                };
                var select$ = this.$("[name=categoryname]");
                var option$ = $("<option>", {
                    text: categoryName,
                    value: categoryName,
                    disabled: "disabled",
                    selected: "true"
                });
                select$.html(option$);
            },
            removeDisabledOption: function(categoryName) {
                if (categoryName === undefined) {
                    return;
                };
                var select$ = this.$("[name=categoryname]");
                select$.html("");
                this.model.unset("categoryname");
            },
            addCategory: function(e) {
                var target$ = this.$(e.target),
                    targetInput$ = target$.prev(),
                    select$ = this.$("[name=categoryname]");
                if ($.cookie("isNoCategory") === "true" || select$.find('option').size() === 1) {
                    return;
                } else if ($.trim(targetInput$.val()) === '') {
                    targetInput$.css('border', '1px solid #b94a48');
                    return;
                } else {
                    targetInput$.css('border', '1px solid #ccc');
                    // Add to select control
                    var option$ = $("<option>", {
                        text: targetInput$.val(),
                        value: targetInput$.val()
                    });
                    select$.append(option$);
                    targetInput$.val("");
                }
            },
            updateOption: function(e) {
                console.log("in the updateOption");
                var target$ = this.$(e.target),
                    content = "<i class=icon-pencil></i> Update Category";
                this.$('[name=categoryInput]').val(target$.val());
                this.$('.add-on').removeClass("addCategory").addClass("updateCategory").html(content);
            },
            updateCategory: function(e) {
                var target$ = this.$(e.target),
                    targetInput$ = target$.prev(),
                    select$ = this.$("[name=categoryname]");
                if ($.cookie("isNoCategory") === "true") {
                    return;
                } else if ($.trim(targetInput$.val()) === '') {
                    targetInput$.css('border', '1px solid #b94a48');
                    return;
                } else {
                    targetInput$.css('border', '1px solid #ccc');
                    // Add to select control
                    var option$ = $("<option>", {
                        text: targetInput$.val(),
                        value: targetInput$.val(),
                        selected: true
                    });
                    select$.html(option$);
                    this.model.set('categoryname', targetInput$.val());
                }
            },
            toggleBorder: function(e) {
                console.log("in toggle Border");
                var target$ = this.$(e.target);
                console.log(target$.text());
                if ($.trim(target$.val()) === '') {
                    target$.css('border', '1px solid #b94a48');
                } else {
                    target$.css('border', '1px solid #ccc');
                }
            },
            postData: function() {
                console.log("In the post data function");
                this.model.unset('categoryInput');
                var data = this.model.toJSON(),
                    self = this,
                    url = Backbone.Model.gateWayUrl;
                url += (this.model.get('id') === undefined) ? "/createCategory" : "/updateCategory";
                data.questionid = this.idHash[1];
                this.model.save(data, {
                    async: false,
                    url: url,
                    success: function(model, response) {
                        var isCustomResponse = (self.model.toJSON().categorytype.toLowerCase() === "other") ? true : false;
                        $.cookie("isCustomResponse", isCustomResponse);
                        Events.trigger("change:wizardState", {
                            id: parseInt(response, 10),
                            message: "Category details saved successfully !!"
                        });
                    }
                });
            }
        });
    });