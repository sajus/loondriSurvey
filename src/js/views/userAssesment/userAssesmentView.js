define(['backbone', 'template!templates/userAssesment/userAssesment'],
	function(Backbone, assesmentTemplate){

    var UserAssesment = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(assesmentTemplate);
        }
    });

    return UserAssesment;
});
