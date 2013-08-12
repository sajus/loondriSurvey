define(['backbone', 'template!templates/dashboard/dashboard','jqueryCookie'],
	function(Backbone, dashboardTemplate){

    var Dashboard = Backbone.View.extend({

        el: '.page',

        initialize:function(){
        	if($.cookie('accesslevel') === "super admin") {
        		this._superAdmin = true;
        	} else {
        		this._superAdmin = false;
        	}
        },

        render: function () {
            this.$el.html(dashboardTemplate({superAdmin:this._superAdmin}));
        }
    });

    return Dashboard;
});
