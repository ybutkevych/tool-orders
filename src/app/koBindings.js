define(['knockout', 'datetimepicker'], function(ko) {
    ko.bindingHandlers.datetimepicker = {
        init: function (element, valueAccessor) {
            var properties = valueAccessor();
            var format = properties.format;
            $(element).datetimepicker(properties);
        }
    }
});
