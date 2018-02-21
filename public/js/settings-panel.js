/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var sipPos = 0;
$(document).ready(function() {
	$("#settings-panel-tab").click(function(e) {
		e.preventDefault();
		$("#settings-panel").animate({left: sipPos}, 220, 'linear', function() {
			if(sipPos == 0) {sipPos = -220;}
			else {sipPos = 0;}
		});
	});

// Check outerwrapper is enable
checkwrapper();
var winheight = $(window).height();
var winwidth = $(window).width();
$("#outer-container").height(winheight).css("margin","auto");

    // Add remove outerwrapper
    $(".addwrapper").click(function(){
    var owrapper = $.cookie('wrapper');
        if(!owrapper){
            $("#outer-container").css("max-width","1220px").css("background-color","#fff").css("box-shadow", "0px 0px 2px 2px rgba(0, 0, 0, 0.2)").css("margin","auto");
            $.cookie('wrapper', 'yes', { expires: 365, path: '/' });
                
        }else{
            $("#outer-container").css("max-width","100%").css("background","none").css("box-shadow", "none");
            $.removeCookie('wrapper', { path: '/' });
        }
    })
    // some outerwrapper gimiks
    $(window).resize(function() {
        checkwrapper();
        var owrapper = $.cookie('wrapper');
        if ($(window).width() < 767) {       
            // do nothing
        }else{
            if(owrapper){
               $("#outer-container").css("box-shadow", "0px 0px 2px 2px rgba(0, 0, 0, 0.2)"); 
            }else{
                $("#outer-container").css("width","100%");
            }
        }
    });
    
    
    
// End document ready function
});

function checkwrapper(){
    var owrapper = $.cookie('wrapper');
    if(owrapper){
       $("#outer-container").css("max-width","1220px").css("background-color","#fff").css("box-shadow", "0px 0px 2px 2px rgba(0, 0, 0, 0.2)");
    }else{
        $("#outer-container").css("max-width","100%").css("background","none").css("box-shadow", "none");
    }
}



