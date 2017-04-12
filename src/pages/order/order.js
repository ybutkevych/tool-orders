define([
    "knockout",
    "text!./order.html",
    "text!../../data/data.json",
    "../../helpers/localStorageProvider"
], function(ko, template, data, localStorageProvider) {

    function OrderViewModel(route) {
        var self = this;

        this.isLoading = ko.observable(false);
        this.order = ko.observable({});
        self.orderId = route.id;

        activate();

        function loadOrders() {
            self.isLoading(true);

            setTimeout(function() {
                self.isLoading(false);
            }, 1000);

            var orders = JSON.parse(data);
            var cachedOrders = localStorageProvider.getObject("tools");
            if (cachedOrders) {
                orders = orders.concat(cachedOrders);
            }

            return orders;
        }

        function activate() {
            var orders = loadOrders();

            self.order(orders.filter(function(item) {
                return item.order === self.orderId;
            })[0]);
        }
    }

    return { viewModel: OrderViewModel, template: template };
});
