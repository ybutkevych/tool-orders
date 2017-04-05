define([
    "text!./wizard.html",
    "knockout",
    "../../helpers/localStorageProvider",
    "hasher",
    "jsteps"
], function(template, ko, localStorageProvider, hasher) {

  function WizardViewModel(params) {
      var self = this;
      self.orderId = ko.observable(null);
      self.orderedBy = ko.observable("");
      self.jobId = ko.observable("");
      self.tools = ko.observableArray([{
          count: ko.observable(1),
          name: ko.observable('')
      }]);
      self.availableToolCounts = ko.observableArray([ 1, 2, 3, 4 ]);
      self.addTool = function() {
          self.tools.push({
              count: ko.observable(1),
              name: ko.observable('')
          });
      };
      self.removeTool = function(tool) {
          var currentIndex = self.tools.indexOf(tool);
          self.tools.splice(currentIndex, 1);
      };

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
                 tools: self.tools().map(function(obj) {
                     return obj.count() + " x " + obj.name();
                 })
             });

             hasher.setHash("toolorders");

             return true;
          }
      });

      return self;
  }

  return { viewModel: WizardViewModel, template: template };
});
