define(['backbone', 'template!templates/survey/listSurvey', 'fueluxDataSource', 'fueluxDataGrid','bootstrapDropdown','fueluxComboBox','fueluxSelectBox','fueluxSearchBox'],
    function(Backbone, listSurveyTemplate, FuelUxDataSource) {

        return Backbone.View.extend({
            el: '.page',
            initialize: function() {
            },
            events: {},
            render: function() {
                this.$el.html(listSurveyTemplate);
                var sampleData = [{
                    "memberid": 103,
                    "name": "Laurens  Natzijl",
                    "age": "25"
                }, {
                    "memberid": 104,
                    "name": "Sandra Snoek",
                    "age": "21"
                }, {
                    "memberid": 105,
                    "name": "Jacob Kort",
                    "age": "31"
                }, {
                    "memberid": 106,
                    "name": "Erik  Blokker",
                    "age": "40"
                }, {
                    "memberid": 107,
                    "name": "Jacco  Ruigewaard",
                    "age": "37"
                }, {
                    "memberid": 103,
                    "name": "Laurens  Natzijl",
                    "age": "25"
                }, {
                    "memberid": 104,
                    "name": "Sandra Snoek",
                    "age": "21"
                }, {
                    "memberid": 105,
                    "name": "Jacob Kort",
                    "age": "31"
                }, {
                    "memberid": 106,
                    "name": "Erik  Blokker",
                    "age": "40"
                }, {
                    "memberid": 107,
                    "name": "Jacco  Ruigewaard",
                    "age": "37"
                }, {
                    "memberid": 103,
                    "name": "Laurens  Natzijl",
                    "age": "25"
                }, {
                    "memberid": 104,
                    "name": "Sandra Snoek",
                    "age": "21"
                }, {
                    "memberid": 105,
                    "name": "Jacob Kort",
                    "age": "31"
                }, {
                    "memberid": 106,
                    "name": "Erik  Blokker",
                    "age": "40"
                }, {
                    "memberid": 107,
                    "name": "Jacco  Ruigewaard",
                    "age": "37"
                }];
                var dataSource = new FuelUxDataSource({
                    columns: [{
                        property: "memberid",
                        label: "LidId",
                        sortable: true
                    }, {
                        property: "name",
                        label: "Naam",
                        sortable: true
                    }, {
                        property: "age",
                        label: "Leeftijd",
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
            }
        });

    });