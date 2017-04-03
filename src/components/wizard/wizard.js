define(['text!./wizard.html', 'jsteps'], function(template) {

  function WizardViewModel(params) {
      $("#example-basic").steps({
          headerTag: "h3",
          bodyTag: "section",
          transitionEffect: "slideLeft",
          autoFocus: true
      });
  }

  return { viewModel: WizardViewModel, template: template };
});
