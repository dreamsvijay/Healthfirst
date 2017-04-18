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
			$("#firstname").val(data.data.PersonalData.FirstName);
			$("#lastname").val(data.data.PersonalData.LastName);
			$("#pgender").val(data.data.PersonalData.Gender);
			if(data.data.PersonalData.Gender)
			$("input[name=select_gender][value=" + data.data.PersonalData.Gender + "]").prop('checked', true);
			$("#pdob").val(data.data.PersonalData.Dob);
			$("#address1").val(data.data.PersonalData.Address1);
			$("#address2").val(data.data.PersonalData.Address2);
			$("#zipcode").val(data.data.PersonalData.Zip);
			if(window.localStorage.getItem("pat_form") == "new" || $("#app_submit").attr('data-step') <= 5){ window.localStorage.removeItem("pat_form");
			if(window.localStorage.getItem("prac_id")){
				$(".vp_header a").each(function(index, element) {
					$(this).parent().parent().parent().parent().hide();
				});
				$("#htmlContent").removeClass('view-pro-det');
				$("#view-profile_html").show();
				$(".dotstyle").show();
				$(".site-title h4").empty().append($(".dotstyle").find('ul li.current a').text());
				$("#form_mpersonal_info").find('input, select').removeAttr('readonly');
				$("#form_mpersonal_info").find('.mobilevp').hide();
				$("#frm_step").attr('data-step',$("#view-profile_html").next().attr('id'));
				$("#pgender, .mobilevp").hide(); $("#select_gender_wrap").show(); $("#submitpinfo").parent().show(); $("#app_submit").parent().hide();
			}
			}
			if(data.data.InsuranceData){
			if(data.data.InsuranceData[0]){
				//$("#no_insurance").show();
				//$(".dep_fd").h();
				var dep='';
				if(data.data.InsuranceData[0].InsuranceHolderType == "secondary") dep='N';
				if(data.data.InsuranceData[0].InsuranceHolderType == "primary") dep='Y';
				$("#ins_dep").val(dep);
				if(dep == "N") $("#firstIns_dependent").hide();
				if(dep == "D") $("#firstIns_dependent, .primaryInsuranceColumn .dependent-no, .secInsuranceColumn").hide();
				$("input[name=primary_areyouinsured][value=" + dep + "]").prop('checked', true);
				if($("input[name=primary_areyouinsured]:checked"))$("input[name=primary_areyouinsured]").attr('data-id',1);
				$("#primary_insuredfname").val(data.data.InsuranceData[0].InsuredFirstName).attr('data-id',1);
				$("#primary_insuredlname").val(data.data.InsuranceData[0].InsuredLastName).attr('data-id',1);
				$("#primary_insureddob").val(data.data.InsuranceData[0].Dob).attr('data-id',1);
				if(data.data.InsuranceData[0].RelationshipId){
				$('#primary_relationship option[value='+data.data.InsuranceData[0].RelationshipId+']').attr('selected','selected');
				$('#primary_relationship').attr('data-id',1);}
				$("#ins_rel").val(data.data.InsuranceData[0].Relationship);
				$("#ins_gen").val(data.data.InsuranceData[0].InsuredGender);
				if(data.data.InsuranceData[0].InsuredGender)
				$("input[name=primary_insuredgender][value=" + data.data.InsuranceData[0].InsuredGender + "]").prop('checked', true);
				if($("input[name=primary_insuredgender]:checked"))$("input[name=primary_insuredgender]").attr('data-id',1);
				$("#primary_insuranceid").val(data.data.InsuranceData[0].Id).attr('data-id',1);
				$("#primary_policynumber").val(data.data.InsuranceData[0].MemberId).attr('data-id',1); $(".addInsurance").hide();
				if(data.data.InsuranceData[1]){ $("a.addInsurance").text('another insurance');
					var dep='D';
					if(data.data.InsuranceData[1].InsuranceHolderType == "secondary") dep='N';
					if(data.data.InsuranceData[1].InsuranceHolderType == "primary") dep='Y';
					$("#ins_secdep").val(dep);
					$(".secInsuranceColumn").show();
					if(dep == "N") $("#secIns_dependent").hide();
					if(dep == "D") $("#secIns_dependent, .secInsuranceColumn .dependent-no").hide();
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
					$("#ins_gen").val(data.data.InsuranceData[1].InsuredGender);
					$("input[name=sec_insuredgender][value=" + data.data.PersonalData.InsuredGender + "]").prop('checked', true);
					$("#sec_insuranceid").val(data.data.InsuranceData[1].Id);
					$("#sec_policynumber").val(data.data.InsuranceData[1].MemberId);
				}
				$("#primary_relationship").trigger('change'); $("#sec_relationship").trigger('change');
			}
			}else{
				$(".primaryInsuranceColumn").hide();
				$("#no_insurance").show();
				$("#ins_dep").val('i dont have insurance');
			}
			// Demographics // 
			$("#dem_emp").val(data.data.GeneralData.Employed);
			if(data.data.GeneralData.Employed == "N" || data.data.GeneralData.Employed == "") $("#empcmpy").hide();
			/*$("#ssn").val(data.data.GeneralData.Ssn);*/
			$("#mobilenumber").val(data.data.GeneralData.MobileNumber);
			$("#employed_company").val(data.data.GeneralData.CompanyName);
			if(data.data.GeneralData.MaritalStatus.length > 0)
			$('#select_maritalstatus option[value='+data.data.GeneralData.MaritalStatus+']').attr('selected','selected');
			if(data.data.GeneralData.MaritalStatus)
			$("#dem_mar_sts").val($('#select_maritalstatus option[value="'+data.data.GeneralData.MaritalStatus+'"]').text());
			if(data.data.GeneralData.Employed.length > 0)
			$("input[name=select_employed][value=" + data.data.GeneralData.Employed + "]").prop('checked', true);
			$("#dem_enhn").val(data.data.GeneralData.EthnicityName);
			$("#dem_race").val(data.data.GeneralData.RaceName);
			$("#select_ethinicity_wrap").val(data.data.GeneralData.EthnicityId);
			//$("#select_race_wrap").val(data.data.GeneralData.RaceId);
			if(!window.localStorage.getItem("prac_id")) $("#dem_enhn").parent().hide();
			$("#select_maritalstatus").trigger('change');
			//Pcp //
			$("#emc_firstname").val(data.data.PcpandEmergencyData.EmerFirstName);
			$("#emc_lastname").val(data.data.PcpandEmergencyData.EmerLastName);
			$("#emc_number").val(data.data.PcpandEmergencyData.EmerPhoneNumber);
			
			$("#pcp").val(data.data.PcpandEmergencyData.PcpName);
			$("#pcpcontactnumber").val(data.data.PcpandEmergencyData.PcpPhone);
			if(data.data.PcpandEmergencyData.EmerRelationshipId.length > 0)
			$('#select_emc_relationship option[value="'+data.data.PcpandEmergencyData.EmerRelationshipId+'"]').attr('selected','selected');
			if(data.data.PcpandEmergencyData.EmerRelationshipId)
			$("#rel_pcp").val($('#select_emc_relationship option:selected').text());
			$("#select_emc_relationship").trigger('change');
			//lifestyle //
			$("#lf_cig").val(data.data.LifestyleData[0]['TobaccoName']);
			$("#lf_alc").val(data.data.LifestyleData[0]['AlcoholName']);
			$("#lf_rec").val(data.data.LifestyleData[0]['DrugName']);
			if(data.data.LifestyleData[0]['TobaccoId'])
			$('#select_smoking option[value='+data.data.LifestyleData[0]['TobaccoId']+']').attr('selected','selected');
			if(data.data.LifestyleData[0]['AlcoholId'])
			$('#select_drink option[value='+data.data.LifestyleData[0]['AlcoholId']+']').attr('selected','selected');
			if(data.data.LifestyleData[0]['DrugsId'].length > 0)
			$('#select_drugs option[value='+data.data.LifestyleData[0]['DrugsId']+']').attr('selected','selected');
			$("#select_smoking").trigger('change');
			$("#select_drink").trigger('change');
			$("#select_drugs").trigger('change');
			//medical info//
			if(data.data.PastMedicalHistoryData){
				var pasthist = new Array;
				var pmcArr = new Array;
				for(var i=0;i<data.data.PastMedicalHistoryData.length;i++){
					pasthist.push(data.data.PastMedicalHistoryData[i]['Name']);
					$("#select_pastmedicalcondition").append('<option value="'+data.data.PastMedicalHistoryData[i]['Id']+'" selected>'+data.data.PastMedicalHistoryData[i]['Name']+'</option>');
					pmcArr.push({
						"Id": data.data.PastMedicalHistoryData[i]['Id'],
						"Name": data.data.PastMedicalHistoryData[i]['Name']
					});
				}
				
				
			var pmcJsonData = JSON.stringify(pmcArr);
				$('#pmcJsonData').val(pmcJsonData);
				
				$("#md_con").val(pasthist.join(", "));
				$("#select_pastmedicalcondition").trigger('change');
			}
			if(data.data.AllergyData){
				var pasthist = new Array; var algArr = new Array; 
				for(var i=0;i<data.data.AllergyData.length;i++){
					pasthist.push(data.data.AllergyData[i]['Name']);
					$("#select_allergies").append('<option value="'+data.data.AllergyData[i]['Id']+'" selected>'+data.data.AllergyData[i]['Name']+'</option>');					
					algArr.push({
						"Id": data.data.AllergyData[i]['Id'],
						"Name": data.data.AllergyData[i]['Name']
					});
				}
				var algArrData = JSON.stringify(algArr);
				$('#allergyJsonData').val(algArrData);
				$("#md_alg").val(pasthist.join(", "));
				$("#select_allergies").trigger('change');
			}
			if(data.data.SurgicalHistoryData){
				var pasthist = new Array;var surArr = new Array; 
				for(var i=0;i<data.data.SurgicalHistoryData.length;i++){
					pasthist.push(data.data.SurgicalHistoryData[i]['Name']);
					$("#select_surgeries").append('<option value="'+data.data.SurgicalHistoryData[i]['Id']+'" selected>'+data.data.SurgicalHistoryData[i]['Name']+'</option>');
					surArr.push({
						"Id": data.data.SurgicalHistoryData[i]['Id'],
						"Name": data.data.SurgicalHistoryData[i]['Name']
					});
				}
				var surArrData = JSON.stringify(algArr);
				$('#surgeryJsonData').val(surArrData);
				$("#md_sug").val(pasthist.join(", "));
				$("#select_surgeries").trigger('change');
			}
			if(data.data.FamilyHistoryData){
				var pasthist = new Array;var famArr = new Array;
				for(var i=0;i<data.data.FamilyHistoryData.length;i++){
					pasthist.push(data.data.FamilyHistoryData[i]['Name']);
					$("#select_familyhistory").append('<option value="'+data.data.FamilyHistoryData[i]['Id']+'" selected>'+data.data.FamilyHistoryData[i]['Name']+'</option>');
					famArr.push({
						"Id": data.data.FamilyHistoryData[i]['Id'],
						"Name": data.data.FamilyHistoryData[i]['Name']
					});
				}
				var famArrData = JSON.stringify(famArr);
				$('#familyJsonData').val(famArrData);
				$("#select_familyhistory").trigger('change');
				$("#md_fam").val(pasthist.join(", "));
			}
			
			if(data.data.MedicationsData){
				var medichist = new Array;var medicationArr = new Array;
				for(var i=0;i<data.data.MedicationsData.length;i++){
					medichist.push(data.data.MedicationsData[i]['Name']);
					$("#addedMedicationList").append('<li id="addedMedi_'+data.data.MedicationsData[i]['RefId']+'"><p><span>'+data.data.MedicationsData[i]['Name']+", "+data.data.MedicationsData[i]['Dosage']+", "+$("#select_medication_freq1 option[value="+data.data.MedicationsData[i]['Frequency']+"]").text()+'</span></p><a href="javascript:;" class="removelist" data-id="'+data.data.MedicationsData[i]['RefId']+'"></a></li>');
					medicationArr.push({
                    "Id": data.data.MedicationsData[i]['RefId'],
					"Name": data.data.MedicationsData[i]['Name'],
                    "Dosage": data.data.MedicationsData[i]['Dosage'],
                    "Frequency": data.data.MedicationsData[i]['Frequency']
                });
				}
				
			}
			
			if(data.data.PharmacyData){
				$("#ph_det, #pharmacy_hname").val(data.data.PharmacyData.PharmacyName);
				$("#pharmacyzipcode").val(data.data.PharmacyData.PharmacyZip);
				$("#pharmacy_hid").val(data.data.PharmacyData.PharmacyId);
				if(data.data.PharmacyData.PharmacyName.length > 0)
				$('#select_pharmacyaddress').append("<option value='"+data.data.PharmacyData.PharmacyId+"' data-address='"+data.data.PharmacyData.PharmacyAddress+"' selected>"+data.data.PharmacyData.PharmacyName+"</option>");
				$("#select_pharmacyaddress").trigger('change');
			}
			
            var medicationJsonString = JSON.stringify(medicationArr);
            $('#medicationJsonData').val(medicationJsonString);
			if(window.localStorage.getItem("prac_id")) 
			referalList();
		}
		$("#loading").hide();
		
		},"json");
		
		
		if ($('#select_smoking_wrap').length) {
	$('#select_smoking_wrap .customdd').select2({
		minimumResultsForSearch: Infinity,
		dropdownParent: $('#select_smoking_wrap')
	});
}
if ($('#select_drink_wrap').length) {
	$('#select_drink_wrap .customdd').select2({
		minimumResultsForSearch: Infinity,
		dropdownParent: $('#select_drink_wrap')
	});
}
if ($('#select_drugs_wrap').length) {
	$('#select_drugs_wrap .customdd').select2({
		minimumResultsForSearch: Infinity,
		dropdownParent: $('#select_drugs_wrap')
	});
}
$('#select_medication_freq1_wrap .customdd').select2({
		minimumResultsForSearch: Infinity,
		dropdownParent: $('#select_medication_freq1_wrap'),
		placeholder: {
			id: "-1",
			text: "Select a repository"
		}
	});
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



              