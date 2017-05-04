var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$("#loading").show();$("#doctorlist").empty(); getDoctors(0,50);
 $("#map").css('height',$(window).height()-220);
window.localStorage.setItem("bg_page","doctor.html"); 
if(!window.localStorage.getItem("pat_id")) $(".panel-control-right.dropdown").hide(); 
else{
$(".md-footer .row-sm").empty().append('<a href="index.html" class="btn btn-light btn-block">Close</a>');
$(".md-footer p").hide();
}
if(!window.localStorage.getItem("lat_long"))
{
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
		 navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
 function onSuccess(position) {
	 window.localStorage.setItem("lat_long",position.coords.latitude+"=="+position.coords.longitude);
	 $.post(base_url+"mobile-app?page=searchDoctor",{latlong:window.localStorage.getItem("lat_long")},function(data){
		 
		 },"json");
    }

 function onError(error) {
       /* alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');*/
    }
}
var i=0;
var docList = new List('teeet', { 
  valueNames: ['provider-name']
});
function getDoctors(page,plimit){
	$.post(base_url+"mobile-app?page=searchDoctor",{latlong:window.localStorage.getItem("lat_long"),q:'',page:page,plimit:plimit},function(data){
		if(data.success == "Y"){ 
			$("#doctorlist").append(data.data.Data);
			var docList = new List('teeet', { 
			  valueNames: ['provider-name']
			});
			docList.on('updated', function(list) { 
				if (list.matchingItems.length > 0) {
					$('#search_res').hide()
				} else {
					$('#search_res').show()
				   
				}
			})
			if($("#pageheader .site-title h4").html() != 'Doctors') $('#doctorlist li.media').hide();
			if(page == '0') $("#loading").hide();
				i++;
				if(i <=2)
				getDoctors(page+plimit,500);
				 } 
			 },"json");
}
$(document).on('click ','#doctorlist li',function(e){ $("#loading").show(); 
	/*$("#doctorlist li").each(function(index, element) {
            
        });*/$('#doctorlist li').hide(); setTimeout(function(){ $("#loading").hide(); },200);
		$("#doc_submit").parent().parent().parent().parent().show();
		$(this).show(); $(".media-right").hide();$("#doctorlist").addClass('pt-0');
	//$(".panel-control-left img").attr('src','img/left-arrow.png').css('height',17).css('width',9);
	$(".header-search").hide();
	$(".site-title h4").empty().html($(this).find('.provider-name').html());
	$(this).removeClass('media');
	$(this).find('.provider-name').hide();
	initMap($(this).find('.provider-address').html(),$(this).attr('data-lat'),$(this).attr('data-long'));
	$("#dpracticeid").val($(this).attr('data-pid'));
	$("#did").val($(this).attr('data-id'));
	$("#dname").val($(this).find('.provider-name').html());
	$("#map").parent().show().css('visibility','visible').css('overflow','visible').css('height','inherit');
	/*$("#doctordetail_html .reach-title").empty().html($(this).text());
	
	$("#dpracticeid").val($(this).attr('data-pid'));
	$("#did").val($(this).attr('data-id'));
	$("#doctordetail_html").show();*/
});		 
		 
	 
$(document).on('click',"#pageheader .panel-control-left a",function(){ 
	if($("#pageheader .site-title h4").html() != "Doctors"){
		$("#loading").show();
		if($("#pageheader .site-title h4").html() != "Request Appointment"){$("#doctorlist").removeClass('pt-0');
			 $("#map").parent().css('visibility','hidden').css('overflow','hidden').css('height','1px');
			$("#doc_submit").parent().parent().parent().parent().hide();
			$(".site-title h4").empty().html('Doctors');$(".media-right").show();
			$(".provider-name").show();$(".header-search").show();
			$("#doctorlist li").each(function(index, element) {
				$(this).show();
				if($(this).attr('class') != "media") $(this).addClass('media');
			});
		}else{$("#doc_submit").parent().parent().parent().parent().show();
			$(".site-title h4").empty().html($("#dname").val());
			$(".reqform").hide();
			$("#map").parent().show();
			$(".myprofile-list").show();
			$('body').removeClass('appointment-page').addClass('provider-page');
		}
		setTimeout(function(){ $("#loading").hide(); },300); return false;
	}else{
		window.localStorage.removeItem("bg_page");
		window.location.href = "index.html";
	}
});


$("#form_mdoctordetail_info").submit(function(){
	$("#loading").show(); 
	$("#map").parent().hide();
	$(".myprofile-list").hide(); $(this).parent().parent().parent().hide();
	$('body').removeClass('provider-page').addClass('appointment-page');
	$(".site-title h4").empty().html('Request Appointment'); 
	if(window.localStorage.getItem("pat_mail")){ 
		if(window.localStorage.getItem("pat_name")){
		var uname = window.localStorage.getItem("pat_name").split(" ");
		$('#rfname').val(uname[0]).attr('readonly','readonly').parent().addClass('focused');
		$('#rlname').val(uname[1]).attr('readonly','readonly').parent().addClass('focused');}
		$("#remail").val(window.localStorage.getItem("pat_mail")).attr('readonly','readonly').parent().addClass('focused');
		if(window.localStorage.getItem("pat_phone") && window.localStorage.getItem("pat_phone") != "undefined")
		$("#rphone").val(window.localStorage.getItem("pat_phone")).attr('readonly','readonly').parent().addClass('focused');
	}
	$(".reqform").show();
	window.localStorage.setItem("c_app", $("#dpracticeid").val()+"=#="+$("#did").val()+"=#="+$("#dname").val());
	window.localStorage.setItem("pre_page", 'apprequest');
	setTimeout(function(){ $("#loading").hide(); },300);
	return false;
});
 
$(document).ready(function(e) {

var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAWRfo3Xtlj926B7XS0E-i2l0ss8Tv-vjI&callback=');
document.body.appendChild(script);
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'js/mobiscroll.custom-3.1.0.min.js');
document.body.appendChild(script);

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

var now = new Date(),
            minDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
            maxDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
			now.setMinutes ( now.getMinutes() + 15 );
			setTimeout(function(){
 $('#rdob').mobiscroll().datetime({
            theme: 'ios',       
            lang: 'en',        
            display: 'center',  
            min: now,       
            max: maxDate,       
			steps: { 
			minute: 15,
				zeroBased: true
		},
		invalid: [
			{ start: '00:00', end: '08:00' }, 
			{ start: '19:00', end: '23:59' }, 
			
		],
            dateWheels: '|D M d|'
        }).attr("readonly", "readonly");
			},8000);

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
					if(window.localStorage.getItem("pat_id")) { $(".popup-btn").hide();$(".popup-link a").empty().append('Continue to Home Screen');}
					$('#appoinmentSuccess').addClass('md-show');
    				$('.md-overlay').addClass('md-show');
					window.localStorage.setItem('doc_req',$("#remail").val()+"=#="+$("#rfname").val()+"=#="+$("#rlname").val()+"=#="+$("#rphone").val())
				}
			});
		}
		return false;
	});
	
	var namefilter = /^[a-zA-Z]+$/;
	function validateRfname(){
		var rfname  = $('#rfname').val();
		if(rfname == ''|| !namefilter.test(rfname))
		{
			$('#rfname').parent().addClass("error");				
			return false;
		}
		$('#rfname').parent().removeClass("error").addClass('focused');
		return true;
	}
	function validateRlname(){
		var rlname  = $('#rlname').val();
		if(rlname == ''|| !namefilter.test(rlname))
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
			$('#rphone').val('(').val($('#rphone').val());
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
	$("#pageheader .site-title h4").empty().append('Doctors');
	$("#"+window.localStorage.getItem("pre_page")).show();
	window.localStorage.removeItem("pre_page");
}
$(document).ready(function(e) {
	//if(!window.localStorage.getItem("pat_id")){ window.location.href="index.html"; }
    //setTimeout(function(){ $("#loading").hide(); },1000);
   var height = $(window).height();        
   var headr_height = $("#pageheader").height();
   var footr_height = $("#pagefooter").height();
   var setheight = height - headr_height;
   var trueheight = setheight - footr_height;
   $(".main").css("height", trueheight);
   
   
   var initialScreenSize = window.innerHeight;
 window.addEventListener("resize", function() {
  if(window.innerHeight < initialScreenSize){
     $(".footer-fixed-group").css('position','relative');;
  }
  else{
     $(".footer-fixed-group").css('position','fixed');                                      
  }
 });
});

$(".media-list li:eq(1)").on('click',function(){ $("#loading").show();
var height = $(window).height();        
   var headr_height = $("#pageheader").height();
   var footr_height = $("#pagefooter").height();
   var setheight = height - headr_height;
   var trueheight = setheight - footr_height;
   $(".main").css("height", trueheight);
 $(".loginlogoheader, #user-profile_html").hide(); $("#pageheader, #myprofile_html").show(); setTimeout(function(){ $("#loading").hide(); },300); });

			
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
			//position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});
google.maps.event.clearInstanceListeners(marker);
        marker.setPosition( new google.maps.LatLng( locations[i][1], locations[i][2] ) );
        //map.panTo( new google.maps.LatLng( locations[i][1], locations[i][2]) );
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



$(".dropdown-menu-right li a").click(function(){
	window.localStorage.removeItem("pat_id");
	window.localStorage.removeItem("pat_name");
	window.localStorage.removeItem("pat_phone");
	window.localStorage.removeItem("pat_dob");
	window.localStorage.removeItem("pat_reftok");
	window.localStorage.removeItem("pat_acctok");
	window.localStorage.removeItem("pat_mail");
	window.localStorage.removeItem("bg_page");
	window.location.href= "index.html";
});

/*$("#doc_search").on("keydown keyup", function(){ var sch_txt = $(this).val().toLowerCase();
$("#loading").show(); 
	if($(this).val().length >= 3)
	{
		$("#doctorlist li").each(function(index, element) {
			$(this).hide();
			if($(this).find('.provider-name').length > 0){
				if ($(this).find('.provider-name').text().toLowerCase().search(sch_txt) > -1) {
                $(this).show(); 
				}
            }
            
        });	
	}else{
		$("#doctorlist li").show();
	}
	$("#loading").hide(); 
});*/
