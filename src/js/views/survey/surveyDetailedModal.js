define(function(require) {
    var Backbone = require('backbone'),
        surveyDetailedModalTemplate = require('template!templates/survey/surveyDetailedModal'),
        newOptionTemplate = require('template!templates/survey/newOption'),
        BaseView = require('views/BaseView'),
        Events = require('events'),
        CategoryModel = require('models/survey/wizard/categoryDetails'),
        services = require('services');
    /* Requires with no assignment */
    require('modelBinder');
    return BaseView.extend({
        className: "modal hide fade",
        id: "surveyDetailedModal",
        initialize: function() {
            var self = this;
            console.log(services);
            if (this.options.categoryId !== undefined) {
                /* Service call getCategoryById */
                services.getCategoryById({
                    id: this.options.categoryId
                }).then(function(data) {
                    self.model.set({
                        category: data.categoryname,
                        responseType: data.categorytype
                    });
                    self.model.set('categoryInput', data.categoryname);
                    /* Fetch options for the category */
                    self.categoryModel = new CategoryModel();
                    self.categoryModel.set({
                        categoriesid: self.options.categoryId,
                        categorytype: data.categorytype
                    });
                    self.categoryModel.fetchOptions();
                    self.model.set(self.reverseOptionData(self.categoryModel.optionsCollection.toJSON()));
                }, function() {
                    console.error('failed to get category by id');
                });
            }
            this._modelBinder = new Backbone.ModelBinder();
        },
        events: {
            // 'click .controls a':'addNewQuestion',
            'change [name=questionType]': 'toggleCategory',
            'change [name=responseType]': 'toggleOptions',
            'click .addOption': 'addOption',
            'click .removeOption': 'removeOption',
            /* Category */
            'click .addCategory': 'addCategory',
            'click .updateCategory': 'updateCategory',
            'keypress [name=categoryInput]': 'toggleBorder',
            /* Save */
            'change input[type=text],textarea,select': 'processField',
            'click .save': 'processForm'
        },
        toggleCategory: function(e) {
            var target$ = $(e.target),
                targetSelect$ = this.$('.categoryGroup').find('select');
            if (target$.val().toLowerCase() === 'category') {
                targetSelect$.attr("disabled", false);
                targetSelect$.html("");
                this.model.unset(targetSelect$.attr('name'));
            } else {
                targetSelect$.html($("<option>", {
                    text: "NA",
                    value: "NA"
                })).attr("disabled", false);
                this.model.set(targetSelect$.attr('name'), "NA", {
                    validate: true
                });
            }
            this.model.set(target$.attr('name'), target$.val(), {
                validate: true
            });
        },
        toggleOptions: function(e) {
            var target$ = $(e.target);
            if (target$.val().toLowerCase() === 'other') {
                this.$('.optionGroup .controls').find(':input').attr("disabled", true);
                this.model.set({
                    'option1': 'NA',
                    'option2': 'NA'
                });
            } else {
                try {
                    this.model.set({
                        'option1': (this.model.get('option1').toLowerCase() !== 'na') ? this.model.get('option1') : '',
                        'option2': (this.model.get('option2').toLowerCase() !== 'na') ? this.model.get('option2') : ''
                    });
                } catch (e) {
                    console.log(e);
                }
                this.$('.optionGroup .controls').find(':input').attr("disabled", false);
            }
            this.model.set(target$.attr('name'), target$.val(), {
                validate: true
            });
        },
        render: function(options) {
            this.isCategory = (options.category) ? true : false,
            this.isNA = this.model.get('category') === 'NA';
            this.$el.html(surveyDetailedModalTemplate({
                isCategory: this.isCategory,
                category: this.model.get('category'),
                isNA: this.isNA
            }));
            if (this.options.categoryId !== undefined) {
                for (var i = 0, l = this.categoryModel.optionsCollection.toJSON().length - 2; i < l; i++) {
                    this.addNewOption();
                }
            }
            this._modelBinder.bind(this.model, this.el);
            console.log(Backbone.Validation);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });
            return this;
        },
        addNewOption: function() {
            this.$('.form-horizontal').append(newOptionTemplate({
                id: this.$('[data-name=option]').size() + 1
            }));
            this._modelBinder.bind(this.model, this.el);
        },
        addOption: function(e) {
            e.preventDefault();
            this.addNewOption();
        },
        removeOption: function(e) {
            e.preventDefault();
            var target$ = $(e.target),
                targetOption = target$.closest('.controls').find('[data-name=option]').attr('name');

            /* Unset the deleted options for zombie issues */
            this.model.unset(targetOption);
            this.model.unset("answer" + targetOption.charAt(targetOption.length - 1));

            target$.closest('.control-group').remove();
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
        addCategory: function(e) {
            var target$ = this.$(e.target),
                targetInput$ = target$.prev(),
                select$ = this.$("[name=category]");
            if (select$.find('option').size() === 1) {
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
                    selected: 'selected'
                });
                select$.append(option$);
                this.model.set('category', targetInput$.val(), {
                    validate: true
                });
                targetInput$.val("");
            }
        },
        updateCategory: function(e) {
            var target$ = this.$(e.target),
                targetInput$ = target$.prev(),
                select$ = this.$("[name=category]");
            if ($.trim(targetInput$.val()) === '') {
                targetInput$.css('border', '1px solid #b94a48');
                return;
            } else {
                targetInput$.css('border', '1px solid #ccc');
                // Add to select control
                var option$ = $("<option>", {
                    text: targetInput$.val(),
                    value: targetInput$.val(),
                    selected: 'selected'
                });
                select$.html(option$);
                this.model.set('category', targetInput$.val(), {
                    validate: true
                });
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
            console.log("In the post data function changes");
            console.log(this.model.toJSON());
            console.log(this.options);
            if (!this.isCategory) {
                console.log("this is where to add new question");
                this.postNewQuestion();
            } else {
                var self = this,
                    urlCategory = (this.options.categoryId !== undefined) ? Backbone.Model.gateWayUrl + "/updateCategory" : Backbone.Model.gateWayUrl + "/createCategory",
                    urlOptions = Backbone.Model.gateWayUrl + "/createOptions",
                    categoryPostData = {
                        questionid: self.options.questionid,
                        categoryname: self.model.get('category'),
                        categorytype: self.model.get('responseType'),
                    };
                if (this.options.categoryId !== undefined) {
                    categoryPostData.id = this.options.categoryId;
                }
                /* Create/Update category */
                // categoriesid
                $.ajax({
                    url: urlCategory,
                    data: JSON.stringify(categoryPostData),
                    success: function(data, response) {
                        console.log("in the success of createCategory");
                        console.log(data); //Use this category id to post options
                        if (self.options.categoryId === undefined) {
                            var postData = self.convertOptionData(self.model.toJSON(), [self.options.questionid, parseInt(data, 10)]);
                            $.ajax({
                                url: urlOptions,
                                data: JSON.stringify(postData),
                                success: function(data, response) {
                                    console.log("in the success of createOptions");
                                    if (response === 'success') {
                                        $('#surveyDetailedModal').modal('hide');
                                        Events.trigger("categoriesChanged");
                                    } else {
                                        Events.trigger('alert:error', [{
                                            message: "Error occured while creating options."
                                        }]);
                                    }
                                },
                                error: function(data) {
                                    console.log("in the error of create cat");
                                }
                            })
                        } else {
                            /* Merge the options (update/delete options) */
                            var collection = self.categoryModel.optionsCollection,
                                collectionJSON = collection.toJSON(),
                                collectionLength = collection.toJSON().length,
                                optionsObject = self.convertOptionData(self.model.toJSON(), [self.options.questionid, parseInt(data, 10)]),
                                optionsHash = optionsObject.options,
                                optionsHashLength = optionsHash.length,
                                objArr = [],
                                index = 0;
                            console.log("in the merging of options");
                            console.log(collectionLength);
                            console.log(optionsHashLength);
                            if (optionsHashLength >= collectionLength) {
                                _.each(collectionJSON, function(originalOption, key) {
                                    // console.log(originalOption);
                                    var obj = _.extend({}, originalOption, optionsHash[key]);
                                    if (optionsHash[key].answer !== originalOption.answer ||
                                        optionsHash[key].optionvalue !== originalOption.optionvalue) {
                                        objArr.push(obj);
                                    }
                                    index++;
                                });
                                // updateOptions
                                self.updateOptions(objArr);
                                // Create rest options
                                if (optionsHash[index] !== undefined) {
                                    for (; index < optionsHashLength; index++) {
                                        // Create the option
                                        self.createOption(optionsHash[index]);
                                    }
                                }
                            } else if (optionsHashLength < collectionLength) {
                                _.each(optionsHash, function(originalOption, key) {
                                    // console.log(originalOption);
                                    var obj = _.extend({}, collectionJSON[key], originalOption);
                                    if (collectionJSON[key].answer !== originalOption.answer ||
                                        collectionJSON[key].optionvalue !== originalOption.optionvalue) {
                                        objArr.push(obj);
                                    }
                                    index++;
                                });
                                // Update options
                                self.updateOptions(objArr);
                                //delete rest
                                if (collectionJSON[index] !== undefined) {
                                    for (; index < collectionLength; index++) {
                                        // Delete the option
                                        self.deleteOption(collectionJSON[index]);
                                    }
                                }
                            }
                            $('#surveyDetailedModal').modal('hide');
                            Events.trigger("categoriesChanged");
                        }
                    },
                    error: function(data) {
                        console.log("in the error of create cat");
                    }
                })
                /* Create options */
            }
        },
        postNewQuestion: function() {
            var data = this.model.toJSON(),
                self = this;
            /* Service call :  createQuestions */
            services.createQuestions({
                questionvalue: data.question,
                questiontype: data.questionType,
                surveyid: this.options.surveyId
            }).then(function(data) {
                if (parseInt(data, 10)) {
                    self.postNewCategory(parseInt(data, 10));
                }
            }, function() {
                console.error('failed to create question');
            });
        },
        postNewCategory: function(questionid) {
            var data = this.model.toJSON(),
                self = this;
            /* Service call: createCategory */
            services.createCategory({
                categoryname: data.category,
                categorytype: data.responseType,
                questionid: questionid
            }).then(function(data) {
                if (parseInt(data, 10)) {
                    self.postNewOptions(questionid, parseInt(data, 10));
                } else {
                    console.error('error');
                }
            }, function() {
                console.error('failed to create category');
            });
        },
        postNewOptions: function(questionid, categoryid) {
            var data = this.model.toJSON(),
                self = this;
            /* Service call: createOption */
            services.createOptions(this.convertOptionData(data, [questionid, categoryid])).then(
                function(data, responseText) {
                    if (responseText === 'success') {
                        $('#surveyDetailedModal').modal('hide');
                        self.addQuestionToView(questionid);
                    }
                }, function() {
                    console.error('failed to create category');
                });
        },
        addQuestionToView: function(questionid) {
            /* Service call :  createQuestions */
            services.getQuestionById({
                id: questionid
            }).then(function(data) {
                QuestionModel = require('models/survey/wizard/questionDetails');
                Events.trigger("addQuestion", new QuestionModel(data));
            }, function() {
                console.error('failed to get questionById');
            });
        },
        updateOptions: function(options) {
            /* Service call :  updateOptions */
            _.each(options, function(option) {
                services.updateOptions(option).then(
                    function(data, responseText) {
                        if (responseText === 'success') {
                            console.log("option updated successfully");
                        }
                    }, function() {
                        console.error('failed to update option');
                    });
            });
        },
        deleteOption: function(option) {
            services.deleteOptions({
                id: option.id
            }).then(
                function(data, responseText) {
                    if (responseText === 'success') {
                        console.log("option deleted successfully");
                    }
                }, function() {
                    console.error('failed to delete option');
                }
            );
        },
        createOption: function(option) {
            var finalOption = {};
            finalOption.categoriesid = this.options.categoryId;
            finalOption.questionid = this.options.questionid;
            finalOption.options = [option];
            services.createOptions(finalOption).then(
                function(data, responseText) {
                    if (parseInt(data, 10)) {
                        console.log("option created successfully");
                    }
                }, function() {
                    console.error('failed to created option');
                }
            );
        },
        convertOptionData: function(data, idHash) {
            var correctOptions = [],
                returnValue = {}, optionsArray = [];
            /* Push id's */
            returnValue.questionid = idHash[0];
            returnValue.categoriesid = idHash[1];
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
        },
        reverseOptionData: function(data) {
            var options = {};
            _.each(data, function(value, key) {
                options['option' + (key + 1)] = value.optionvalue;
                if (value.answer.toLowerCase() === "yes") {
                    options['answer' + (key + 1)] = true;
                }
            })
            return options;
        }
    });

});