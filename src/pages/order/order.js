define(["knockout", "text!./order.html"], function(ko, template) {

    function OrderViewModel(route) {

        this.orderId = route.id;
        this.toolNumber = "N/A - fetch from DB";

        activate();

        function activate() {
        }
    }

    return { viewModel: OrderViewModel, template: template };
});
