//var base_url = "https://dev.yosicare.com/healthyvillage-app/";
var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$(".user-name").empty().append(window.localStorage.getItem("pat_name"));
$(".user-number").empty().append(window.localStorage.getItem("pat_phone"));
$(".user-dob").empty().append(window.localStorage.getItem("pat_dob"));
$(document).ready(function(e) {
    $("#loading").show();
	
	if(!window.localStorage.getItem("pat_id")){ window.location.href="index.html"; }
	getMycareteam(0,20); 
	
	function getMycareteam(page,plimit){
		$.post(base_url+"mobile-app?page=mycareteam",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok"),page:page,plimit:plimit},
	function(data){
		$(".no-result-container").remove();$("#htmlContent").height('inherit'); 
		$("#loading").hide();$(".reminder-wrap").show();
		var app_time = new Array;
		if(data.success == "Y"){
			for(var i=0;i<data.data.length;i++){
				if($.inArray(data.data[i]['app_time'],app_time) == "-1"){
					$(".mycare-list").append('<li class="media event-date-time" ><div class="event-line"><span class="timestamp">'+data.data[i]['app_date']+'</span></div></li>');
					app_time.push(data.data[i]['app_time']);
				}
				$(".mycare-list").append('<li class="media"><a href="javascript:void(0);" class="media-link"><div class="media-left"><img src="img/profile-img.png" class="care-dr-img" alt="" width="47" height="47"></div><div class="media-body media-middle text-nowrap">								<div class="care-dr-name">'+data.data[i]['doctor_first_name']+" "+data.data[i]['doctor_last_name']+'</div><span class="speciality">'+data.data[i]['doctor_specialty']+'</span></div></a></li>');
			}
			getMycareteam(page+plimit,50);
		}else{ if(page == 0){$(".reminder-wrap").hide(); $("#htmlContent").height($(window).height()-70); 
			$("#htmlContent").append('<div class="no-result-container"><div class="no-result"><div class="no-result-inner"><div class="no-result-img"><img alt="Back" src="img/cloud.png" width="63" height="52"></div><div class="no-result-cont"><p>My Care Team section will be updated as soon you visit a doctor through the Healthy Village App.</p></div></div></div></div>');}
		}
		$("#loading").hide();
	},"json");
		
			}
	
});

	
$(document).on('click',"#pageheader .panel-control-left a",function(){
	$("#loading").show(); 
	window.localStorage.setItem("pre_page",'myprofile_html');
	window.location.href = "index.html";
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
