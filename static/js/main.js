var $ = require('ep_etherpad-lite/static/js/rjquery').$; // use jQuery


exports.postAceInit = function (hook_name, args, cb) {

    var users = $('#users');
    var chatbox = $('#chatbox');
	var chatWrapper = $("<div>", {id: "chatWrapper"});
    var editorcontainer = $('#editorcontainer');

      
    /**
     * titlebars
     * see "title.html"
     */
    var editor_title = $("#editor_title");
    var users_title = $("#users_title");
    
    // editor: avoid entering the iframe while fast mouse moving
    editorcontainer.prepend(editor_title);
    editor_title.show();
	
	// users titlebar
    users.prepend(users_title);
    users_title.show();
       
    
	/**
	 * chatbox, user and chatbox+user
	 */	    
    // on load
    if (chatbox.hasClass('stickyChat')) {
		// wrap users and chatbox
    	wrapChat();
    	
    	// bind
    	resizableChat();
    }
    else {
    	editorcontainer.css('right', '');
    }
    
    // on chatbox sticking
    chatbox.on('addClass', function (e, oldClass, newClass) {
		if (newClass == 'stickyChat') {
			// wrap users and chatbox
	    	wrapChat();
	    	
	    	// bind
	    	resizableChat();
	    	
	    	// reset width
			chatWrapper.css('width', '186px');
		}
    });
    
    // on chatbox unsticking
    chatbox.on('removeClass', function (e, oldClass, newClass) {
    	// console.log('Changed from %s to %s due %s', oldClass, newClass, e.type);
    	
    	if (oldClass == 'stickyChat') {
    		// unwrap
    		unwrapChat();
		}
    });    

    
    function wrapChat(){
		$('body').prepend(chatWrapper.append(users).append(chatbox));					
    }
    
    function unwrapChat(){
    	$('body').prepend(chatbox).prepend(users);
		chatWrapper.remove();
    }
    
    function resizableChat(){
    	if(!chatWrapper.hasClass("ui-resizable")){
			// bind jquery ui resizable to chatWrapper
			chatWrapper.resizable({
				handles: "w",
				maxWidth: 500,
				minWidth: 192,
				resize: function( event, ui ) {
					var padright = ui.size.width;
					chatWrapper.css('left', '');
					editorcontainer.css({"right" : (padright + 6) +"px"});
				}
			});
			
			// adjust default width of editorcontainer
			editorcontainer.css('right', (chatWrapper.width() + 6) + 'px');
    	}
    }
    
    
	/**
	 * support for ep_table_of_contents
	 */    
    if($('#options-toc').length > 0){
	    var toc = $('#toc');
	    var toc_title = $('#toc_title');
	    var toc_items = $('#tocItems'); 
		var toc_refresh = $('#toc_refresh');
	    
	    // titlebar
		toc.prepend(toc_title);
		toc_title.show();
	    
		// fix: move TOC to the left to not overlap with chat bar
		tableOfContents.enable = function(){
			toc.show().css({"width" : "230px", "left" : "0"});
			editorcontainer.css({"left" : "230px"});
		   	this.update();
		}
		tableOfContents.disable = function(){
			toc.hide();
		   	editorcontainer.css({"left" : "0"});
		}
		
		// trigger
		if (!clientVars.toc_disable_by_default){	
			tableOfContents.enable();
	   	}
		   
		// bind jquery ui resizable to TOC
		toc.resizable({
	    	handles: "e",
	    	// grid: 10,
	    	maxWidth: 400,
	    	minWidth: 150,
	    	resize: function( event, ui ) {
	    		var padleft = ui.size.width; //  + 50
	    		// var padleft = $("#toc").width()+20;
	    		editorcontainer.css({"left" : padleft+"px"});
	    	}
	    });
		
		// refresh
		toc_title.append(toc_refresh);
    }
 
};
