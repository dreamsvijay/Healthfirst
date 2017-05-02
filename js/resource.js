var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
if(!window.localStorage.getItem("pat_id")) $(".panel-control-right.dropdown").hide(); 
$(document).ready(function(e) {$("#loading").show();
    //setTimeout(function(){ $("#loading").hide(); },1000);
	//if(!window.localStorage.getItem("pat_id")){ window.location.href="index.html"; }
	$.post(base_url+"mobile-app?page=getresources",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok"),latlong:"40.71192280==-74.00851830"},
	function(data){
		$("#loading").hide(); 
		var date_arr = new Array;
		 $.each(data.data.Data, function(index, value){
		  $(".event-list").append(value);
		});
		
	},"json");
	
});

$(document).on('click', '.event-list a.media-link', function(e) { $("#loading").show(); 
	$(".site-title h4").empty().append($(this).find('.event-title').html());
	//$(".panel-control-left img").attr('src','img/left-arrow.png').css('height',17).css('width',9);
	var action = 'eventselect';$("#pagecontent").height($(window).height()-150);
	$(".event-list").hide();$(".event_view, .footer-fixed-group").show();
	$(".location-box").find('.event_loc').empty().append($(this).find('.event-location').html());
	$(".desc-content:first p").empty().append($(this).find('.event-desc').html());
	$(".res_contact p").empty().append('Contact Name : '+$(this).parent().data('cont'));
	var event_res = $(this).find('.event_res').html().split("|");
	$(".restrict-content ul").empty();
	$.each(event_res,function(index, value){
		$(".restrict-content ul").append('<li><p><span class="bullet-icon"></span> '+value+'</p></li>');
	});
	initMap($(this).find('.event-location').html(),$(this).parent().data('lat'),$(this).parent().data('long'));
	 var divHeight = $(".desc-content p").height()
	 var lineHeight = parseInt($(".desc-content p").css('line-height'));
	 var lines = divHeight / lineHeight;
	 if(lines > 4){ $(".desc-content p").addClass('showcont');$(".read-more").show();}
	 else {
		$(".desc-content p").removeClass('showcont'); $(".read-more").hide();
	 }
	$("#res_email").attr('href','mailto:'+$(this).parent().data('email'));
	$("#res_phone").attr('href','tel:'+$(this).parent().data('phone'));
	setTimeout(function(){ $("#loading").hide(); },300);
	return false;
});



$(document).on('click',"#pageheader .panel-control-left a",function(){
	if($(".site-title h4").text() != "Resource finder")
	{ 	$("#loading").show();$(".desc-content p").removeClass('showcont'); $(".read-more").hide();$("#pagecontent").height('');
		//$(".panel-control-left img").attr('src','img/menu2.png').css('height',19).css('width',21);
		$(".event-list").show(); $(".event_view, .footer-fixed-group").hide(); $(".site-title h4").empty().append('Resource finder'); setTimeout(function(){ $("#loading").hide(); },300); return false;	
	}else
	window.location.href= "index.html";
});

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






















var step = 100;
var scrolling = false;

$("#scrollRight").bind("click", function(event) {
    event.preventDefault();
    $(".month-list").animate({
        scrollLeft: "-=" + step + "px"
    });
});
$("#scrollLeft").bind("click", function(event) {
    event.preventDefault();
    $(".month-list").animate({
        scrollLeft: "+=" + step + "px"
    });
});
function scrollContent(direction) {
    var amount = (direction === "right" ? "-=1px" : "+=1px");
    $(".month-list").animate({
        scrollLeft: amount
    }, 1, function() {
        if (scrolling) {
            scrollContent(direction);
        }
    });
}

var step = 100;
var scrolling = false;

$("#backyear").bind("click", function(event) {
    event.preventDefault();
    $(".year-list").animate({
        scrollLeft: "-=" + step + "px"
    });
});

$("#frontyear").bind("click", function(event) {
    event.preventDefault();
    $(".year-list").animate({
        scrollLeft: "+=" + step + "px"
    });
});
function scrollContent(direction) {
    var amount = (direction === "right" ? "-=1px" : "+=1px");
    $(".year-list").animate({
        scrollLeft: amount
    }, 1, function() {
        if (scrolling) {
            scrollContent(direction);
        }
    });
}




$('#addappointment').submit(function(){ 
	$("#loading").show(); 
	
			$.ajax({
				url:base_url+"mobile-app?page=addAppointment",
				type:"POST",
				data:$('#addappointment').serialize() + "&pat_id="+window.localStorage.getItem("pat_id")+"&pat_acctok="+window.localStorage.getItem("pat_acctok")+"&pat_reftok="+window.localStorage.getItem("pat_reftok")+"&ptype=non-clinic",
				dataType:"json",
				success:function(data){ 
					$("#loading").hide(); 
					if(data.success == "Y"){
						 $('#non_appoinmentSuccess').addClass('md-show');
    					 $('.md-overlay').addClass('md-show');
					}
				}
			});
		return false;
	});		



$(document).on('click',".search-icon a",function(){
	$(".event-search input").val('');
	$(".event-search").toggle();
	return false;
});

$("a.read-more").click(function(){
	$(".desc-content p").toggleClass('showcont'); $(this).toggle(); return false;
});

$(".dropdown-menu-right li a").click(function(){
	window.localStorage.removeItem("pat_id");
	window.localStorage.removeItem("pat_name");
	window.localStorage.removeItem("pat_phone");
	window.localStorage.removeItem("pat_dob");
	window.localStorage.removeItem("pat_reftok");
	window.localStorage.removeItem("pat_acctok");
	window.localStorage.removeItem("pat_mail");
	window.location.href= "index.html";
});

$(document).on('click','a span[data-toggle]',function(){ 
	$(this).toggleClass('collapsed');
	$(this).parent().parent().next('div').toggleClass('in');
});