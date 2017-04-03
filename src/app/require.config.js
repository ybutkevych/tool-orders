// require.js looks for the following global when initializing
var require = {
    baseUrl: "../src",
    paths: {
        "crossroads":           "../node_modules/crossroads/dist/crossroads.min",
        "hasher":               "../node_modules/hasher/dist/js/hasher.min",
        "knockout":             "../node_modules/knockout/build/output/knockout-latest",
        "signals":              "../node_modules/signals/dist/signals.min",
        "text":                 "../node_modules/requirejs-text/text",
        "jquery":               "../node_modules/jquery/dist/jquery.min",
        "jsteps":               "../node_modules/jquery-steps/build/jquery.steps.min",
        "bootstrap":            "../node_modules/bootstrap/dist/js/bootstrap.min",
        "datetimepicker":       "../node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min",
        "moment":                "../node_modules/moment/min/moment.min"
    },
    shim: {
        ko: {
            exports: "ko"
        },
        jquery: {
            exports: "$"
        },
        bootstrap: {
            deps: ["jquery"]
        },
        datetimepicker: {
            deps: ["jquery", "bootstrap", "moment"]
        }
    }
};
