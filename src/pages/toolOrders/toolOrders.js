define([
    "knockout",
    "text!./toolOrders.html",
    "text!../../data/data.json",
    "../../helpers/localStorageProvider"
], function (ko, template, data, localStorageProvider) {

    function ToolOrdersViewModel(route) {
        var self = this;
        this.isLoading = ko.observable(false);
        this.orders = ko.observableArray([]);
        activate();

        function loadOrders() {
            self.isLoading(true);
            setTimeout(function(){
                self.isLoading(false)
            }, 1500);
            var orders = JSON.parse(data);
            var cachedOrders = localStorageProvider.getObject("tools");
            if (cachedOrders) {
                orders = orders.concat(cachedOrders);
            }

            return orders
        }

        function activate() {
            self.orders(loadOrders());
        }
    }

    return { viewModel: ToolOrdersViewModel, template: template };
});
