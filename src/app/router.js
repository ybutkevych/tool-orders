define(["knockout", "crossroads", "hasher"], function(ko, crossroads, hasher) {

    // This module configures crossroads.js, a routing library.

    return new Router({
        routes: [
            { url: '', params: { page: 'home-page' } },
            { url: 'toolorders', params: { page: 'tool-orders-page' } },
            { url: 'settings', params: { page: 'settings-page' } },
            { url: 'help', params: { page: 'help-page' } },
            { url: 'neworder', params: { page: 'new-order-page' } },
            { url: 'order/{id}', params: { page: 'order-page' } }
        ]
    });

    function Router(config) {
        var currentRoute = this.currentRoute = ko.observable({});

        ko.utils.arrayForEach(config.routes, function(route) {
            crossroads.addRoute(route.url, function(requestParams) {
                currentRoute(ko.utils.extend(requestParams, route.params));
            });
        });

        activateCrossroads();
    }

    function activateCrossroads() {
        function parseHash(newHash, oldHash) { crossroads.parse(newHash); }
        crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.init();
    }
});
