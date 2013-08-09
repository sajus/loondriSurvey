define(['backbone', 'template!templates/dashboard/dashboard'],
	function(Backbone, dashboardTemplate){

    var Dashboard = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(dashboardTemplate);
        }
    });

    return Dashboard;
});
