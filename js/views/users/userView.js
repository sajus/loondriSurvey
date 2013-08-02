define(['jquery', 'underscore', 'backbone', 'template!templates/users/page','bootstrap','fuelux'], function($, _, Backbone, userPageTemplate){
	
	var User = require();

    var userPage = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(userPageTemplate);
			console.log(this.model.toJSON());
			$('#userGrid').datagrid({dataSource: null, stretchHeight: true});
        }
    });

    return userPage;
});
