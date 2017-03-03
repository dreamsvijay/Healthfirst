//var base_url = "https://dev.yosicare.com/healthyvillage-app/";
var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";

$("a.forgot-password").click(function(){ 
	$(this).parent().parent().hide();
	$("input[name='password']").parent().parent().hide();
	$("input[name='submit']").val('Submit');
	$("#form_typ").val('f');
	return false;
});
$('#privacy-box').niceScroll({
		cursorcolor: "#2f185c",
        cursorborder: "0",
        autohidemode: true,
		//cursorfixedheight: 47,
        cursormaxheight: 30
	});
	//$("#privacy_html").css('display','none');
$(document).ready(function(e) {
	
	$("#dob").datepicker({
			format: 'mm/dd/yyyy',
			//container: container,
			todayHighlight: true,
			autoclose: true,
		})
	
	window.localStorage.removeItem("pat_id");
	window.localStorage.removeItem("pat_name");
	window.localStorage.removeItem("pat_phone");
	window.localStorage.removeItem("pat_dob");
	window.localStorage.removeItem("pat_reftok");
	window.localStorage.removeItem("pat_acctok");
	window.localStorage.removeItem("pre_page");
	window.localStorage.removeItem("prac_id");
	if(window.localStorage.getItem("hf_app")){ $(".loginlogotext .login").empty().append('Create Your Free Account'); $("#emailcheck_html, #privacy_html").hide(); $("#consent, .loginlogoheader").show();}
	if(!window.localStorage.getItem("hf_app")) window.localStorage.setItem("hf_app",1)
    setTimeout(function(){ $("#loading").hide(); $("#privacy_html").css('display','none');},2000);
	$(".walkthrough-item .yc-button").click(function(){
		$(this).parent().parent().hide(); 
		if($(this).parent().parent().next().hasClass('walkthrough-item'))
			$(this).parent().parent().next().show();
		else
		{
			$("#loading").show();
			$('body').removeClass('signup-page').addClass('privacy-page');
			$("#emailcheck_html").hide();
			$("#privacy_html").show();
			$('#privacy-box').getNiceScroll().resize();
			setTimeout(function(){ $("#loading").hide(); },500);
			return false;	
		}
		$(".dotstyle ul").find('li.current').removeClass('current').next('li').addClass('current');
	});
	
	var email    = $("#email");
	var password = $("#password");
	var cpassword = $("#con_password");
	
	email.blur(validateEmail);	
	password.blur(validatePassword);
	cpassword.blur(validateCpassword);
	
	email.keyup(validateEmail);
	password.keyup(validatePassword);
	cpassword.keyup(validateCpassword);
	
	$('#sign_in_up').submit(function(){ 
		if(validateEmail() & validatePassword() & validateCpassword())
		{
			var dataString ="uname="+$("#email").val()+"&pass="+$("#password").val()+"&act="+$("#form_typ").val()+"&ccemail="+$("#ccemail:checked").val()+"&ccphone="+$("#ccphone:checked").val()+"&fname="+fname.val()+"&lname="+lname.val()+"&dob="+dob.val()+"&cphone="+cphone.val()+"&cgender="+$('#fm_gender').val();
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
					if(data.success=="Y"){
						window.localStorage.setItem("pat_id", data.data.Id);
						window.localStorage.setItem("pat_name", data.data.FirstName+" "+data.data.LastName);
						window.localStorage.setItem("pat_phone", data.data.Phone);
						window.localStorage.setItem("pat_dob", data.data.Dob);
						window.localStorage.setItem("pat_reftok", data.data.practice.refresh_token);
						window.localStorage.setItem("pat_acctok", data.data.practice.access_token);
						if($("#form_typ").val() == "u")
							window.localStorage.setItem("pat_form", 'new');
						
						location.href = "home.html";
					}else{
						$('#password').parent().addClass("has-error");
						$('#email').parent().addClass("has-error");	
						setTimeout(function(){$('.login_err').html(data.det);}, 2000);
						//window.localStorage.clear();
					}
				}
			});
		}
		return false;
	});
		
		function validateEmail()
		{
			var a = $("#email").val();
			var filter = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
			if(a == "")
			{
				$('#email').parent().addClass("has-error");
				return false;
			}else
			{
				if(filter.test(a)){
					$("#email").parent().removeClass("has-error");
					return true;
				}
				else{
					$('#email').parent().addClass("has-error");
					return false;
				}
			}
		}
		
		function validatePassword(){
			if($("#form_typ").val() == "i"){
				var password  = $('#password').val();
				if(password == '')
				{
					$('#password').parent().addClass("has-error");				
					return false;
				}
			}
			$('#password').parent().removeClass("has-error");
			return true;
		}
		
		function validateCpassword(){
			if($("#form_typ").val() == "u"){
				var con_password  = $('#con_password').val();
				if(con_password == '' && con_password != $('#password').val())
				{
					$('#con_password').parent().addClass("has-error");				
					return false;
				}
			}
			$('#con_password').parent().removeClass("has-error");
			return true;
		}
		
		
	/* Consent form validation */
	var fname = $("#fname");
	var lname = $("#lname");
	var dob = $("#dob");
	var cphone = $("#cphone");
	var cemail = $("#cemail");
	var fm_gender = $("#fm_gender");
	
	fname.on('blur keyup',validateFname);
	lname.on('blur keyup',validateLname);
	dob.on('blur keyup',validateDob);
	cphone.on('blur keyup focus',validateCphone);
	cemail.on('blur keyup',validateCemail);
	fm_gender.on('blur keyup change',validateCgender);
	
	$("#consent").submit(function(){ 
		if(validateFname() & validateLname() & validateDob() & validateCphone() & validateCemail() & validateCgender()){ 
			if($("#cconf").val() == 1){
				$("#loading").show();
				//fname:fname.val(),lname:lname.val(),dob:dob.val(),cphone:cphone.val(),cemail:cemail.val(),ccphone:$("#ccphone:checked").val(),ccemail:$("#ccemail:checked").val()
				$.post(base_url+"mobile-app?page=checkmail",{cemail:cemail.val()},function(data){
					$("#consent").hide();
					$("#email").val(cemail.val()).attr('readonly','readonly');
						if(data.data['UserCheck'] == "N"){
							$("#form_typ").val('u');
							$("#con_password").parent().parent().show();
							$(".loginlogotext").find('span').each(function(index, element) {
                                $(this).hide();
                            });
							$(".forgot-password").parent().parent().hide();
							$(".loginlogotext .signup").show();
							$("#sign_in_up #submit").val('Sign Up');
						}else{
							$("#form_typ").val('i');
							$(".loginlogotext .login").empty().append('Please Login to Access Your Profile');
						}
						$("#sign_in_up").show();
						$("#loading").hide();
					},"json");
			}else{
				$(".md-modal").addClass('md-show');
				$(".md-overlay").addClass('md-show');
				$(".md-modal .success_content").find('p').remove(); 
				if(typeof $("#ccphone:checked").val() != "undefined" || typeof $("#ccemail:checked").val() != "undefined"){
					var cons_cong = 'I hereby agree to receive ';
					var cons_con = '';
					if($("#ccphone:checked").val()){
					cons_cong += 'text';
					cons_con = ' and ';
					}
					if($("#ccemail:checked").val()){
						cons_cong += cons_con + 'email';
						//$(".md-modal .success_content").append('<p>&#10004; Email consent confirmed</p>');
					}
					cons_cong +=  ' messages regarding the use of Healthy Village app ';
					$(".md-modal .success_content").append('<p>'+cons_cong+'</p>');
				}
			}
		}
		return false;
	});
	
	function validateFname(){
		var fname  = $('#fname').val();
		if(fname == '')
		{
			$('#fname').parent().addClass("has-error");				
			return false;
		}
		$("#fname").parent().removeClass('has-error'); return true;	
	}
	
	function validateLname(){
		var lname  = $('#lname').val();
		if(lname == '')
		{
			$('#lname').parent().addClass("has-error");				
			return false;
		}
		$("#lname").parent().removeClass('has-error'); return true;	
	}
	
	function validateDob(e){ 
		var dob  = $('#dob').val();
		if(dob == '')
		{
			$('#dob').parent().addClass("has-error");				
			return false;
		}
		$('#dob').parent().removeClass("has-error");				
		return true;
	}
	
	function validateCphone(e){
		var cphone  = $('#cphone').val();
		if ($('#cphone').val().length === 0) {
			$('#cphone').val('(');
		} var key =0;
		if(e) key = e.keyCode;
		//var key = e.keyCode || 0;
		if (key !== 8 && key !== 9) {
			if ($('#cphone').val().length === 4) {
				$('#cphone').val($('#cphone').val() + ')');
			}
			if ($('#cphone').val().length === 5) {
				$('#cphone').val($('#cphone').val() + ' ');
			}			
			if ($('#cphone').val().length === 9) {
				$('#cphone').val($('#cphone').val() + '-');
			}
		}
		var regexp = /\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/; 
		if(regexp.test(cphone)){
			$("#cphone").parent().removeClass("has-error");
			return true;
		}
		else{
			$('#cphone').parent().addClass("has-error");
			return false;
		}
		
	}
	function validateCgender(){
		var fm_gender  = $('#fm_gender').val();
		if(fm_gender == '')
		{
			$('#fm_gender').next().find('.selection span.select2-selection').addClass("has-error");				
			return false;
		}
		
		$("#fm_gender").next().find('.selection span.select2-selection').removeClass('has-error'); return true;	
	}
	
	function validateCemail(){
		var cemail  = $('#cemail').val();
		var filter = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
		if(cemail == '')
		{
			$('#cemail').parent().addClass("has-error");				
			return false;
		}else
			{
				if(filter.test(cemail)){
					$("#cemail").parent().removeClass("has-error");
					return true;
				}
				else{
					$('#cemail').parent().addClass("has-error");
					return false;
				}
			}
	}
	
	/* End Consent form validation */
});

$(".btn-cancel").on('click',function(){ $(".md-modal").removeClass('md-show'); $(".md-overlay").removeClass('md-show'); });
$(".btn-confirm").on('click',function(){ 
	$(".md-modal").removeClass('md-show'); $(".md-overlay").removeClass('md-show'); 
	$("#cconf").val(1);
	$("#consent").submit();
	
});

$(document).on('click',"a.skip",function(){
	$("#loading").show();
	$('body').removeClass('signup-page').addClass('privacy-page');
	$("#emailcheck_html").hide();
	$("#privacy_html").show();
	$('#privacy-box').getNiceScroll().resize();
	setTimeout(function(){ $("#loading").hide(); },500);
	return false;
});

$(document).on('click',"#privacy_html a",function(){
	$("#loading").show();
	$('body').removeClass('privacy-page').addClass('signup-page');
	$(".loginlogotext .login").empty().append('Create Your Free Account');
	$(".loginlogoheader").show();
	$("#privacy_html").hide();
	$("#consent").show();
	setTimeout(function(){ $("#loading").hide(); },500);
	return false;
});

$("#show_signin a").click(function(){
	$("#loading").show();
	$(".loginlogotext .login").empty().append('Please Login to Access Your Profile');
	$(".loginlogoheader").show();
	$("#consent").hide();
	$("#sign_in_up").show();
	setTimeout(function(){ $("#loading").hide(); },500);
	return false;
});

 $(".js-example-basic-single").select2({
               placeholder: "Gender",
               minimumResultsForSearch: Infinity
       });