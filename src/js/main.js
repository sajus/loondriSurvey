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
        /* ==========================================================================
           =BOOTSTRAP
           ========================================================================== */
            'bootstrap': 'vendors/bootstrap/js/bootstrap.min',
            'bootstrapAlert': 'vendors/bootstrap/js/bootstrap-alert',
            'bootstrapDropdown': 'vendors/bootstrap/js/bootstrap-dropdown',
            'bootstrapTransition': 'vendors/bootstrap/js/bootstrap-transition',

        /* List of [architecture based custom JavaScript] files to be loaded in this architecture. */
            'templates': '../templates',
            'template': 'utilities/handlebars-template-mapper',
            'formHelpers': 'utilities/formHelpers',

        /* ==========================================================================
           =Backbone.js plugins
           ========================================================================== */
            'modelValidator':'vendors/backbone/plugins/backbone-validation',
            'modelBinder':'vendors/backbone/plugins/backbone-modelbinder',

            // List of Require.js plugins:
            'text': 'vendors/require/plugins/text',

            // List of Handlebars plugins:
            'handlebars_Helpers': 'utilities/handlebars-helpers',


        /* ==========================================================================
           =FUEL UX
           ========================================================================== */
            'fuelux': 'vendors/bootstrap/plugins/fuelux/all',
            'fueluxDataGrid': 'vendors/bootstrap/plugins/fuelux/datagrid',
            'fueluxDataSource': 'vendors/bootstrap/plugins/fuelux/datasource',
            'fueluxComboBox': 'vendors/bootstrap/plugins/fuelux/combobox',
            'fueluxSelectBox': 'vendors/bootstrap/plugins/fuelux/select',
            'fueluxSearchBox': 'vendors/bootstrap/plugins/fuelux/search',
            'util': 'vendors/bootstrap/plugins/fuelux/util',
            'fueluxWizard': 'vendors/bootstrap/plugins/fuelux/wizard',

        /* ==========================================================================
           =EXTERNAL PLUGINS
           ========================================================================== */
            'datePicker': 'vendors/bootstrap/plugins/datepicker/datepicker',
            'jqueryCookie': 'vendors/jquery/plugins/jquery.cookie',

        //List for the crypto:
		'hmac-md5':'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-md5',
		'hmac-sha512':'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha512',
		'sha256':'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256',
		'enc-base64-min':'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/enc-base64-min',
		'rabbit':'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/rabbit',
		'CryptoJS':'utilities/appCrypto'
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
        bootstrapAlert: {
            deps: ['jquery']
        },
        datePicker: {
            deps: ['bootstrap','jquery']
        },
        i18n: {
            deps: ['jquery']
        },
        modelBinder:{
            deps:['backbone'],
            exports:'Backbone.ModelBinder'
        },
        CryptoJS: {
			deps:['jquery','rabbit','hmac-md5','hmac-sha512','sha256','enc-base64-min'],
			exports:'CryptoJS'
		}
    }
});

/* Load app.js to initialize your application module. */
require(['views/app', 'router', 'core', 'i18n'], function(AppView, Router, Core, i18n) {
    console.log("calling core in main.js");
    var appView = Core.create({}, 'AppView', AppView,{skipAuthCheck:true});
    console.log("after core creation main.js");
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
