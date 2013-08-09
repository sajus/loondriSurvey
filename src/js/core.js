define(['backbone', 'events', 'globals','views/login/loginView','models/login/loginModel','underscore','jqueryCookie'],
    function(Backbone, Events, Globals,LoginView,LoginModel){

    _.extend(Backbone.Model , {
        gateWayUrl:Globals.gateWayUrl
    });

    var views = {};

    var create = function (context, name, View, options) {
        /*
            View clean up isn't actually implemented yet,
            but will simply call .clean, .remove and .unbind
        */
        if(typeof views[name] !== 'undefined') {
            views[name].undelegateEvents();
            if(typeof views[name].clean === 'function') {
                views[name].clean();
            }
        }
        var skipAuthCheck=false;
        if(options!==undefined){
            if(options.skipAuthCheck){
                skipAuthCheck=true;
            }
        }
        if(!$.cookie('isAuthenticated') && !skipAuthCheck){
            var loginModel=new LoginModel(),
            view = new LoginView({model:loginModel,authorizationFailed:!skipAuthCheck,targetView:View,targetOptions:options});
        }else{
            var view = new View(options);
        }

        views[name] = view;

        if(typeof context.children === 'undefined'){
            context.children = {};
            context.children[name] = view;
        } else {
            context.children[name] = view;
        }

        Events.trigger('viewCreated');
        return view;
    };

    return {
        create: create
    };


});
