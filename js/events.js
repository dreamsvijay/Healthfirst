//var base_url = "https://dev.yosicare.com/healthyvillage-app/";
var base_url = "https://healthfirst.yosicare.com/dev/hf-app/"; 
$(".user-name").empty().append(window.localStorage.getItem("pat_name"));
$(".user-number").empty().append(window.localStorage.getItem("pat_phone")); 
$(".user-dob").empty().append(window.localStorage.getItem("pat_dob"));
if(!window.localStorage.getItem("pat_id")) $(".panel-control-right.dropdown").hide(); 
else $("#addappointment").val('Register');
$(document).ready(function(e) {$("#loading").show(); var Eid;
if(window.localStorage.getItem("evt_id")){ Eid = window.localStorage.getItem("evt_id"); window.localStorage.removeItem("evt_id"); }
    //setTimeout(function(){ $("#loading").hide(); },1000);
	//if(!window.localStorage.getItem("pat_id")){ window.location.href="index.html"; }
	$.post(base_url+"mobile-app?page=getevents",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok"),"Edate":"01/20/2017",latlong:"40.71192280==-74.00851830","Eid":Eid},
	function(data){
		$("#loading").hide(); 
		/*for(var i=0;i<data.data.result.length;i++){
			for(var j=0;j<data.data.result[i].length;j++){ alert(data.data.result[i]);
			$(".event-list").append(data.data.result[i][j]);
			}
		}*/
		var date_arr = new Array;
		 $.each(data.data.result, function(index, value){
		  for(var j=0;j<value.length;j++){ 
			$.each(value[j],function(index,value){var row_date = index.replace('"',"").replace('"',"");var rowdt=''; if($.inArray(row_date,date_arr) == -1){date_arr.push(row_date);rowdt=row_date;} 
			if(value)$(".event-list").append('<li class="media event-date-time"><div class="event-line"><span class="timestamp">'+rowdt+'</span></div></li>'+value);
			});
			}
		});
		
		
		/*var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		for(var i=0;i<data.data.length;i++){
			var event_date = data.data[i]['start_date'].split("/");
			var today = new Date(event_date[2]+"-"+event_date[0]+"-"+event_date[1]);
            var dd = today.getDate(); 
			$(".event-list").append('<li class="media"><a href="javascript:;" class="media-link select_event" data-eventname="'+data.data[i]['name']+'" data-eventid="'+data.data[i]['id']+'" data-event="'+data.data[i]['start_date']+'"><div class="media-left"><span class="status-icon"></span></div><div class="media-body media-middle text-nowrap"><div class="event-time2">'+data.data[i]['start_time']+'</div><div class="event-location">'+data.data[i]['name']+'</div><div class="event-address">'+data.data[i]['address']+'</div></div></a></li>');
		}
		$("#confirmation_html").css('display','none').css('visibility','visible');*/
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




$(document).on('click', '.event-list a.media-link', function(e) { $("#loading").show(); 
			$(".site-title h4").empty().append($(this).find('.event-title').html());
			$(".panel-control-left img").attr('src','img/left-arrow.png').css('height',17).css('width',9);
			var action = 'eventselect'; $("#event_id").val($(this).parent().data('id'));$("#event_sid").val($(this).parent().data('sid'));
			$(".event-list").hide();
			$(".location-box").find('.event_loc').empty().append($(this).find('.event-location').html());
			$(".event-timebox").find('.event_time').empty().append($(this).parent().data('edate')+", "+$(this).parent().data('time'));
			$(".desc-content:first p").empty().append($(this).find('.event-desc').html());
			var event_res = $(this).find('.event_res').html().split("|");
			$(".restrict-content ul").empty();$(".res_contact p").empty().append('Contact Name : '+$(this).parent().data('cont'));
			$.each(event_res,function(index, value){
				$(".restrict-content ul").append('<li><p><span class="bullet-icon"></span> '+value+'</p></li>');
			}); $(".header-search").hide();
			initMap($(this).find('.event-location').html(),$(this).parent().data('lat'),$(this).parent().data('long'));
			 var divHeight = $(".desc-content p").height()
			 var lineHeight = parseInt($(".desc-content p").css('line-height'));
			 var lines = divHeight / lineHeight;
			 if(lines > 4){ $(".desc-content:first p").addClass('showcont');$(".read-more").show();}
			 else {
			 	$(".desc-content:first p").removeClass('showcont'); $(".read-more").hide();
			 }
			/*var id = $(this).data('eventid'); $("#event_id").val($(this).data('eventid'));
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
           $("#confirmation_html").show();*/
			setTimeout(function(){ $("#loading").hide(); $(".event_view").show();},200);
		return false;
		});
$('#addappointment').click(function(){ 
	$("#loading").show(); 
	window.localStorage.setItem('event_dtl',$("#event_id").val()+"=#="+$("#event_sid").val()+"=#="+$(".event_time").html()+"=#="+$(".site-title h4").html()); 
		if(window.localStorage.getItem("pat_id")){
			$.ajax({
				url:base_url+"mobile-app?page=addAppointment",
				type:"POST",
				data:"event_id="+$("#event_id").val()+"&event_sid="+$("#event_sid").val()+"&event_date="+$(".event_time").html()+"&pat_id="+window.localStorage.getItem("pat_id")+"&pat_acctok="+window.localStorage.getItem("pat_acctok")+"&pat_reftok="+window.localStorage.getItem("pat_reftok")+"&ptype=non-clinic",
				dataType:"json",
				success:function(data){ 
					$("#loading").hide(); 
					if(data.success == "Y"){
						var event_dtl = window.localStorage.getItem("event_dtl").split("=#=");
						$("#appoinmentSuccess .md-body h4").append('Your Request to <span>'+event_dtl[3]+'</span> for Appointment on : '+event_dtl[2]);
						 $('#appoinmentSuccess').addClass('md-show');
						 $('.md-overlay').addClass('md-show');
					}
				}
			});
		}else{
			window.location.href="register.html";
		}
	return false;
	});		

$(document).on('click',"#pageheader .panel-control-left a",function(){
	if($(".site-title h4").text() != "Event List")
	{ 	$("#loading").show();$(".desc-content p").removeClass('showcont'); $(".read-more").hide();$(".header-search").show();
	//$('html,body').animate({ scrollTop: 0 }, 300);
		$(".panel-control-left img").attr('src','img/menu2.png').css('height',19).css('width',21);
		$(".event-list").show(); $(".event_view").hide(); $(".site-title h4").empty().append('Events'); setTimeout(function(){ $("#loading").hide(); },300); return false;	
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
	window.location.href= "index.html";
});