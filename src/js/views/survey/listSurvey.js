define(['backbone', 'template!templates/survey/listSurvey', 'fueluxDataSource','events', 'fueluxDataGrid','bootstrapDropdown','fueluxComboBox','fueluxSelectBox','fueluxSearchBox','moment'],
    function(Backbone, listSurveyTemplate, FuelUxDataSource, Events) {

        return Backbone.View.extend({
            el: '.page',

            initialize: function() {
            },

            events: {
                "click tbody tr td" : "surveyDetail"
            },

            render: function() {
                this.$el.html(listSurveyTemplate);
                var self = this;
                var sampleData;
                this.collection.fetch({
                    async:false,
                    success:function(){
                        sampleData = self.collection.toJSON()[0].SurveyList;
                        sampleData = _.map(sampleData,function(surveyObj){
                            surveyObj.startDate = moment(surveyObj.startDate).format('MMMM Do YYYY, h:mm:ss a');
                            surveyObj.endDate = moment(surveyObj.endDate).format('MMMM Do YYYY, h:mm:ss a');
                            return surveyObj;
                        });
                    }
                });
                var dataSource = new FuelUxDataSource({
                    columns: [{
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
                    },{
                        property: "startDate",
                        label: "StartDate",
                        sortable: true
                    },{
                        property: "endDate",
                        label: "EndDate",
                        sortable: true
                    }],
                    data: sampleData,
                    delay: 250
                });
                this.$('#MyGrid').datagrid({
                    dataSource: dataSource,
                    dataOptions: {
                        pageIndex: 0,
                        pageSize: 5
                    },
                    stretchHeight: false
                });
                return this;
            },

            surveyDetail: function(e) {
                var target$=this.$(e.target),
                    targetRow$=target$.closest('tr'),
                    id=targetRow$.find('td').first().text();
                console.log("id " + id);
                Events.trigger("view:navigate", {
                    path: "surveyDetailed/"+id,
                    options: {
                        trigger: true,
                    }
                });
            }
        });

    });