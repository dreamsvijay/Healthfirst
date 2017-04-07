var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$(".user-name").empty().append(window.localStorage.getItem("pat_name"));
$(".user-number").empty().append(window.localStorage.getItem("pat_phone"));
$(".user-dob").empty().append(window.localStorage.getItem("pat_dob"));if(!window.localStorage.getItem("pat_id")) $(".panel-control-right.dropdown").hide(); 
var event_arr= new Array, event_ids = new Array;
$(document).ready(function(e) { 
	$("#loading").show();
	$.post(base_url+"mobile-app?page=getQuestions",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok")},
	function(data){ $("#loading").hide();
		if(data.success == "Y"){
			
			var question = '';
			var qcnt=0;
			$.each(data.data.Data, function(key, value) { 
					question += '<li id="list_'+value['id']+'" class="list-group-item"><div class="row"><label class="col-md-12 control-label">'+value['question']+'</label><div class="col-sm-12"><div class="row">';
				for(var j=0;j<value['def_answers'].length;j++){ var chk='';
					if(value['answerId'] == (j+1)) chk='checked';
					question += '<div class="col-sm-4"><div class="radio radio-primary"><input name="optradio_'+value['id']+'" class="selected_answer" id="question_'+value['def_answers'][j]['id']+'" value="'+(j+1)+'"  type="radio" '+chk+'><label for="question_'+value['def_answers'][j]['id']+'">'+value['def_answers'][j]['name']+'</label></div></div>';
				}
				question += '</div></div></div></li>';
				qcnt++;
				});
			$(".question-list").append(question);
			$("#total_question_count").val(qcnt);
			$("#loading").hide(); 
			if($("[type='radio']:checked").length == $('#total_question_count').val()) $("#submit_button").show();
			$.each(data.data.Event, function(key, value) { 
				event_arr[key] = value;
			});
			
		}
	},"json");
	
});


$(document).on('click', '.event-list .select_event', function(e) { 
			var action = 'eventselect';
			var id = $(this).data('eventid');
			var val =$(this).data('event');
			var eventname =$(this).data('eventname');
			$('#loading').show();
			setTimeout(function(){ $("#loading").hide(); },500);
			$("#events_html").hide();
            $("#confirmation_html").show();
		});
		


var curPos = 0;
$('body').on('click', '.selected_answer', function(){ 
	var bottom = offsetBottom(this);
	var right = offsetRight(this);
	
	var bottom2 = $(window).height() - bottom;
	if(bottom2 < 80) 
	{ 
	curPos = curPos + 270;	
	$('html , body').animate({scrollTop:curPos},3500 );	
	}
	if($("[type='radio']:checked").length == $('#total_question_count').val()) $("#submit_button").show();	
});
function offsetBottom(el, i) { i = i || 0; return $(el)[i].getBoundingClientRect().bottom } 
// Returns right offset value
function offsetRight(el, i) { i = i || 0; return $(el)[i].getBoundingClientRect().right }





$('body').on('click', '#submit_button', function(e){ //alert(event_arr);
			 $("#loading").show(); 
			 $("input[type='radio']:checked").each(function(index, element) {
                if($(this).val() == 2 || $(this).val() == 3){
					var cur_qu = $(this).attr('name').replace("optradio_",""); 
					$.each(event_arr,function(index,value){
						if(value){ //if($.isArray(value)) alert(value);
							$.each(value,function(ind,valu){
								if(cur_qu == valu) event_ids.push(index);
							});
						}
					});
				}
				
            });
			window.localStorage.setItem("evt_id",event_ids);
			if(window.localStorage.getItem("pat_id")){
				$.ajax({
					url:base_url+"mobile-app?page=saveQuestions",
					type:"POST",
					data:$('#question_submit').serialize() + "&pat_id="+window.localStorage.getItem("pat_id")+"&pat_acctok="+window.localStorage.getItem("pat_acctok")+"&pat_reftok="+window.localStorage.getItem("pat_reftok"),
					dataType:"json",
					success:function(data){ 
						$("#loading").hide(); 
						if(data.success == "Y"){
							window.location.href='events.html';
						}
					}
				});
			}else
		window.location.href='events.html';
			e.preventDefault();
		});
		
$(document).on('click',"#pageheader .panel-control-left a",function(){
	$("#loading").show(); 
	window.location.href = "home.html";
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