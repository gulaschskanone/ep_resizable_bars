var $ = require('ep_etherpad-lite/static/js/rjquery').$; // use jQuery



exports.postAceInit = function (hook_name, args, cb) {

	/**
	 * support for ep_table_of_contents
	 */
	// move TOC to the left to not overlap with chat bar
	tableOfContents.enable = function(){
		$('#toc').show().css({"width" : "200px", "left" : "0"});
	   	$('#editorcontainer').css({"left" : "250px"});
	   	this.update();
	   	$('iframe[name=ace_outer]').removeAttr("style"); 
	}
	tableOfContents.disable = function(){
	   	$('#toc').hide();
	   	$('#editorcontainer').css({"left" : "0"});
	   	$('iframe[name=ace_outer]').attr("style", "padding-top:0px !important"); 
	}

	// trigger
	if (!clientVars.toc_disable_by_default){	
		tableOfContents.enable();
   	}
	   
	// bind jquery ui resizable to TOC
    $( "#toc" ).resizable({
    	handles: "e",
    	// grid: 10,
    	maxWidth: 400,
    	minWidth: 100,
    	resize: function( event, ui ) {
    		var padleft = ui.size.width + 50;
    		// var padleft = $("#toc").width()+20;
    		$('#editorcontainer').css({"left" : padleft+"px"});
    		
    	}
    });
 

    
    
	/**
	 * chatbox, user and chatbox+user
	 */
    // TODO

	
};
