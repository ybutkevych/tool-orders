define([
    "text!./wizard.html",
    "knockout",
    "../../helpers/localStorageProvider",
    "jsteps"
], function(template, ko, localStorageProvider) {

  function WizardViewModel(params) {
      var self = this;
      this.orderId = ko.observable(null);
      this.orderedBy = ko.observable("");
      this.jobId = ko.observable("");

      $("#example-basic").steps({
          headerTag: "h3",
          bodyTag: "section",
          transitionEffect: "slideLeft",
          autoFocus: true,
          onFinishing: function (event, currentIndex)
          {
             localStorageProvider.pushToArray("tools", {
                 order: self.orderId(),
                 jobId: self.jobId(),
                 orderedBy: self.orderedBy(),
                 state: "Pending",
                 priority: 4,
                 tools: []
             });

             return true;
          }
      });
  }

  return { viewModel: WizardViewModel, template: template };
});
