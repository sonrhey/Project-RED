$(document).ready(function(){

	$("#login").click(function(){
		if(($("#username").val()!="") && ($("#password").val()!="")){
			var username = $("#username").val();
			var password = $("#password").val();
			var data = "username="+username+"&password="+password;
			$("#loader, #loader2").fadeIn("slow").show();

			$.ajax({
				type: "POST",
				url: "http://red.cssolutions.ph/red_app/process/login.php",
				data: data,
				success: function(data){

					if(data=="Correct"){
					store(username);
					$("#loader, #loader2").hide();	
					window.location.replace('dashboard.html');
					}

					else if(data == "Verify"){
						window.location.replace('verify.html');
					}
					
					else if(data=="Empty"){
						alert("Wrong password or username");
						$("#loader, #loader2").hide();
					}
				}
			});
			
		}
		else{
			alert("Empty Boxes");
		}


	});


	function store(username){
		localStorage.setItem('username',username);
	}

	
});