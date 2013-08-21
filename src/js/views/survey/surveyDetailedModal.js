define(function(require) {
    var Backbone = require('backbone'),
        surveyDetailedModalTemplate = require('template!templates/survey/surveyDetailedModal'),
        newOptionTemplate = require('template!templates/survey/newOption'),
        BaseView = require('views/BaseView'),
        Events = require('events'),
        CategoryModel = require('models/survey/wizard/categoryDetails');
    /* Requires with no assignment */
    require('modelBinder');
    return BaseView.extend({
        className: "modal hide fade",
        id: "surveyDetailedModal",
        initialize: function() {
            var self = this;
            if (this.options.categoryId !== undefined) {
                $.ajax({
                    async: false,
                    url: Backbone.Model.gateWayUrl + "/getCategoryById",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        id: this.options.categoryId
                    }),
                    success: function(data, response) {
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
                        console.log(self.categoryModel);
                        self.categoryModel.fetchOptions();
                        console.log(self.categoryModel.optionsCollection.toJSON());
                        self.model.set(self.reverseOptionData(self.categoryModel.optionsCollection.toJSON()));
                    }
                });
                // fetch the options
                // attach it to the model
                // bind the model
            }
            this._modelBinder = new Backbone.ModelBinder();
        },
        events: {
            // 'click .controls a':'addNewQuestion',
            // 'change [name=questionType]':'toggleCategory',
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
        // toggleCategory:function(e){
        //     var target$=$(e.target),
        //         targetSelect$=this.$('.categoryGroup').find('select');
        //     if(target$.val().toLowerCase()==='category'){
        //         targetSelect$.attr("disabled",false);
        //         targetSelect$.html("");
        //         this.model.unset(targetSelect$.attr('name'));
        //     }else{
        //         targetSelect$.html($("<option>",{text:"NA",value:"NA"})).attr("disabled",false);
        //         this.model.set(targetSelect$.attr('name'), "NA", {
        //             validate: true
        //         });
        //     }
        //     this.model.set(target$.attr('name'), target$.val(), {
        //         validate: true
        //     });
        // },
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
            var isCategory = (options.category) ? true : false;
            this.$el.html(surveyDetailedModalTemplate({
                isCategory: isCategory,
                category: this.model.get('category')
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
                async: false,
                url: urlCategory,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(categoryPostData),
                success: function(data, response) {
                    console.log("in the success of createCategory");
                    console.log(data); //Use this category id to post options
                    if (self.options.categoryId === undefined) {
                        var postData = self.convertOptionData(self.model.toJSON(), [self.options.questionid, parseInt(data, 10)]);
                        $.ajax({
                            async: false,
                            url: urlOptions,
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
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
                    }
                },
                error: function(data) {
                    console.log("in the error of create cat");
                }
            })
            /* Create options */
        },
        updateOptions: function(options) {
            console.log("in the updateOptions");
            _.each(options, function(option) {
                $.ajax({
                    async: false,
                    url: Backbone.Model.gateWayUrl + '/updateOptions',
                    type: "POST",
                    contentType: "json; charset=utf-8",
                    data: JSON.stringify(
                        option
                    ),
                    success: function(data, response) {
                        console.log("option updated successfully");
                    }
                });
            });
        },
        deleteOption: function(option) {
            console.log("in the delete option");
            $.ajax({
                async: false,
                url: Backbone.Model.gateWayUrl + '/deleteOptions',
                type: "POST",
                contentType: "json; charset=utf-8",
                data: JSON.stringify({
                    id: option.id
                }),
                success: function(data, response) {
                    console.log("option deleted successfully");
                    console.log(response);
                }
            });
        },
        createOption: function(option) {
            var finalOption = {};
            finalOption.categoriesid = this.options.categoryId;
            finalOption.questionid = this.options.questionid;
            finalOption.options = [option];
            $.ajax({
                async: false,
                url: Backbone.Model.gateWayUrl + '/createOptions',
                type: "POST",
                contentType: "json; charset=utf-8",
                data: JSON.stringify(finalOption),
                success: function(data, response) {
                    console.log("option created successfully");
                    console.log(response);
                }
            });
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