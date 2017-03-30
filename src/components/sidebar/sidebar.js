define(['text!./sidebar.html'], function(template) {

  function SidebarViewModel(params) {
    this.route = params.route;
  }

  return { viewModel: SidebarViewModel, template: template };
});
