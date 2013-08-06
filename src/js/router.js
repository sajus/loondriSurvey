define(['jquery', 'underscore', 'backbone', 'core','events'], function ($, _, Backbone, Core,Events) {

    var AppRouter = Backbone.Router.extend({
        initialize:function(){
            Events.on('page:navigate', this._navigatePage, this);
        },
        _navigatePage:function(navigationData){
            this.navigate(navigationData.path, navigationData.options);
        },
        routes: {
            // Pages
            'about': 'about',
            'contact': 'contact',
            'help': 'help',
			'user': 'user',
            'login': 'login',
            'wizard/:step':'newSurvey',
            'listSurvey':'listSurvey',

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

        router.on('route:newSurvey', function(step) {
            require(['views/survey/newSurvey','models/survey/survey'], function(NewSurvey,SurveyModel) {
                surveyModel=new SurveyModel();
                var newSurvey = Core.create(appView, 'NewSurvey', NewSurvey,{model:surveyModel,step:step});
                newSurvey.render();
            });
        });

        router.on('route:listSurvey', function() {
            require(['views/survey/listSurvey'], function(ListSurvey) {
                var listSurvey = Core.create(appView, 'ListSurvey', ListSurvey);
                listSurvey.render();
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
            require(['views/users/userView','views/users/modifyView','models/user/userModel'], function (userPage, modifyUserPage, UserModel) {
                var userModel = new UserModel();
				var userPage = Core.create(appView, 'userPage', userPage, {model: userModel });
                userPage.render();
				var modifyPage = Core.create(appView, 'modifyUserPage', modifyUserPage);
				modifyPage.render();
            });
        });
		/*
		router.on('route:user', function () {
            require(['views/users/modifyView'], function (modifyUserPage) {
              //  var userModel = new UserModel();
				var modifyUserPage = Core.create(appView, 'userPage', modifyUserPage);
                modifyUserPage.render();
            });
        });
		*/
        router.on('route:help', function () {
            require(['views/help/helpView'], function (HelpPage) {
                var helpPage = Core.create(appView, 'HelpPage', HelpPage);
                helpPage.render();
            });
        });

        router.on('route:login', function () {
            require(['views/login/loginView','models/login/login'], function (LoginPage, LoginModel) {
                var loginModel=new LoginModel();
                var loginPage = Core.create(appView, 'LoginPage', LoginPage,{model:loginModel});
                loginPage.render();
            });
        });
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
