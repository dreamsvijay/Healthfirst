var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$(".user-name").empty().append(window.localStorage.getItem("pat_name"));
$(".user-number").empty().append(window.localStorage.getItem("pat_phone"));
$(".user-dob").empty().append(window.localStorage.getItem("pat_dob"));
$("#loading").show(); getDoctors(0); $("#map").css('height',$(window).height()-220);
if(!window.localStorage.getItem("pat_id")) $(".panel-control-right.dropdown").hide(); 
else{
$(".md-footer .row-sm").empty().append('<a href="index.html" class="btn btn-light btn-block">Close</a>');
$(".md-footer p").hide();
}
/*document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
 function onSuccess(position) {
	 window.localStorage.setItem("lat_long",position.coords.latitude+"=="+position.coords.longitude);
	 $.post(base_url+"mobile-app?page=searchDoctor",{latlong:window.localStorage.getItem("lat_long")},function(data){
		 
		 },"json");
    }

 function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }*/
var doc_cols = ['#57bb8a','#42b2b7','#7f8bcd','#9575cd','#4db6ac','#0c8bd4']
function getDoctors(page){
	$.post(base_url+"mobile-app?page=searchDoctor",{latlong:"40.71192280==-74.00851830",q:'',page:page},function(data){$("#doctorlist").empty();
		if(data.success == "Y"){ 
			 if(data.data.Count >0){
				 
				for(var i=0;i<data.data.Count;i++){
					var doc_add = new Array;
					if(data.data.Data[i].practice_address1) doc_add.push(data.data.Data[i].practice_address1);
					if(data.data.Data[i].practice_address2) doc_add.push(data.data.Data[i].practice_address2);
					if(data.data.Data[i].practice_city) doc_add.push(data.data.Data[i].practice_city);
					if(data.data.Data[i].practice_state) doc_add.push(data.data.Data[i].practice_state);
					$("#doctorlist").append('<li class="media" data-lat="'+data.data.Data[i].practice_latitude+'" data-long="'+data.data.Data[i].practice_longitude+'" data-id="'+data.data.Data[i].doctor_id+'" data-pid="'+data.data.Data[i].practice_id+'"><a class="media-link" ><div class="media-left media-middle text-nowrap" ><span style="background-color:#0c8bd4" class="doctor_icon">'+data.data.Data[i].doctor_first_name.substr(3,2)+'</span></div><div class="media-body media-middle"><div class="provider-name">'+data.data.Data[i].doctor_first_name+' '+data.data.Data[i].doctor_last_name+'</div><div class="provider-address">'+doc_add.join(", ")+'</div><div class="provider-speciality">'+data.data.Data[i].doctor_specialty+'</div></div><div class="media-right media-middle text-nowrap"><img width="7" height="13" alt="" src="img/arrow-right.png"></div></a></li>');
					}
				} setTimeout(function(){$("#loading").hide();},500);
				//getDoctors(0);
			 } 
			 },"json");
}
$(document).on('click','#doctorlist li',function(e){ $("#loading").show(); 
	$("#doctorlist li").each(function(index, element) {
            $(this).hide();
        }); setTimeout(function(){ $("#loading").hide(); },200);
		$(this).show(); $(".media-right").hide();
	$(".panel-control-left img").attr('src','img/left-arrow.png').css('height',17).css('width',9);
	$(".header-search").hide();
	$(".site-title h4").empty().html($(this).find('.provider-name').html());
	$(this).removeClass('media');
	$(this).find('.provider-name').hide();
	initMap($('#mapaddress').val(),$(this).attr('data-lat'),$(this).attr('data-long'));
	$("#dpracticeid").val($(this).attr('data-pid'));
	$("#did").val($(this).attr('data-id'));
	$("#dname").val($(this).find('.provider-name').html());
	$("#map").parent().show();
	/*$("#doctordetail_html .reach-title").empty().html($(this).text());
	
	$("#dpracticeid").val($(this).attr('data-pid'));
	$("#did").val($(this).attr('data-id'));
	$("#doctordetail_html").show();*/
});		 
		 
	 
$(document).on('click',"#pageheader .panel-control-left a",function(){ 
	if($("#pageheader .site-title h4").html() != "Network Provider"){
		$("#loading").show();
		if($("#pageheader .site-title h4").html() != "Request Appointment"){
			 $("#map").parent().hide();
			$(".panel-control-left img").attr('src','img/menu2.png').css('height',19).css('width',21);
			$(".site-title h4").empty().html('Network Provider');$(".media-right").show();
			$(".provider-name").show();
			$("#doctorlist li").each(function(index, element) {
				$(this).show();
				if($(this).attr('class') != "media") $(this).addClass('media');
			});
		}else{
			$(".site-title h4").empty().html($("#dname").val());
			$(".reqform").hide();
			$("#map").parent().show();
			$(".myprofile-list").show();
			$('body').removeClass('appointment-page').addClass('provider-page');
		}
		setTimeout(function(){ $("#loading").hide(); },300); return false;
	}else
	window.location.href = "index.html";
});


$("#form_mdoctordetail_info").submit(function(){
	$("#loading").show(); 
	$("#map").parent().hide();
	$(".myprofile-list").hide();
	$('body').removeClass('provider-page').addClass('appointment-page');
	$(".site-title h4").empty().html('Request Appointment'); 
	if(window.localStorage.getItem("pat_mail")){
		if(window.localStorage.getItem("pat_name")){
		var uname = window.localStorage.getItem("pat_name").split(" ");
		$('#rfname').val(uname[0]).attr('readonly','readonly').parent().addClass('focused');
		$('#rlname').val(uname[1]).attr('readonly','readonly').parent().addClass('focused');}
		$("#remail").val(window.localStorage.getItem("pat_mail")).attr('readonly','readonly').parent().addClass('focused');
		if(window.localStorage.getItem("pat_phone"))
		$("#rphone").val(window.localStorage.getItem("pat_phone")).attr('readonly','readonly').parent().addClass('focused');
	}
	$(".reqform").show();
	window.localStorage.setItem("c_app", $("#dpracticeid").val()+"=#="+$("#did").val()+"=#="+$("#dname").val());
	window.localStorage.setItem("pre_page", 'apprequest');
	setTimeout(function(){ $("#loading").hide(); },300);
	return false;
});
 
$(document).ready(function(e) {
		/*$("#rdob").datetimepicker({
		format: "mm/dd/yyyy hh:ii",
		autoclose: true,
		disableTouchKeyboard: true,
		Readonly: true,
		startDate: '+0d',
		minuteStep: 15,
		inline: true,
		hoursDisabled: [0,1,2,3,4,5,6,7,19,20,21,22,23],
		
	}).on("changeDate", function (e) {
		$('#start-time-before').html(e.date); // Log
		var TimeZoned = new Date(e.date.setTime(e.date.getTime() + (e.date.getTimezoneOffset() * 60000)));
		$('#time-end').datetimepicker('setStartDate', TimeZoned);
		$('#time-start').datetimepicker('setDate', TimeZoned);
		$('#start-time-adjusted').html(TimeZoned); // Log
	}).attr("readonly", "readonly");
*/


	var logic = function( currentDateTime ){
	var now = new Date();
        var _d_date = currentDateTime.getDate();
        var _date = now.getDate();
		$('#rdob').parent().removeClass("error").addClass('focused');
        if (_date === _d_date) {
            this.setOptions({
                minTime: 0,
				maxTime:'6:00 PM'
            });
        } else {
            this.setOptions({
                minTime: '8:00 AM',
				maxTime:'6:00 PM'
            });
        }
		
};
$('#rdob').datetimepicker({
	//lang: 'en',
	format: 'm/d/Y h:i A',
	formatTime: 'h:i A',
	formatTimeScroller: 'h:i A',
	minDate: 0,
	onChangeDateTime:logic,
	onShow:logic,
	className: 'datepicker_position',
	step: 15,
	scrollMonth: false,
	scrollTime: false,
	scrollInput: false,
}).attr("readonly", "readonly");


	var rfname = $("#rfname"), rlname = $("#rlname"), remail = $("#remail"), rphone = $("#rphone"), rdob = $("#rdob");
	rfname.on('blur keyup',validateRfname);
	rlname.on('blur keyup',validateRlname);
	rdob.on('blur keyup focus',validateRdob);
	rphone.on('blur keyup focus',validateRphone);
	remail.on('blur keyup',validateRemail);

	$('#apprequest').submit(function(){ 
		if(validateRfname() & validateRlname() & validateRdob() & validateRphone() & validateRemail())
		{ 
			var dataString ="uname="+$("#remail").val()+"&fname="+rfname.val()+"&lname="+rlname.val()+"&dob="+rdob.val()+"&phone="+rphone.val()+"&practiceid="+$("#dpracticeid").val()+"&did="+$("#did").val();
			$(".md-body h4 span").empty().html($("#dname").val());
			$(".md-body p span").empty().html($("#rdob").val());
			$.ajax({
				url:base_url+"mobile-app?page=apptrequest",
				type:"POST",
				data:dataString,
				dataType:"json",
				beforeSend:function(){
					$("#loading").show();
				},
				success:function(data){ 
					$("#loading").hide(); 
					$('#appoinmentSuccess').addClass('md-show');
    				$('.md-overlay').addClass('md-show');
					window.localStorage.setItem('doc_req',$("#remail").val()+"=#="+$("#rfname").val()+"=#="+$("#rlname").val()+"=#="+$("#rphone").val())
				}
			});
		}
		return false;
	});
	
	
	function validateRfname(){
		var rfname  = $('#rfname').val();
		if(rfname == '')
		{
			$('#rfname').parent().addClass("error");				
			return false;
		}
		$('#rfname').parent().removeClass("error").addClass('focused');
		return true;
	}
	function validateRlname(){
		var rlname  = $('#rlname').val();
		if(rlname == '')
		{
			$('#rlname').parent().addClass("error");				
			return false;
		}
		$('#rlname').parent().removeClass("error").addClass('focused');
		return true;
	}
	function validateRdob(){
		var rdob  = $('#rdob').val();
		if(rdob == '')
		{
			$('#rdob').parent().addClass("error");				
			return false;
		}
		$('#rdob').parent().removeClass("error").addClass('focused');
		return true;
	}
	
	function validateRphone(e){
		var rphone  = $('#rphone').val();
		if ($('#rphone').val().length === 0) {
			$('#rphone').val('(');
		} var key =0;
		if(e) key = e.keyCode;
		//var key = e.keyCode || 0;
		if (key !== 8 && key !== 9) {
			if ($('#rphone').val().length === 4) {
				$('#rphone').val($('#rphone').val() + ')');
			}
			if ($('#rphone').val().length === 5) {
				$('#rphone').val($('#rphone').val() + ' ');
			}			
			if ($('#rphone').val().length === 9) {
				$('#rphone').val($('#rphone').val() + '-');
			}
		}
		var regexp = /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/; 
		if(regexp.test(rphone)){
			$("#rphone").parent().removeClass("error");
			return true;
		}
		else{
			$('#rphone').parent().addClass("error").addClass('focused');
			return false;
		}
	
	}


function validateRemail(){
		var remail  = $('#remail').val();
		var filter = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
		if(remail == '')
		{
			$('#remail').parent().addClass("error");				
			return false;
		}else
			{
				if(filter.test(remail)){
					$("#remail").parent().removeClass("error");
					return true;
				}
				else{
					$('#remail').parent().addClass("error").addClass('focused');
					return false;
				}
			}
	}
	
})		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 

if(window.localStorage.getItem("pre_page")){
	$("#user-profile_html").hide();
	$("#pageheader").show();
	$(".loginlogoheader, #user-profile_html").hide();
	$("#pageheader .site-title h4").empty().append('My profile');
	$("#"+window.localStorage.getItem("pre_page")).show();
	window.localStorage.removeItem("pre_page");
}
$(document).ready(function(e) {
	//if(!window.localStorage.getItem("pat_id")){ window.location.href="index.html"; }
    setTimeout(function(){ $("#loading").hide(); },1000);
   var height = $(window).height();        
   var headr_height = $("#pageheader").height();
   var footr_height = $("#pagefooter").height();
   var setheight = height - headr_height;
   var trueheight = setheight - footr_height;
   $(".main").css("height", trueheight);
});

$(".media-list li:eq(1)").on('click',function(){ $("#loading").show();
var height = $(window).height();        
   var headr_height = $("#pageheader").height();
   var footr_height = $("#pagefooter").height();
   var setheight = height - headr_height;
   var trueheight = setheight - footr_height;
   $(".main").css("height", trueheight);
 $(".loginlogoheader, #user-profile_html").hide(); $("#pageheader, #myprofile_html").show(); setTimeout(function(){ $("#loading").hide(); },300); });

/*$('#doctorsearch')
	.autocomplete(base_url+"mobile-app?page=searchDoctor", acOptions_doctor)
	.result(function(e, data) {
		$("#loading").show();
		$('body').removeClass('profile-page2').addClass('user-profile-page').addClass('doctor-profile-page');
		$("#user-profile_html").hide();
		$(".loginlogoheader").hide();
		$("#pageheader, #doctordetail_html").show();
		$("#pageheader .site-title h4").empty().append('DOCTOR PROFILE');
		$("#dpracticeid").val(data[5]);
		$("#did").val(data[1]);
		$("#dname").val(data[0]);
		$("#mapaddress").val(data[3]+" "+data[4]);
		$("#lat").val(data[6]);
		$("#lng").val(data[7]);
		
		$(".docteraddressdiv .reach-title").empty().append(data[0]);
		$(".docteraddressdiv .reach-subtitl").empty().append(data[9]);
		$(".docteraddressdiv .speciality_row span").empty().append(data[2]);
		$(".calbutton a").attr("href","tel://"+data[8]);
		$(".address_row").empty().append(data[3]+"<br />"+data[4]);
		initMap($('#mapaddress').val(),$('#lat').val(),$('#lng').val());
		setTimeout(function(){ $("#loading").hide(); },300);
		});*/
			
	var acOptions_doctor = {
    minChars: 2,
    cacheLength: 50,
    max: 50,
    multiple: false,
    formatItem: function(value) {
        var markup = "<div class='select2-result-doctor clearfix'><div class='doctorInfo'>" +
                "<div class='title'>" + value[0] + "</div>" +
                "<div class='ptitle'>" + value[2] + "</div>" +
                "<div class='sname'>" + value[3] + "</div>" +
                "<div class='paddress'>" + value[4] + "</div></div></div>";
        return markup;
    }
};
	
	
function initMap(mapaddress,lat,lng) {
	var locations = [
		[''+mapaddress+'', ''+lat+'', ''+lng+'']

	];

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: new google.maps.LatLng(''+lat+'', ''+lng+''),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow();

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
						'Place ID: ' + place.place_id + '<br>' +
						place.formatted_address + '</div>');
				infowindow.open(map, this);
			});
		})(marker, i));
	}
}


$("#myprofile_html").click(function(){
	window.localStorage.setItem("pre_page", 'myprofile_html');
});



/*if($(document.activeElement).attr('type') == "text"){
    $("#doc_submit").parent().parent().css('position','relative');
}else{
    $("#doc_submit").parent().parent().css('position','relative');
}*/

$(".dropdown-menu-right li a").click(function(){
	window.localStorage.removeItem("pat_id");
	window.localStorage.removeItem("pat_name");
	window.localStorage.removeItem("pat_phone");
	window.localStorage.removeItem("pat_dob");
	window.localStorage.removeItem("pat_reftok");
	window.localStorage.removeItem("pat_acctok");
	window.location.href= "index.html";
});