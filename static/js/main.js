var $ = require('ep_etherpad-lite/static/js/rjquery').$; // use jQuery



exports.postAceInit = function (hook_name, args, cb) {

	/**
	 * support for ep_table_of_contents
	 */
	// fix: move TOC to the left to not overlap with chat bar
	tableOfContents.enable = function(){
		$('#toc').show().css({"width" : "230px", "left" : "0"});
	   	$('#editorcontainer').css({"left" : "230px"});
	   	this.update();
	}
	tableOfContents.disable = function(){
	   	$('#toc').hide();
	   	$('#editorcontainer').css({"left" : "0"});
	}
	
	// toc titlebar
	$( "#toc" ).prepend("" +
		"<div class='toc_title'>Gliederung</div>"
	);

	// trigger
	if (!clientVars.toc_disable_by_default){	
		tableOfContents.enable();
   	}
	   
	// bind jquery ui resizable to TOC
    $( "#toc" ).resizable({
    	handles: "e",
    	// grid: 10,
    	maxWidth: 400,
    	minWidth: 150,
    	resize: function( event, ui ) {
    		var padleft = ui.size.width; //  + 50
    		// var padleft = $("#toc").width()+20;
    		$('#editorcontainer').css({"left" : padleft+"px"});
    	}
    });
 

    /**
     * editor titlebar: avoid entering the iframe while fast mouse moving
     * 
     */
	$( "#editorcontainer" ).prepend("" +
			"<div class='editor_title'></div>"
	);
    
	
	/**
	 * chatbox, user and chatbox+user
	 */
	// users titlebar
	/*
	$( "#users" ).prepend("" +
		"<div class='users_title'></div>"
	);
	*/
	
	// ...

	
	
	
	/** 
	 * fix: init white stripe on right
	 * geht das nur mir so?
	 */
	$( "#editorcontainer" ).css({"right" : "192px"});
};


