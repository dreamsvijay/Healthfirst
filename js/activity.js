var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$(".user-name").empty().append(window.localStorage.getItem("pat_name"));
$(".user-number").empty().append(window.localStorage.getItem("pat_phone"));
$(".user-dob").empty().append(window.localStorage.getItem("pat_dob"));
$(document).ready(function(e) {
   $("#loading").show();
  
   $(".media-list").css('padding-top','0px');
	if(!window.localStorage.getItem("pat_id")){ window.location.href="index.html"; }
	 getActivity(0,20); 
	var i=1;
	
	function getActivity(page,plimit){
		$.post(base_url+"mobile-app?page=getActivity",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok"),page:page,plimit:plimit},
	function(data){ $(".no-result-container").remove();	$(".event-list").show(); $("#htmlContent").height('inherit');
		if(data.success == "Y"){
			for(var i=0;i<data.data.length;i++){
				$(".event-list").append(data.data[i]);
			}
			getActivity(page+plimit,50);
		}else{ if(i ==1){$(".event-list").hide(); $("#htmlContent").height($(window).height()-70);
			$("#htmlContent").append('<div class="no-result-container"><div class="no-result"><div class="no-result-inner"><div class="no-result-img"><img alt="Back" src="img/cloud.png" width="63" height="52"></div><div class="no-result-cont"><p>No Activity</p></div></div></div></div>');}
		}
		$("#loading").hide(); 
		i++;
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