define(['backbone', 'events', 'globals','views/login/loginView','models/login/loginModel','views/home/homeView','views/dashboard/dashboardView','underscore','jqueryCookie'],
    function(Backbone, Events, Globals,LoginView,LoginModel,HomeView,DashboardView){

    _.extend(Backbone.Model , {
        gateWayUrl:Globals.gateWayUrl
    });

    var views = {},
        user = ['UserAssesmentPage', 'DashboardPage', 'NewSurvey', 'SurveyDetailed', 'SurveyUserDetailed', 'ListSurvey', 'userPage'];

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
        var accesslevel = $.cookie('accesslevel');
        if(!$.cookie('isAuthenticated') && !skipAuthCheck){
            var loginModel=new LoginModel(),
            view = new LoginView({model:loginModel,authorizationFailed:!skipAuthCheck,targetView:View,targetOptions:options});
        } else if(accesslevel === "admin" && name === "userPage"){
            Events.trigger("alert:error", [{
                message: "User page access denied!!!"
            }]);
            view = new DashboardView();
            Events.trigger("view:navigate", {
                path: "dashboard",
                options: {
                    trigger: true
                }
            });
        } else if(accesslevel === "user" && _.contains(user, name)){
            Events.trigger("alert:error", [{
                message: name.toUpperCase() +" access denied"
            }]);
            view = new HomeView();
            Events.trigger("view:navigate", {
                path: "home",
                options: {
                    trigger: true
                }
            });
        } else {
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
