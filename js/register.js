var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$(".js-example-basic-single").select2({
	  minimumResultsForSearch: Infinity
	});
	
	$('#dob').datetimepicker({
	format: 'm/d/Y',
	maxDate: 0,
	timepicker:false,
	autoclose: true,keepOpen: false, 
	className: 'datepicker_register',
	closeOnDateSelect:true,
	onChangeDateTime:function( currentDateTime ){
	$('#dob').parent().removeClass("has-error");
	},
}).attr("readonly", "readonly");
	if(window.localStorage.getItem('doc_req')){
		var doc_req_dtl = window.localStorage.getItem('doc_req').split('=#=');
		$("#fname").val(doc_req_dtl[1]).attr('readonly','readonly');$("#lname").val(doc_req_dtl[2]).attr('readonly','readonly');$("#email").val(doc_req_dtl[0]).attr('readonly','readonly');window.localStorage.removeItem('doc_req');
	}
	var fname = $("#fname"), lname = $("#lname"), email = $("#email"), password = $("#password"), dob = $("#dob"), gender = $("#gender");
	fname.on('blur keyup',validateFname);
	lname.on('blur keyup',validateLname);
	dob.on('blur keyup focus',validateDob);
	email.on('blur keyup',validateEmail);
	password.on('blur keyup',validatePassword);
	gender.on('blur keyup change',validateGender);

	$('#register').submit(function(){ 
		var event_dtl; if(window.localStorage.getItem('event_dtl')){ event_dtl = window.localStorage.getItem('event_dtl'); }
		if(validateFname() & validateLname() & validateDob() & validateEmail()& validatePassword() & validateGender())
		{ 
			var dataString ="fname="+$("#fname").val()+"&lname="+lname.val()+"&dob="+dob.val()+"&email="+$("#email").val()+"&password="+$("#password").val()+"&act=u&event_dtl="+event_dtl;
			$.ajax({
				url:base_url+"mobile-app?page=login",
				type:"POST",
				data:dataString,
				dataType:"json",
				beforeSend:function(){
					$("#loading").show();
				},
				success:function(data){ 
					$("#loading, .loginlogoheader").hide(); 
					if(data.success == "Y"){
					window.localStorage.setItem("pat_id", data.data.Id);
					window.localStorage.setItem("pat_name", data.data.FirstName+" "+data.data.LastName);
					window.localStorage.setItem("pat_phone", data.data.Phone);
					window.localStorage.setItem("pat_dob", data.data.Dob);
					window.localStorage.setItem("pat_mail", $("#email").val());
					if(data.data.Phone) $("#ccphone").val(data.data.Phone).attr('readonly','readonly').parent().addClass('focused');
					if($("#email").val()) $("#ccemail").val($("#email").val()).attr('readonly','readonly').parent().addClass('focused');
					if(window.localStorage.getItem('doc_req')){ window.localStorage.removeItem('doc_req'); window.location.href="index.html"; }
					$("body").removeClass('signup-page').addClass('consent-page');
					$("#register, #sign_in_up, .loginlogoheader").hide();
					$("#htmlContent, #pageheader").show();
					var event_dtl = window.localStorage.getItem("event_dtl").split("=#=");
					$("#appoinmentSuccess .md-body h4").append('Your Request to <span>'+event_dtl[3]+'</span> for Appointment on :'+event_dtl[2]);
					}else{
						$('#email').parent().addClass("has-error");
					}window.localStorage.removeItem('event_dtl');
				}
			});
		}
		return false;
	});
	
	var namefilter = /^[a-zA-Z]+$/;
	function validateFname(){
		var fname  = $('#fname').val();
		if(fname == '' || !namefilter.test(fname))
		{
			$('#fname').parent().addClass("has-error");return false;
		}
		$('#fname').parent().removeClass("has-error");return true;
	}
	function validateLname(){
		var lname  = $('#lname').val();
		if(lname == ''|| !namefilter.test(lname))
		{
			$('#lname').parent().addClass("has-error");return false;
		}
		$('#lname').parent().removeClass("has-error");return true;
	}
	function validateDob(){
		var dob  = $('#dob').val();
		if(dob == '')
		{
			$('#dob').parent().addClass("has-error");return false;
		}
		$('#dob').parent().removeClass("has-error");return true;
	}
	function validatePassword(){
		var password  = $('#password').val();
		if(password == '')
		{
			$('#password').parent().addClass("has-error");return false;
		}
		$('#password').parent().removeClass("has-error");return true;
	}
	function validateGender(){
		var gender  = $('#gender').val(); 
		if(gender == '')
		{
			$('#gender').next().find('.selection span.select2-selection').css("border-color",'#843534');return false;
		}
		$("#gender").next().find('.selection span.select2-selection').css("border-color",'#fff'); return true;	
	}
	function validateEmail(){
			var email  = $('#email').val();
			var filter = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
			if(email == '')
			{
				$('#email').parent().addClass("has-error");return false;
			}else
				{
					if(filter.test(email)){
						$("#email").parent().removeClass("has-error");return true;
					}
					else{
						$('#email').parent().addClass("has-error");return false;
					}
				}
		}
		
$("a.sign-text").click(function(){
	$("#register").hide();
	$("#sign_in_up").show();
	return false;
});

var iemail = $("#iemail"), ipassword = $("#ipassword");
	iemail.on('blur keyup',validateIemail);
	ipassword.on('blur keyup',validateIpassword);

	$('#sign_in_up').submit(function(){ 
		if(validateIemail() & validateIpassword()){ 
		var event_dtl; if(window.localStorage.getItem('event_dtl')){ event_dtl = window.localStorage.getItem('event_dtl'); }
			var dataString ="iemail="+$("#iemail").val()+"&ipassword="+ipassword.val()+"&act=i&event_dtl="+event_dtl;
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
					if(data.success == "Y"){
					window.localStorage.setItem("pat_id", data.data.Id);
					window.localStorage.setItem("pat_name", data.data.FirstName+" "+data.data.LastName);
					window.localStorage.setItem("pat_phone", data.data.Phone);
					window.localStorage.setItem("pat_dob", data.data.Dob);
					window.localStorage.setItem("pat_mail", $("#iemail").val());
					if(data.data.Phone) $("#ccphone").val(data.data.Phone).attr('readonly','readonly').parent().addClass('focused');
					if(data.data.Email) $("#ccemail").val($("#iemail").val()).attr('readonly','readonly').parent().addClass('focused');
					$("body").removeClass('signup-page').addClass('consent-page');
					$("#register, #sign_in_up, .loginlogoheader").hide();
					//$("#htmlContent, #pageheader").show();
					var event_dtl = window.localStorage.getItem("event_dtl").split("=#=");
					$("#appoinmentSuccess .md-body h4").append('Your Request to <span>'+event_dtl[3]+'</span> for Appointment on : '+event_dtl[2]);
					window.localStorage.removeItem('event_dtl');
					$(".md-modal").addClass('md-show');
					$(".md-overlay").addClass('md-show');
					}else{
						$('#ipassword, #iemail').parent().addClass("error");
					}
				}
			});
		}
		return false;
	});
	
	function validateIpassword(){
		var ipassword  = $('#ipassword').val();
		if(ipassword == '')
		{
			$('#ipassword').parent().addClass("error");return false;
		}
		$('#ipassword').parent().removeClass("error").addClass('focused');return true;
	}
	
	function validateIemail(){
			var iemail  = $('#iemail').val();
			var filter = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
			if(iemail == '')
			{
				$('#iemail').parent().addClass("error");return false;
			}else
				{
					if(filter.test(iemail)){
						$("#iemail").parent().removeClass("error");return true;
					}
					else{
						$('#iemail').parent().addClass("error").addClass('focused');return false;
					}
				}
		}

/* consent form */

$("input[type='checkbox']").on('click',function(){
	if(window.localStorage.getItem("pat_phone") && window.localStorage.getItem("pat_mail"))
	$(this).parent().next('div').toggle();
	else
	$(this).parent().next('div').toggle().find('input').val('');
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
			if(typeof $('#checkbox3:checked').val() != "undefined"){
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
		if(typeof $('#checkbox2:checked').val() != "undefined"){
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
    $("#consent_save").parent().parent().css('position','relative');
}else{
    $("#consent_save").parent().parent().css('position','fixed');
}