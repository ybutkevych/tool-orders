define(["knockout", "text!./home.html"], function(ko, template) {

    function HomeViewModel(route) {
      this.message = ko.observable('Welcome to Tool Orders!');
    }

    return { viewModel: HomeViewModel, template: template };
});
