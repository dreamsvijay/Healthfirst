//var base_url = "https://dev.yosicare.com/healthyvillage-app/";
var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$(".user-name").empty().append(window.localStorage.getItem("pat_name"));
$(".user-number").empty().append(window.localStorage.getItem("pat_phone"));
$(".user-dob").empty().append(window.localStorage.getItem("pat_dob"));
$(document).ready(function(e) {
    //setTimeout(function(){ $("#loading").hide(); },1000);
	if(!window.localStorage.getItem("pat_id")){ window.location.href="index.html"; }
	$.post(base_url+"mobile-app?page=getevents",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok"),"Edate":"01/20/2017"},
	function(data){
		$("#loading").hide();
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		for(var i=0;i<data.data.length;i++){
			var event_date = data.data[i]['start_date'].split("/");
			var today = new Date(event_date[2]+"-"+event_date[0]+"-"+event_date[1]);
            var dd = today.getDate(); 
			$(".event-list").append('<li class="media"><a href="javascript:;" class="media-link select_event" data-eventname="'+data.data[i]['name']+'" data-eventid="'+data.data[i]['id']+'" data-event="'+data.data[i]['start_date']+'"><div class="media-left"><span class="status-icon"></span></div><div class="media-body media-middle text-nowrap"><div class="event-time2">'+data.data[i]['start_time']+'</div><div class="event-location">'+data.data[i]['name']+'</div><div class="event-address">'+data.data[i]['address']+'</div></div></a></li>');
		}
		$("#confirmation_html").css('display','none').css('visibility','visible');
	},"json");
	
});

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




$(document).on('click', '.event-list .select_event', function(e) { 
			$(".site-title h4").empty().append($(this).find('.event-location').html());
			$(".panel-control-left img").attr('src','img/left_arrow.png');
			var action = 'eventselect';
			$(".search-icon").hide();
			var id = $(this).data('eventid'); $("#event_id").val($(this).data('eventid'));
			var val =$(this).data('event'); $("#event_date").val($(this).data('event'));
			var eventname =$(this).data('eventname'); $(".success_content h4 span").empty().append($(this).data('eventname'));
			$('#loading').show();
			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI","SAT"];
			var event_date = $(this).data('event').split("/");
			var today = new Date(event_date[2]+"-"+event_date[0]+"-"+event_date[1]);
            var dd = today.getDate(); 
			$(".reach-title").empty().append(dayNames[today.getDay()]+", "+monthNames[today.getMonth()]+" "+event_date[0]+", "+event_date[2]+" @ "+$(this).find('.event-time2').html());
			$(".header").addClass('doc-page-header');
			$(".reach-subtitle").empty().append($(this).find('.event-location').html());
			$(".address_row").empty().append($(this).find('.event-address').html());
			initMap($(this).find('.event-address').html(),"40.75505860","-73.98167810");
			setTimeout(function(){ $("#loading").hide(); },500);
			$("#events_html").hide();
           $("#confirmation_html").show();
			
		return false;
		});
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

$(document).on('click',"#pageheader .panel-control-left a",function(){
	if($(".site-title h4").text() != "Events")
	{ 	$(".header").removeClass('doc-page-header');
		$(".panel-control-left img").attr('src','img/menu2.png');
		$("#loading, .search-icon").show(); $("#events_html").show(); $("#confirmation_html").hide(); $(".site-title h4").empty().append('Events'); setTimeout(function(){ $("#loading").hide(); },300);	
	}else
	window.location.href= "home.html";
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

/*$("#pageheader .panel-control-left a").on('click',function(){ $("#loading").show(); $("#events_html").show(); $("#confirmation_html").hide(); $(".site-title h4").empty().append('Events'); setTimeout(function(){ $("#loading").hide(); },300); return false; });*/