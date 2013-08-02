/*
    The goal of this file is mainly to intialize require.js AMD module loader configuration.
    Your application code should not be here but in apps.js
*/
requirejs.config({
    /*
        The path where your JavaScripts are located.
    */
    baseUrl: './js/',

    map: {
        '*': {
            'css': 'vendors/require/plugins/require-css/css'
        }
    },

    /*
      Path config is also part of Require and allows to define paths for vendors
      not found directly under baseUrl.
      See http://requirejs.org/docs/api.html#config-paths for details.
    */
    paths: {

        /* List of libraries to be included in this architecture. */
        'jquery': 'vendors/jquery/jquery',
        'underscore': 'vendors/underscore/underscore',
        'backbone': 'vendors/backbone/backbone', // https://github.com/amdjs

        'handlebars': 'vendors/handlebars/handlebars',
        'moment': 'vendors/moment/moment',
        'i18n': 'vendors/i18n/i18n',

        /* List of framework to be included in this architecture. */
        'bootstrap': 'vendors/bootstrap/js/bootstrap.min',

        /* List of [architecture based custom JavaScript] files to be loaded in this architecture. */
        'templates': '../templates',
        'template': 'utilities/handlebars-template-mapper',

        /* List of Plugins to be included in this architecture. */
            // List of Backbone.js plugins:
            'modelValidator':'vendors/backbone/plugins/backbone-validation',
            'modelBinder':'vendors/backbone/plugins/backbone-modelbinder',

            // List of Require.js plugins:
            'text': 'vendors/require/plugins/text',

            // List of Handlebars plugins:
            'handlebars_Helpers': 'utilities/handlebars-helpers',

            // List of Bootstrap plugins:
            'fuelux': 'vendors/bootstrap/plugins/fuelux/all.min'
    },

    /*
        shim config is part of `Require 2.0`_ and allows to Configure the dependencies
        and exports for older, traditional “browser globals” scripts that do not use
        define() to declare the dependencies and set a module value.
        See http://requirejs.org/docs/api.html#config-shim for more details.
    */
    shim: {
        backbone: {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        bootstrap: {
            deps: ['jquery']
        },
        fuelux: {
            deps: ['bootstrap']
        },
        i18n: {
            deps: ['jquery']
        },
        modelBinder:{
            deps:['backbone'],
            exports:'Backbone.ModelBinder'
        }
    }
});

/* Load app.js to initialize your application module. */
require(['views/app', 'router', 'core', 'i18n'], function(AppView, Router, Core, i18n) {
    var appView = Core.create({}, 'AppView', AppView);
    appView.render();

    /*
        This file is used to initialize your application.
    */
    i18n.init({
        lng: 'en',
        debug: true,
        fallbackLng: false,
        load:'unspecific',
        resGetPath: "locales/__lng__/__ns__.json",
        ns: {
            namespaces: ['translation'],
            defaultNs: 'translation'
        }
    });

    /*
        The router now has a copy of all main appview
    */
    Router.initialize({appView: appView});
});
