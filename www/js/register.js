$(document).ready(function(){//document ready
var a,b;

	$("#email-address").last().keyup(function () {
    var $email = $("#email-address").val();
    var email1 = $("#email-address").val();
    validateEmail($email);

    if(a == "success"){
    	$.ajax({
    		type: "POST",
    		url: "http://red.cssolutions.ph/red_app/process/checkEmail.php",
    		data: "emailAddress="+email1,
    		success: function(data){
    			if(data == "error"){
    				$("#email-address").focus();
    				$(".err-mess").fadeIn("slow").show();
    			}
    			else if(data == "empty"){
    				$(".err-mess").hide();
    			}
    		}
    	});
    }



	});

	function validateEmail(email) {
	    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	    if (!emailReg.test(email)) {
	        $("#email-address").css({"border":"2px solid red"});
	        a = "error";
	    } 
	    else{
	    	$("#email-address").css({"border":"0"});
	    	a = "success";
	    }
	}

	$("#name-input").last().keyup(function(){
		var $name = $("#name-input").val();
		validateName($name);
	});

	function validateName(name){
		var name1 = /[a-zA-Z ]+[\s]+[a-zA-Z]+$/; 
		if(!name1.test(name)){
			$("#name-input").css({"border":"2px solid red"});
			b = "error";
		}

		else{
			$("#name-input").css({"border":"none"});
			b = "success";
		}
	}

	function readURL(input){
		var file = input.files[0];
		var fileType = file["type"];
		var validImageType = ["image/gif", "image/jpeg", "image/png"];
		if($.inArray(fileType, validImageType)<0){
			alert("Invalid file type!");
		}

		else{
			$("#loader").show();
			if(input.files && input.files[0]){
				var reader = new FileReader();
				reader.onload = function(e){
					$("#user_profile").attr('src', e.target.result);
					$("#user_profile").hide();
					$("#loader").hide();
					$("#user_profile").fadeIn("slow");
				}

				reader.readAsDataURL(input.files[0]);

			}
		}
			
			
	}
	

	$("#user_image").change(function(){
		readURL(this);
	});

	

	function load6(){

	$("#country").change(function(){

	var id = $("#country").val();
	$.ajax({
		cache: false,
		type: "GET",
		url: "http://red.cssolutions.ph/red_app/process/regions.php?id="+id,
		success: function(data){
			var obj = jQuery.parseJSON(data);
		 	var count = obj.length;
		 	$("#regions").empty();
		 	if(count == 0){
		 		$("#regions").append("<option>No Cities in this Country</option>");
		 	}

 			else{
			 	for(var i=0; i<count;i++){	
					$("#regions").append("<option value='"+obj[i].name+"'>"+obj[i].name+"</option>");
					}
 			}

		}

	});

	});



	$.ajax({
		cache: false,
		type: "GET",
		url: "http://red.cssolutions.ph/red_app/process/countries.php",
		success: function(data){
			var obj = jQuery.parseJSON(data);
			var append = [];
			var count = obj.length;
			for(var i=0; i<count;i++){
			if(obj[i].code == "ph"){
				$("#country").append("<option class='option-value' id="+obj[i].id+" value="+obj[i].id+" selected>"+obj[i].name+"</option>");
				$("#country").trigger('change');
				
			}

			else{
				$("#country").append("<option class='option-value' id="+obj[i].id+" value="+obj[i].id+">"+obj[i].name+"</option>");	
			}

			}
		}
	});


	}

	load6();


	$(function(){
    var $select = $(".age");
    for (i=18;i<=80;i++){
    $select.append($("<option></option>").val(i).html(i+" yrs. old"));
    }
	});


	$("#proceed").click(function(){

		var pass = $("#password").val();
		var confPass = $("#confirm-password").val();
		if($("#name-input").val()!= "" && b == "success" && $("#age").val()!= "" && $("#gender").val()!= "" && $("#cellphone-number").val()!= "" && $("#country").val()!= "" && $("#regions").val()!= "" && $("#email-address").val()!= "" && a == "success" && $("#password").val()!= "" && $("#confirm-password").val()!= "" && $('input[name="chk[]"]:checked').length > 0){
		
		if(pass===confPass){
			$("#myModal").modal("toggle");
		}
		else{
			alert("error wrong password");
			$("#form-group-5").addClass('has-error has-feedback');
			$("#error-4").addClass('fa fa-times fa-2x form-control-feedback');
		}

		}


		else if ($('input[name="chk[]"]:checked').length == 0){
			alert("Please fill up all fields!");
		}

		else if($("#name-input").val()!="") {
			$("#form-group-1").removeClass('has-error has-feedback');
			$("#error").removeClass("fa fa-times fa-2x form-control-feedback");		
		}
		else if($("#cellphone-number").val()!="") {
			$("#form-group-2").removeClass('has-error has-feedback');
			$("#error-1").removeClass("fa fa-times fa-2x form-control-feedback");		
		}
		else if($("#email-address").val()!="") {
			$("#form-group-3").removeClass('has-error has-feedback');
			$("#error-2").removeClass("fa fa-times fa-2x form-control-feedback");		
		}
		else if($("#password").val()!="") {
			$("#form-group-4").removeClass('has-error has-feedback');
			$("#error-3").removeClass("fa fa-times fa-2x form-control-feedback");		
		}
		else if($("#confirm-password").val()!="") {
			$("#form-group-5").removeClass('has-error has-feedback');
			$("#error-4").removeClass("fa fa-times fa-2x form-control-feedback");		
		}
		else{
			alert("Please checked all your fields for errors!");
			$("#form-group-1, #form-group-2, #form-group-3, #form-group-4, #form-group-5 ").addClass('has-error has-feedback');
			$("#error, #error-1, #error-2, #error-3, #error-4").addClass("fa fa-times fa-2x form-control-feedback");
		}

		}); //proceed

		$("#name-input").on('keyup',function(e){
			$("#form-group-1").removeClass('has-error has-feedback');
			$("#error").removeClass("fa fa-times fa-2x form-control-feedback");
		}); //name input
		$("#cellphone-number").on('keyup',function(e){
			$("#form-group-2").removeClass('has-error has-feedback');
			$("#error-1").removeClass("fa fa-times fa-2x form-control-feedback");
		}); //cell number input
		$("#email-address").on('keyup',function(e){
			$("#form-group-3").removeClass('has-error has-feedback');
			$("#error-2").removeClass("fa fa-times fa-2x form-control-feedback");
		}); //email input
		$("#password").on('keyup',function(e){
			$("#form-group-4").removeClass('has-error has-feedback');
			$("#error-3").removeClass("fa fa-times fa-2x form-control-feedback");
		}); //password input
		$("#confirm-password").on('keyup',function(e){
			$("#form-group-5").removeClass('has-error has-feedback');
			$("#error-4").removeClass("fa fa-times fa-2x form-control-feedback");
		}); //confirm input

		$("#continue-reg").click(function(){

			var verifCode = generateVerification();

			$("#loader").fadeIn("slow").show();
			if($("#blood-type").val()!=""){

				var country_id = $("#country").children(":selected").attr("id");
				var name = $("#name-input").val();
				var age = $("#age").val();
				var gender = $("#gender").val();
				var cellNumber1 = $("#cellphone-number").val();
				var cellNumber = cellNumber1.substr(cellNumber1.length - 10);

				var country = $("#country").val();
				var region = $("#regions").val();
				var emailAddress = $("#email-address").val();
				var password = $("#password").val();
				var bloodType = encodeURIComponent($("#blood-type").val());	
				var data = "name="+name+"&age="+age+"&gender="+gender+"&cellNumber="+cellNumber+"&country="+country+"&region="+region+"&emailAddress="+emailAddress+"&password="+password+"&bloodType="+bloodType+"&country_id="+country_id+"&verifCode="+verifCode;
				
				localStorage.setItem('username', emailAddress);
				
		$.ajax({
			type: "POST",
			url: "http://red.cssolutions.ph/red_app/process/register.php",
			data: data,
			success: function(data){
				if(data=="Save"){
						$("#loader").hide();
						window.location.replace("verify.html");
				}
			}
		});		

			}

			else{
				alert("select blood type");
			}


		});

		function generateVerification()
		{
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		    for( var i=0; i < 4; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}


	}); //document ready