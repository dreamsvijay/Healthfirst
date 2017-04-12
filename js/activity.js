var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$(".user-name").empty().append(window.localStorage.getItem("pat_name"));
$(".user-number").empty().append(window.localStorage.getItem("pat_phone"));
$(".user-dob").empty().append(window.localStorage.getItem("pat_dob"));
$(document).ready(function(e) {
   $("#loading").show(); 
	if(!window.localStorage.getItem("pat_id")){ window.location.href="index.html"; }
	$.post(base_url+"mobile-app?page=getActivity",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok")},
	function(data){ 	
		if(data.success == "Y"){
			for(var i=0;i<data.data.length;i++){
				$(".event-list").append(data.data[i]);
			}
		}else{
			$(".event-list").append('<li class="media">No Activity</li>');
		}
		$("#loading").hide(); 
	},"json");
	
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