var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$(".walkthrough-item .yc-button").click(function(){
	$(this).parent().parent().hide(); 
	if($(this).parent().parent().next().hasClass('walkthrough-item'))
		$(this).parent().parent().next().show();
	else
	{
		$("#loading").show();
		$('body').removeClass('signup-page').addClass('privacy-page');
		$("#emailcheck_html").hide();
		$("#privacy_html").show();
		$('#privacy-box').getNiceScroll().resize();
		setTimeout(function(){ $("#loading").hide(); },500);
		return false;	
	}
	$(".dotstyle ul").find('li.current').removeClass('current').next('li').addClass('current');
});

/*if(window.localStorage.getItem("hf_app")){ //$(".loginlogotext .login").empty().append('Create Your Free Account'); 
$("#emailcheck_html, #privacy_html").hide(); $('body').removeClass('privacy-page').addClass('home-page'); $("#pageheader .header").addClass('logo-center'); $(".home-menu, #pageheader").show();}
	if(!window.localStorage.getItem("hf_app")) window.localStorage.setItem("hf_app",1)*/

$('#privacy-box').niceScroll({
		cursorcolor: "#2f185c",
        cursorborder: "0",
        autohidemode: true,
        cursormaxheight: 30
	});
	
$(document).on('click',"a.skip",function(){
	$("#loading").show();
	$('body').removeClass('signup-page').addClass('privacy-page');
	$("#emailcheck_html").hide();
	$("#privacy_html").show();
	$('#privacy-box').getNiceScroll().resize();
	setTimeout(function(){ $("#loading").hide(); },300);
	return false;
});

$(document).on('click',"#privacy_html a",function(){
	$("#loading").show();
	$('body').removeClass('privacy-page').addClass('home-page');
	$("#pageheader .header").addClass('logo-center');
	$("#pageheader").show();
	$("#privacy_html").hide();
	$(".home-menu").show();
	setTimeout(function(){ $("#loading").hide(); },500);
	return false;
});

$(".media-list li:eq(4)").on('click',function(){ $("#loading").show();
   $(".site-title").empty().append('<h4>My profile</h4>');$('body').removeClass('subpagebody');$("#pageheader .header").removeClass('logo-center');
   var height = $(window).height();        
   var headr_height = $("#pageheader").height();
   var footr_height = $("#pagefooter").height();
   var setheight = height - headr_height;
   var trueheight = setheight - footr_height;
   $(".main").css("height", trueheight);
   $(".home-menu").hide(); $("#pageheader, #myprofile_html").show(); setTimeout(function(){ $("#loading").hide(); },300); });
   
$("#myprofile_html li:eq(2) a").on('click',function(){ $("#loading").show(); $(".site-title h4").empty().append('Consent to Communication');
	$('body').removeClass('home-page').addClass('consent-page');
	$("#myprofile_html").hide(); $("#consent").show(); setTimeout(function(){ $("#loading").hide(); },300);
});

$(window).resize(function(){
	var h=$(window).height()-70;
	$('.main').height(h);
});

$(document).on('click',"#pageheader .panel-control-left a",function(){
	$("#loading").show();
	if($(".site-title h4").html() == "My profile"){
		$("#myprofile_html").hide();
		$(".home-menu").show();
		$(".site-title").empty().append('<img src="img/logo.png" alt="" width="228" height="56">');$("#pageheader .header").addClass('logo-center');
	}
	if($(".site-title h4").html() == "Consent to Communication"){
		$('body').removeClass('consent-page').addClass('home-page');
		$("#consent").hide();
		$("#myprofile_html").show();
		$(".site-title h4").empty().append('My profile');
	}
	
	setTimeout(function(){ $("#loading").hide(); },300);
});