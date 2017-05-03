var base_url = "https://healthfirst.yosicare.com/dev/hf-app/";
$("#pagecontent").hide();
$(document).ready(function(e) {
	/*$("#pdob, #primary_insureddob, #sec_insureddob").datepicker({
    format: "mm/dd/yyyy",
    autoclose: true,
    disableTouchKeyboard: true,
    Readonly: true,
	endDate: '+0d'
}).attr("readonly", "readonly");*/
	//if(!window.localStorage.getItem("pat_id")){ window.location.href="index.html"; }
	maritalList();
	if(window.localStorage.getItem("prac_id")){ demographicList(); $("#app_submit").parent().show();}
	relationsList(); getLifestyle(); frequencylist();relationshipList();
	$.post(base_url+"mobile-app?page=getDetails",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok")},
	function(data){
		$("#pagecontent").show();
		if(data.success == "Y"){
			$("#frm_step").val(data.data.Step.Step); $("#app_submit").attr('data-step',data.data.Step.Step);
			$("#firstname").empty().html(data.data.PersonalData.FirstName);
			$("#lastname").empty().html(data.data.PersonalData.LastName);
			$("#pgender").empty().html(data.data.PersonalData.Gender);
			$("#pdob").empty().html(data.data.PersonalData.Dob);
			$("#address1").empty().html(data.data.PersonalData.Address1);
			$("#address2").empty().html(data.data.PersonalData.Address2);
			$("#zipcode").empty().html(data.data.PersonalData.Zip);
			
			if(data.data.InsuranceData){
			if(data.data.InsuranceData[0]){
				//$("#no_insurance").show();
				//$(".dep_fd").h();
				var dep='I dont have insurance';
				if(data.data.InsuranceData[0].InsuranceHolderType == "secondary") dep='Yes';
				if(data.data.InsuranceData[0].InsuranceHolderType == "primary") dep='No';
				$("#ins_dep").empty().html(dep);
				if(dep == "No") $("#primary_insuredfname, #primary_insuredlname, #primary_insureddob, #ins_gen , #ins_rel").parent().hide();
				if(dep == "I dont have insurance")  $("#primary_insuredfname, #primary_insuredlname, #primary_insureddob, #ins_gen , #ins_rel, #primary_insuranceid, #primary_policynumber").parent().hide();
				$("input[name=primary_areyouinsured][value=" + dep + "]").prop('checked', true);
				if($("input[name=primary_areyouinsured]:checked"))$("input[name=primary_areyouinsured]").attr('data-id',1);
				$("#primary_insuredfname").empty().html(data.data.InsuranceData[0].InsuredFirstName);
				$("#primary_insuredlname").empty().html(data.data.InsuranceData[0].InsuredLastName);
				$("#primary_insureddob").empty().html(data.data.InsuranceData[0].Dob);
				//$("#primary_insuranceid").empty().html(data.data.InsuranceData[0].Id);
				$("#primary_policynumber").empty().html(data.data.InsuranceData[0].MemberId);
				$("#ins_rel").empty().html(data.data.InsuranceData[0].Relationship);
				$("#ins_gen").empty().html(data.data.InsuranceData[0].InsuredGender);
				
				 $(".addInsurance").hide();
				if(data.data.InsuranceData[1]){ $("#sec_ins").show();
					var dep='I dont have insurance';
					if(data.data.InsuranceData[1].InsuranceHolderType == "secondary") dep='Yes';
					if(data.data.InsuranceData[1].InsuranceHolderType == "primary") dep='No';
					$("#ins_secdep").val(dep);
					$(".secInsuranceColumn").show();
					if(dep == "No") $("#sec_insuredfname, #sec_insuredlname, #sec_insureddob, #secins_gen , #secins_rel").parent().hide();
				    if(dep == "I dont have insurance")  $("#sec_insuredfname, #sec_insuredlname, #sec_insureddob, #ins_gen , #ins_rel, #sec_insuranceid, #sec_policynumber").parent().hide();
					$("a.addInsurance").hide();
					$("#ins_submit").show();
					if(data.data.InsuranceData[1].InsuranceHolderType == "secondary") dep='N';
					if(data.data.InsuranceData[1].InsuranceHolderType == "primary") dep='Y';
					$("input[name=sec_areyouinsured][value=" + dep + "]").prop('checked', true);
					$("#sec_insuredfname").val(data.data.InsuranceData[1].InsuredFirstName);
					$("#sec_insuredlname").val(data.data.InsuranceData[1].InsuredLastName);
					$("#sec_insureddob").val(data.data.InsuranceData[1].Dob);
					if(data.data.InsuranceData[1].RelationshipId){
					$('#sec_relationship option[value='+data.data.InsuranceData[1].RelationshipId+']').attr('selected','selected');
					$("#secins_rel").val($('#primary_relationship option[value="'+data.data.InsuranceData[1].RelationshipId+'"]').text());}
					$("#secins_gen").val(data.data.InsuranceData[1].InsuredGender);
					$("input[name=sec_insuredgender][value=" + data.data.PersonalData.InsuredGender + "]").prop('checked', true);
					$("#sec_insuranceid").val(data.data.InsuranceData[1].Id);
					$("#sec_policynumber").val(data.data.InsuranceData[1].MemberId);
				}
				//$("#primary_relationship").trigger('change'); $("#sec_relationship").trigger('change');
			}
			}else{
				$(".primaryInsuranceColumn").hide();
				$("#no_insurance").show();
				$("#ins_dep").val('i dont have insurance');
			}
			// Demographics // 
			var Emp_sts = "No";
			if(data.data.GeneralData.Employed)
			$("#dem_emp").val("Yes");
			/*$("#ssn").val(data.data.GeneralData.Ssn);*/
			$("#mobilenumber").empty().html(data.data.GeneralData.MobileNumber);
			$("#employed_company").empty().html(data.data.GeneralData.CompanyName);
			$("#dem_mar_sts").empty().html(data.data.GeneralData.MaritalStatus);
			//if(data.data.GeneralData.Employed.length > 0)
			//$("input[name=select_employed][value=" + data.data.GeneralData.Employed + "]").prop('checked', true);
			//$("#dem_enhn").val(data.data.GeneralData.EthnicityName);
			//$("#dem_race").val(data.data.GeneralData.RaceName);
			//$("#select_ethinicity_wrap").val(data.data.GeneralData.EthnicityId);
			//$("#select_race_wrap").val(data.data.GeneralData.RaceId);
			//if(!window.localStorage.getItem("prac_id")) $("#dem_enhn").parent().hide();
			//$("#select_maritalstatus").trigger('change');
			//Pcp //
			$("#emc_firstname").empty().html(data.data.PcpandEmergencyData.EmerFirstName);
			$("#emc_lastname").empty().html(data.data.PcpandEmergencyData.EmerLastName);
			$("#emc_number").empty().html(data.data.PcpandEmergencyData.EmerPhoneNumber);
			
			$("#pcp").empty().html(data.data.PcpandEmergencyData.PcpName);
			$("#pcpcontactnumber").empty().html(data.data.PcpandEmergencyData.PcpPhone);
			$("#rel_pcp").empty().html(data.data.PcpandEmergencyData.EmerRelationship);
			
			//lifestyle //
			$("#lf_cig").empty().html(data.data.LifestyleData[0]['TobaccoName']);
			$("#lf_alc").empty().html(data.data.LifestyleData[0]['AlcoholName']);
			$("#lf_rec").empty().html(data.data.LifestyleData[0]['DrugName']);
			
			//medical info//
			if(data.data.PastMedicalHistoryData){
				var pasthist = new Array;
				var pmcArr = new Array;
				for(var i=0;i<data.data.PastMedicalHistoryData.length;i++){
					pasthist.push(data.data.PastMedicalHistoryData[i]['Name']);
				}
				$("#pasthist").empty().append(pasthist.join(", "));
			
			}
			if(data.data.AllergyData){
				var pasthist = new Array; var algArr = new Array; 
				for(var i=0;i<data.data.AllergyData.length;i++){
					pasthist.push(data.data.AllergyData[i]['Name']);
					
				}
				$("#md_alg").empty().append(pasthist.join(", "));
			}
			if(data.data.SurgicalHistoryData){
				var pasthist = new Array;var surArr = new Array; 
				for(var i=0;i<data.data.SurgicalHistoryData.length;i++){
					pasthist.push(data.data.SurgicalHistoryData[i]['Name']);
					
				}
				$("#md_sug").empty().append(pasthist.join(", "));
			}
			if(data.data.FamilyHistoryData){
				var pasthist = new Array;var famArr = new Array;
				for(var i=0;i<data.data.FamilyHistoryData.length;i++){
					pasthist.push(data.data.FamilyHistoryData[i]['Name']);
					
				}
				$("#md_fam").empty().append(pasthist.join(", "));
			}
			
			if(data.data.MedicationsData){
				var medichist = new Array;var medicationArr = new Array;
				for(var i=0;i<data.data.MedicationsData.length;i++){
					medichist.push(data.data.MedicationsData[i]['Name']);
					
				}
				$("#medi_his").empty().append(medichist.join(", "));
			}
			
			if(data.data.PharmacyData){
				$("#pharmacy_hid").empty().html(data.data.PharmacyData.PharmacyName);
				$("#pharmacyzipcode").empty().html(data.data.PharmacyData.PharmacyZip);
			}
            
			referalList();
		}else{
			$("#view-profile_html").hide();
		$("#htmlContent").append("<div style='padding:15px;'>Your profile info does not match our record</div>");
		}
		$("#loading").hide();
		
		},"json");
		
		
		if ($('#select_smoking_wrap').length) {
	$('#select_smoking_wrap .customdd').select2({
		minimumResultsForSearch: Infinity,
		dropdownParent: $('#select_smoking_wrap')
	});
}

});

function maritalList(){
	$.post(base_url+"mobile-app?page=maritalList",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok")},
	function(data){
		if(data.success == "Y"){ 
			for(var i=0;i<data.data.length;i++){
			$("#select_maritalstatus").append('<option value="'+data.data[i]['Id']+'">'+data.data[i]['Name']+'</option>');
			}
		}
	},"json");
	
}

function referalList(){
	$.post(base_url+"mobile-app?page=referalList",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok"),practiceId:window.localStorage.getItem("prac_id")},
	function(data){
		if(data.success == "Y"){ 
			for(var i=0;i<data.data.length;i++){
			$("#refsource").append('<option value="'+data.data[i]['Id']+'">'+data.data[i]['Name']+'</option>');
			}
		}
	},"json");
	
}

function demographicList(){
	$.post(base_url+"mobile-app?page=demographicList",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok")},
	function(data){
		if(data.success == "Y"){ 
			for(var i=0;i<data.data.length;i++){
			$("#select_maritalstatus").append('<option value="'+data.data[i]['Id']+'">'+data.data[i]['Name']+'</option>');
			}
		}
	},"json");
	
}

function relationsList(){
	$.post(base_url+"mobile-app?page=relationsList",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok"),SlefFlag:"N"},
	function(data){
		if(data.success == "Y"){ 
			for(var i=0;i<data.data.length;i++){
			$("#select_emc_relationship, #primary_relationship, #sec_relationship").append('<option value="'+data.data[i]['Id']+'">'+data.data[i]['Relationship']+'</option>');
			}
		}
	},"json");
	
}

function getLifestyle(){
	$.post(base_url+"mobile-app?page=getLifestyle",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok"),SlefFlag:"N"},
	function(data){
		if(data.success == "Y"){ 
			for(var i=0;i<data.data.tobacco.length;i++){
				$("#select_smoking").append('<option value="'+data.data.tobacco[i]['Id']+'">'+data.data.tobacco[i]['Name']+'</option>');
			}
			for(var i=0;i<data.data.alcohol.length;i++){
				$("#select_drink").append('<option value="'+data.data.alcohol[i]['Id']+'">'+data.data.alcohol[i]['Name']+'</option>');
			}
			for(var i=0;i<data.data.drugs.length;i++){
				$("#select_drugs").append('<option value="'+data.data.drugs[i]['Id']+'">'+data.data.drugs[i]['Name']+'</option>');
			}
		}
	},"json");
	
}

function frequencylist(){
	$.post(base_url+"mobile-app?page=frequencylist",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok")},
	function(data){
		if(data.success == "Y"){ 
			for(var i=0;i<data.data.length;i++){
				$("#select_medication_freq1").append('<option value="'+data.data[i]['Id']+'">'+data.data[i]['Name']+'</option>');
			}
			
		}
	},"json");
	
}

function relationshipList(){
	$.post(base_url+"mobile-app?page=relationshipList",{pat_id:window.localStorage.getItem("pat_id"),pat_acctok:window.localStorage.getItem("pat_acctok"),pat_reftok:window.localStorage.getItem("pat_reftok"),SlefFlag:"N"},
	function(data){
		if(data.success == "Y"){ 
			for(var i=0;i<data.data.length;i++){
			$(".relationshipList").append('<li><a href="javascript:;"><input value="'+data.data[i]['Id']+'" name="rel_list" type="checkbox"><label>'+data.data[i]['Relationship']+'</label></a></li>');
			}
		}
	},"json");
	
}

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

              