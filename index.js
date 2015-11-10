var eejs = require("ep_etherpad-lite/node/eejs");
var settings = require('ep_etherpad-lite/node/utils/Settings');


exports.eejsBlock_scripts = function (hook_name, args, cb) {
	args.content = args.content + eejs.require("ep_resizable_bars/templates/scripts.html", {}, module);
	return cb();
};

exports.eejsBlock_styles = function (hook_name, args, cb) {
	args.content = args.content + eejs.require("ep_resizable_bars/templates/styles.html", {}, module);
	return cb();
};

exports.eejsBlock_body = function (hook_name, args, cb) {
	args.content = args.content + eejs.require("ep_resizable_bars/templates/title.html", {}, module);
	return cb();
};

exports.clientVars = function(hook, context, callback)
{
	// return the setting to the clientVars, sending the value
	if(settings.ep_toc){
		return callback({ 
			"toc_disable_by_default": settings.ep_toc.disable_by_default 
		});
	}
	else {
		return callback({ "toc_disable_by_default": true });
	}
};