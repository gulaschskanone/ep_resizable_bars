/*! jquery.observe.js v0.0.1 | MIT License | gist.github.com/yckart/c893d7db0f49b1ea4dfb */
$.observe = function (method, getter) {

  // store the original handler function
  var originalMethod = $.fn[method];

  $.fn[method] = function () {

    // cache $(this)
    var self = this;

    // store the old value
    var oldValue = getter.call(self, arguments);

    // execute the original hanlder and store its return value
    var result = originalMethod.apply(self, arguments);

    // store the new value
    var newValue = getter.call(self, arguments);

    // trigger the custom event and pass the stored old & new value
    self.trigger(method, [oldValue, newValue]);

    // return the result from the original handler.
    return result;
  };
};

/*! jquery.observe.class.js v0.0.1 | MIT License | gist.github.com/yckart/c893d7db0f49b1ea4dfb */
(function ($) {
  var methods = ['addClass', 'toggleClass', 'removeClass'];

  $.each(methods, function (index, method) {
    $.observe(method, function () {
    	if (this[0] != undefined) {
    		return this[0].className;
    	}
    });
  });
}(window.jQuery || window.Zepto));