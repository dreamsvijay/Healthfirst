var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$("#loading").hide();$("#pagecontent").show();
if(window.localStorage.getItem("hf_app")){$("#pageheader").show();$("#emailcheck_html, #privacy_html").hide(); $('body').removeClass('walkthrough-page').addClass('home-page');$("#pagecontent").height($(window).height()-86);}
$(".walkthrough-item .yc-button").click(function(){
	$(this).parent().parent().hide(); 
	if($(this).parent().parent().next().hasClass('walkthrough-item'))
		$(this).parent().parent().next().show();
	else
	{
		$("#loading").show();
		$('body').removeClass('walkthrough-page').addClass('privacy-page');
		$("#emailcheck_html").hide();
		$("#privacy_html").show();
		$('#privacy-box').getNiceScroll().resize();
		setTimeout(function(){ $("#loading").hide(); },500);
		return false;	
	}
	$(".dotstyle ul").find('li.current').removeClass('current').next('li').addClass('current');
});
    /*document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() { 
//document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}
function onPause() {
	if(window.localStorage.getItem("bg_page"))
   window.location = window.localStorage.getItem("bg_page");
}


function onResume() { alert(window.localStorage.getItem("bg_page"));
   if(window.localStorage.getItem("bg_page"))
   window.location = window.localStorage.getItem("bg_page");
}*/

/* page resize */	
	//$(document).ready(function(){
		
		/*var height = $(window).height();	
		var headr_height = $("#pageheader").height();
		var footr_height = $("#pagefooter").height();
		var setheight = height - headr_height;
		var trueheight = setheight - footr_height;
		$(".menu-list").css("height", trueheight);*/
		
		var h=$(window).height()-136; 
		$('.menu-list').height(h);
		
		var main_ht = $(".menu-list").css("height").replace("px","");
		if(window.localStorage.getItem("pat_id"))
		$(".menu-list li").each(function(index){ $(this).css('height',(main_ht/5)+"px").css('line-height',(main_ht/5)+"px");});
		else
		$(".menu-list li").each(function(index){ $(this).css('height',(main_ht/4)+"px").css('line-height',(main_ht/4)+"px");});
		
		if(window.localStorage.getItem("hf_app")){ $("#loading").show();
 $("#pageheader .header").addClass('logo-center'); $("#pageheader").show(); setTimeout(function(){ $("#loading").hide();},300);}
       if(!window.localStorage.getItem("pre_page") || window.localStorage.getItem("pre_page") == "apprequest"){ if(window.localStorage.getItem("hf_app")){$(".home-menu").show();}}
			var initialScreenSize = window.innerHeight;
			window.addEventListener("resize", function() {
			if(window.innerHeight < initialScreenSize){
			 $(".footer-fixed-group").css('position','relative');;
			}
			else{
			 $(".footer-fixed-group").css('position','fixed');                                      
			}
			});
	//});
	/*$(window).resize(function(){
		var h=$(window).height()-136;
		$('.menu-list').height(h);
		var main_ht = $(".menu-list").css("height").replace("px","");
		$(".menu-list li").each(function(index){ $(this).css('height',(main_ht/5)+"px").css('line-height',(main_ht/5)+"px");});
	});*/
	
/* End page resize */
/*document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        alert();
    }*///alert(sessionStorage.getItem("Test"));
	//sessionStorage.setItem("Test", "Test"); 
//window.localStorage.removeItem('doc_req');
if(!window.localStorage.getItem("pat_id")){ $(".panel-control-right.dropdown").hide(); $(".menu-list.main li:last").hide();}


if(window.localStorage.getItem("pre_page") && window.localStorage.getItem("pre_page") != "apprequest") { $(".home-menu").hide(); 
/*$("#loading").show();setTimeout(function(){ $("#loading").hide(); },200);*/$(".panel-control-left").append('<a href="javascript:void(0);"><img alt="Back" src="img/left-arrow.png" height="17" width="9"></a>');
$(".site-title").empty().append('<h4>My profile</h4>');$('body').removeClass('subpagebody');$("#pageheader .header").removeClass('logo-center');
var height = $(window).height();        
   var headr_height = $("#pageheader").height();
   var footr_height = $("#pagefooter").height();
   var setheight = height - headr_height;
   var trueheight = setheight - footr_height;$("#pagecontent").css('position','relative').css('top','70px').css("height", trueheight);
   $("#myprofile_html .main").css("height", trueheight);
$("#"+window.localStorage.getItem("pre_page")).show();window.localStorage.removeItem("pre_page");}


$('#privacy-box').niceScroll({
		cursorcolor: "#2f185c",
        cursorborder: "0",
        autohidemode: true,
        cursormaxheight: 30
	});
	
$(document).on('click',"a.skip",function(){
	$("#loading").show();
	$('body').removeClass('walkthrough-page').addClass('privacy-page');
	$("#emailcheck_html").hide();
	$("#privacy_html").show();
	$('#privacy-box').getNiceScroll().resize();
	setTimeout(function(){ $("#loading").hide(); },300);
	return false;
});

$(document).on('click',"#privacy_html .privacy-footer a",function(){ if($(this).text() == "I Agree"){
	if(!window.localStorage.getItem("hf_app")) window.localStorage.setItem("hf_app",1); 
		$("#loading").show();$("#pagecontent").height($(window).height()-106);
		$('body').removeClass('privacy-page').addClass('home-page');
		$("#pageheader .header").addClass('logo-center');
		$("#pageheader").show();
		$("#privacy_html").hide();
		$(".home-menu").show();
		setTimeout(function(){ $("#loading").hide(); },500);
	}else{ 
		/*if (navigator.app && navigator.app.exitApp) {
			navigator.app.exitApp();
		} else if (navigator.device && navigator.device.exitApp) {
			navigator.device.exitApp();
		}*/
		$('body').addClass('decline-page');
		$("#privacy_html").hide();
		$("#decline_html").show();
	}
	return false;
});


$(".media-list li:eq(4)").bind('click',function(event){  $("#loading").show();event.stopPropagation(); event.preventDefault();event.stopImmediatePropagation();
   $(".panel-control-left").append('<a href="javascript:void(0);"><img alt="Back" src="img/left-arrow.png" height="17" width="9"></a>');
   $(".site-title").empty().append('<h4>My profile</h4>');$('body').removeClass('subpagebody');$("#pageheader .header").removeClass('logo-center');
   var height = $(window).height();        
   var headr_height = $("#pageheader").height();
   var footr_height = $("#pagefooter").height();
   var setheight = height - headr_height;
   var trueheight = setheight - footr_height;
   $("#pagecontent").css('position','relative').css('top','70px').css("height", trueheight);
   $("#myprofile_html .main").css("height", trueheight);
   $(".home-menu").hide(); $("#pageheader, #myprofile_html").show(); setTimeout(function(){ $("#loading").hide(); },300); });
   
$("#myprofile_html li:eq(2) a").bind('click',function(event){ event.stopPropagation(); event.preventDefault();event.stopImmediatePropagation(); $("#loading").show(); $(".site-title h4").empty().append('Consent to Communication'); $("#pagecontent").css('top','0');
	$('body').removeClass('home-page').addClass('consent-page');
	$("#myprofile_html").hide(); $("#consent, .footer-fixed-group").show(); setTimeout(function(){ $("#loading").hide(); },300);
});

$(window).resize(function(){
	var h=$(window).height()-70;
	$('#myprofile_html .main').height(h);
});

$(document).on('click',"#pageheader .panel-control-left a",function(){
	$("#loading").show();
	if($(".site-title h4").html() == "My profile"){
		$("#myprofile_html").hide();
		
		$("#pagecontent").css('position','absolute').css('top','86px');$("#pagecontent").height($(window).height()-86);
		setTimeout(function(){$(".home-menu").show();},300);
		 $(".panel-control-left").empty();
		$(".site-title").empty().append('<img src="img/logo.png" alt="" width="228" height="56">');$("#pageheader .header").addClass('logo-center');
	}
	if($(".site-title h4").html() == "Consent to Communication"){$("#pagecontent").css('top','70px');
		$('body').removeClass('consent-page').addClass('home-page');
		$("#consent, .footer-fixed-group").hide();
		$("#myprofile_html").show();
		$(".site-title h4").empty().append('My profile');
	}
	
	setTimeout(function(){ $("#loading").hide(); },300);
});

$(".dropdown-menu-right li a").click(function(){
	window.localStorage.removeItem("pat_id");
	window.localStorage.removeItem("pat_name");
	window.localStorage.removeItem("pat_phone");
	window.localStorage.removeItem("pat_dob");
	window.localStorage.removeItem("pat_mail");
	window.localStorage.removeItem("pat_reftok");
	window.localStorage.removeItem("pat_acctok");
	window.location.href= "index.html";
});
if(window.localStorage.getItem("pat_phone")) $("#ccphone").val(window.localStorage.getItem("pat_phone")).attr('readonly','readonly').parent().addClass('focused');
if(window.localStorage.getItem("pat_mail")) $("#ccemail").val(window.localStorage.getItem("pat_mail")).attr('readonly','readonly').parent().addClass('focused'); 
$("input[type='checkbox']").on('click',function(){
	$(this).parent().next('div').toggle();
});

var ccemail = $("#ccemail"), ccphone = $("#ccphone");
	ccemail.on('blur keyup',validateCemail);
	ccphone.on('blur keyup focus',validateCphone);

	$('#consent_save').click(function(){ 

	if(typeof $('#checkbox3:checked').val() != "undefined" || typeof $('#checkbox2:checked').val() != "undefined"){ 
		if(validateCemail() & validateCphone()){ 
			var dataString ="email="+$("#ccemail").val()+"&phone="+ccphone.val()+"&cphone="+$("#checkbox3:checked").val()+"&cemail="+$("#checkbox2:checked").val()+"&act=c&id="+window.localStorage.getItem("pat_id");
			$.ajax({
				url:base_url+"mobile-app?page=login",
				type:"POST",
				data:dataString,
				dataType:"json",
				beforeSend:function(){
					$("#loading").show();
				},
				success:function(data){ 
					$("#loading").hide();
					window.localStorage.setItem("pat_phone",$("#ccphone").val()); 
					$(".md-modal").addClass('md-show');
					$(".md-overlay").addClass('md-show');
				}
			});
		}
	}else{
		$("#htmlContent").hide();
		$(".md-modal").addClass('md-show');
		$(".md-overlay").addClass('md-show');
	}
		return false;
	});
	
	function validateCemail(){ 
			var ccemail  = $('#ccemail').val();
			if(typeof $('#checkbox2:checked').val() != "undefined"){
			var filter = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
			if(ccemail == '')
			{
				$('#ccemail').parent().addClass("error");return false;
			}else
				{
					if(filter.test(ccemail)){
						$("#ccemail").parent().removeClass("error").addClass('focused');return true;
					}
					else{
						$('#ccemail').parent().addClass("error");return false;
					}
				}
			} $("#ccemail").parent().removeClass("error").addClass('focused');return true;
		}
		
	function validateCphone(e){
		var ccphone  = $('#ccphone').val();
		if(typeof $('#checkbox3:checked').val() != "undefined"){
			if ($('#ccphone').val().length === 0) {
				$('#ccphone').val('(');
			} var key =0;
			if(e) key = e.keyCode;
			//var key = e.keyCode || 0;
			if (key !== 8 && key !== 9) {
				if ($('#ccphone').val().length === 4) {
					$('#ccphone').val($('#ccphone').val() + ')');
				}
				if ($('#ccphone').val().length === 5) {
					$('#ccphone').val($('#ccphone').val() + ' ');
				}			
				if ($('#ccphone').val().length === 9) {
					$('#ccphone').val($('#ccphone').val() + '-');
				}
			}
			var regexp = /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/; 
			if(regexp.test(ccphone)){
				$("#ccphone").parent().removeClass("error").addClass('focused');return true;
			}
			else{
				$('#ccphone').parent().addClass("error");return false;
			}
		} $("#ccphone").parent().removeClass("error").addClass('focused');return true;
	}
/* end consent form */
if($(document.activeElement).attr('type') == "text"){
    $("#.footer-fixed-group").css('position','relative');
}else{
    $(".footer-fixed-group").css('position','fixed');
}

/*$(document).on('touchstart', '.menu-list a', function(event){
    window.location = $(this).attr('href');
});*/