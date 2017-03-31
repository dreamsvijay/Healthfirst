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
});
	
	var fname = $("#fname"), lname = $("#lname"), email = $("#email"), password = $("#password"), dob = $("#dob"), gender = $("#gender");
	fname.on('blur keyup',validateFname);
	lname.on('blur keyup',validateLname);
	dob.on('blur keyup focus',validateDob);
	email.on('blur keyup',validateEmail);
	password.on('blur keyup',validatePassword);
	gender.on('blur keyup change',validateGender);

	$('#register').submit(function(){ 
		if(validateFname() & validateLname() & validateDob() & validateEmail()& validatePassword() & validateGender())
		{ 
			var dataString ="fname="+$("#fname").val()+"&lname="+lname.val()+"&dob="+dob.val()+"&email="+$("#email").val()+"&password="+$("#password").val()+"&act=u";
			//$(".md-body h4 span").empty().html($("#dname").val());
			//$(".md-body p span").empty().html($("#rdob").val());
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
					window.location.href="index.html";
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