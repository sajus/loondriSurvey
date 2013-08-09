define(['backbone', 'models/dashboard/dashboardModel'], function(Backbone, dashboardModel) {

    var DashboardCollection = Backbone.Collection.extend({

        model: dashboardModel

    });

    return DashboardCollection;
});
