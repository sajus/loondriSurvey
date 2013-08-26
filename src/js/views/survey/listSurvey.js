define(['backbone', 'template!templates/survey/listSurvey', 'template!templates/survey/deleteSurveyModal', 'fueluxDataSource', 'events', 'fueluxDataGrid', 'bootstrapDropdown', 'fueluxComboBox', 'fueluxSelectBox', 'fueluxSearchBox', 'moment'],
    function(Backbone, listSurveyTemplate, deleteSurveyModalTemplate, FuelUxDataSource, Events) {
        var globalSelected = [];
        return Backbone.View.extend({
            el: '.page',

            initialize: function() {
                var accessLevel = $.cookie('accesslevel');
                if (accessLevel === "admin" || accessLevel === "super admin") {
                    this.isAdmin = true;
                } else if (accessLevel === "user" || !accessLevel) {
                    this.isAdmin = false;
                }
            },

            events: {
                "click .surveyEdit": "surveyDetail",
                'change #selectUsersAtOnce': 'gridCheckBox',
                'loaded #MyGrid': 'gridCheckBox',
                'click .selectrows': 'rowSelected',
                'mouseover .surveyDelete': 'rowSelectedDelete',
                'mouseout .surveyDelete': 'rowSelectedNotDelete',
                'click .surveyDelete': 'surveyDelete',
                'click .confirmDelete': 'confirmDelete'
            },

            render: function() {
                this.$el.html(listSurveyTemplate({isAdmin:this.isAdmin}));
                var self = this;
                var sampleData;
                this.collection.fetch({
                    async: false,
                    success: function() {
                        if(self.isAdmin){
                            sampleData = self.collection.toJSON()[0].SurveyList;
                            self.dataManipulation(sampleData);
                            self.usersData(sampleData);
                            self.createDataGrid(self.usersData(sampleData));
                        } else {
                            sampleData = self.collection.fromToday();
                            self.dataManipulation(sampleData);
                            console.log(sampleData);
                            self.createDataGrid(sampleData);
                        }
                    }
                });
            },

            dataManipulation: function(sampleData) {
                sampleData = _.map(sampleData, function(surveyObj) {
                    surveyObj.startDate = moment(surveyObj.startDate).format('DD-MM-YYYY');
                    surveyObj.endDate = moment(surveyObj.endDate).format('DD-MM-YYYY');
                    if(surveyObj.description.length > 40) surveyObj.description = surveyObj.description.substring(0,40)+"...";
                    return surveyObj;
                });
            },

            usersData: function(Surveylists){
                    var surveylistObj = {};
                    var surveyslistObj = [];
                    var self = this;
                    var operationHTML = '<button class="btn btn-small btn-primary surveyEdit" type="button"><i class="icon-edit icon-white"></i> Edit</button>';

                    _.each(Surveylists, function(surveylist){
                        surveylist.selectRows = "<input type='checkbox' class='selectrows'>";
                        if(moment(surveylist.endDate).unix() >= moment().unix() ){
                            surveylist.status = '<span class="label label-success">ACTIVE</span>';
                        } else {
                            surveylist.status = '<span class="label label-inverse">INACTIVE</span>';
                        }

                        surveylistObj = _.object([
                            "selectrows",
                            "id",
                            "title",
                            "description",
                            "startDate",
                            "endDate",
                            "status",
                            "operation"
                        ],[
                            surveylist.selectRows,
                            surveylist.id,
                            surveylist.title,
                            surveylist.description,
                            surveylist.startDate,
                            surveylist.endDate,
                            surveylist.status,
                            operationHTML
                        ]);

                        surveyslistObj.push(surveylistObj);
                    });

                    return surveyslistObj;
            },

            createDataGrid: function(surveyList) {
                var dataSource = new FuelUxDataSource({
                    columns: [
                    {
                        property: "selectrows",
                        label: "<input type='checkbox' id='selectUsersAtOnce'>",
                        sortable: false
                    },
                    {
                        property: "id",
                        label: "SurveyID",
                        sortable: true
                    }, {
                        property: "title",
                        label: "Title",
                        sortable: true
                    }, {
                        property: "description",
                        label: "Description",
                        sortable: true
                    }, {
                        property: "startDate",
                        label: "StartDate",
                        sortable: true
                    }, {
                        property: "endDate",
                        label: "EndDate",
                        sortable: true
                    }, {
                        property: "status",
                        label: "Survey Status",
                        sortable: true
                    }, {
                        property: "operation",
                        label: "Operation",
                        sortable: false
                    }],
                    data: surveyList,
                    delay: 250
                });
                this.$('#MyGrid').datagrid({
                    dataSource: dataSource,
                    dataOptions: {
                        pageIndex: 0,
                        pageSize: 5
                    },
                    stretchHeight: false
                }).on('loaded', function() {
                    console.log('DataGrid loaded');
                    $('#selectUsersAtOnce').prop('checked', false);
                });
            },

            surveyDetail: function(e) {
                var target$ = this.$(e.target),
                    targetRow$ = target$.closest('tr'),
                    id = targetRow$.find('td').eq(1).text();
                console.log("id " + id);
                Events.trigger("view:navigate", {
                    path: "surveyDetailed/" + id,
                    options: {
                        trigger: true,
                    }
                });
            },

            gridCheckBox: function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log($('#MyGrid').datagrid().data('datagrid').options.dataOptions);
                $('#selectUsersAtOnce').prop('checked', function () {
                    if (this.checked) {
                        $(this).prop("checked", true);
                        $('.surveyDelete').removeProp('disabled').removeClass('disabled');
                        $('.selectrows').prop("checked", true);
                        $('table[id="MyGrid"] tbody tr').addClass('warning');
                    } else {
                        $(this).prop('checked', false);
                        $('.selectrows').prop('checked', false);
                        $('table[id="MyGrid"] tbody tr').removeClass('warning');
                        $('.surveyDelete').prop('disabled', true).addClass('disabled');
                    }
                });
            },

            rowSelected: function(e) {
                e.stopPropagation();
                $($(e.target).closest('input[type="checkbox"]')).prop('checked', function () {
                    if (this.checked) {
                        $('.surveyDelete').removeProp('disabled').removeClass('disabled');
                        $(e.target).closest('tr').addClass('warning selectedRow');
                        globalSelected.push($(e.target).closest('input[type="checkbox"]').attr('data-id'));
                    } else {
                        $('.selectrows').prop('checked', function () {
                            if($(e.target).closest('tr').hasClass('error')) {
                                $(e.target).closest('tr').removeClass('error selectedRow');
                            } else {
                                $(e.target).closest('tr').removeClass('warning selectedRow');
                            }
                        });
                        globalSelected.pop($(e.target).closest('input[type="checkbox"]').attr('data-id'));
                        if(globalSelected.length === 0) $('.surveyDelete').prop('disabled', true).addClass('disabled');
                    }
                });

            },

            surveyDelete: function() {
                this.$('.modal-container').html(deleteSurveyModalTemplate);
                this.$('.modal').modal({backdrop:'static'});
            },

            confirmDelete: function() {
                var deleteIndex = [];
                $('.warning').each(function() {
                    deleteIndex.push($(this).find('td').eq(1).text());
                });
                console.log(deleteIndex);
            }
        });

    });