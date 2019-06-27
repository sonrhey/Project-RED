$(document).ready(function(){
	$("#verify-code").focus();

	$("#btn-verify").click(function(){
		var code = $("#verify-code").val();
			$.ajax({
			type: "POST",
			url: "http://red.cssolutions.ph/red_app/process/verify.php",
			data: "verification_code="+code,
			success: function(data){
				if(data=="Correct"){
					window.location.replace("dashboard.html");
				}
				else{
					alert("Incorrect Verification code!");
				}
			}
		});

	});


	$("#resend-code").click(function(){
		var code = generateVerification();

		$.ajax({
			type: "POST",
			url: "http://red.cssolutions.ph/red_app/process/resend.php",
			data: "code="+code,
			success: function(data){
				if(data){
					alert("Verification Sent!");
				}
			}
		});		
	});

		function generateVerification()
		{
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		    for( var i=0; i < 4; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}


});