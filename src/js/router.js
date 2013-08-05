define(['jquery', 'underscore', 'backbone', 'core'], function ($, _, Backbone, Core) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Pages
            'about': 'about',
            'contact': 'contact',
            'help': 'help',
			'user': 'user',
            'login': 'login',
            'newSurvey':'newSurvey',

            // Default - catch all
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(options) {
        var appView = options.appView;
        var router = new AppRouter(options);
        /* ==========================================================================
           =Survey
           ========================================================================== */

        router.on('route:newSurvey', function() {
            require(['views/survey/newSurvey','models/survey/survey'], function(NewSurvey,SurveyModel) {
                surveyModel=new SurveyModel();
                var newSurvey = Core.create(appView, 'NewSurvey', NewSurvey,{model:surveyModel});
                newSurvey.render();
            });
        });


        router.on('route:defaultAction', function (actions) {
            require(['views/home/homeView'], function (HomePage) {
                var homePage = Core.create(appView, 'HomePage', HomePage);
                homePage.render();
            });
        });

        router.on('route:about', function () {
            require(['views/about/aboutView'], function (AboutPage) {
                var aboutPage = Core.create(appView, 'AboutPage', AboutPage);
                aboutPage.render();
            });
        });

        router.on('route:contact', function () {
            require(['views/contact/contactView'], function (ContactPage) {
                var contactPage = Core.create(appView, 'ContactPage', ContactPage);
                contactPage.render();
            });
        });

		router.on('route:user', function () {
            require(['views/users/userView','models/user/userModel'], function (userPage, UserModel) {
                var userModel = new UserModel();
				var userPage = Core.create(appView, 'userPage', userPage, {model: userModel });
                userPage.render();
            });
        });

        router.on('route:help', function () {
            require(['views/help/helpView'], function (HelpPage) {
                var helpPage = Core.create(appView, 'HelpPage', HelpPage);
                helpPage.render();
            });
        });

         router.on('route:login', function () {
            require(['views/login/loginView'], function (LoginPage) {
                var loginPage = Core.create(appView, 'LoginPage', LoginPage);
                loginPage.render();
            });
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
