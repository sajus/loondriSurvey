define(['jquery', 'underscore', 'backbone', 'core'], function ($, _, Backbone, Core) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Pages
            'about': 'about',
            'contact': 'contact',
            'help': 'help',
			'user': 'user',
            'login': 'login',

            // Default - catch all
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(options) {
        var appView = options.appView;
        var router = new AppRouter(options);

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
            require(['views/users/userView'], function (userPage) {
                var userPage = Core.create(appView, 'userPage', userPage);
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
