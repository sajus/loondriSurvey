define(function(require) {
    var Backbone = require('backbone'),
        surveyDetailedModalTemplate = require('template!templates/survey/surveyDetailedModal'),
        newOptionTemplate = require('template!templates/survey/newOption'),
        BaseView = require('views/BaseView');
    /* Requires with no assignment */
    require('modelBinder');
    return BaseView.extend({
        className: "modal hide fade",
        id: "surveyDetailedModal",
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
            console.log(this);
        },
        events: {
            // 'click .controls a':'addNewQuestion',
            // 'change [name=questionType]':'toggleCategory',
            'change [name=responseType]': 'toggleOptions',
            'click .addOption': 'addOption',
            'click .removeOption': 'removeOption',
            /* Category */
            'click .addCategory': 'addCategory',
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
                this.model.set({
                    'option1': (this.model.get('option1').toLowerCase() !== 'na') ? this.model.get('option1') : '',
                    'option2': (this.model.get('option2').toLowerCase() !== 'na') ? this.model.get('option2') : ''
                });
                this.$('.optionGroup .controls').find(':input').attr("disabled", false);
            }
            this.model.set(target$.attr('name'), target$.val(), {
                validate: true
            });
        },
        render: function(options) {
            if (options.category) {
                console.log("in the category modal rendering");
                this.$el.html(surveyDetailedModalTemplate({
                    category: true
                }));
            } else {
                console.log("in regular modal rendering");
                this.$el.html(surveyDetailedModalTemplate({
                    category: false
                }));
            }
            this._modelBinder.bind(this.model, this.el);
            console.log(Backbone.Validation);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });
            return this;
        },
        addOption: function(e) {
            e.preventDefault();
            this.$('.form-horizontal').append(newOptionTemplate({
                id: this.$('[data-name=option]').size() + 1
            }));
            this._modelBinder.bind(this.model, this.el);
            console.log("in add option");
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
            var self = this;
            /* Create category */
            $.ajax({
                async: false,
                url: Backbone.Model.gateWayUrl + "/createCategory",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    questionid: self.options.questionid,
                    categoryname: self.model.get('category'),
                    categorytype: self.model.get('responseType')
                }),
                success: function(data, response) {
                    console.log("in the success of createCategory");
                    console.log(data); //Use this category id to post options
                    var postData = self.convertOptionData(self.model.toJSON(), [self.options.questionid, parseInt(data, 10)]);
                    $.ajax({
                        async: false,
                        url: Backbone.Model.gateWayUrl + "/createOptions",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(postData),
                        success: function(data, response) {
                            console.log("in the success of createOptions");
                            console.log(response);
                        },
                        error: function(data) {
                            console.log("in the error of create cat");
                        }
                    })
                },
                error: function(data) {
                    console.log("in the error of create cat");
                }
            })
            /* Create options */
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
        }
    });

});