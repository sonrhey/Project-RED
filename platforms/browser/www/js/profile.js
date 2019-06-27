	
$(document).ready(function(){
	
$("#loader").fadeIn("slow").show();
	var option1;
	var image2;



	function load(){
		$.ajax({
			cache: false,
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/profile.php",
			success: function(data){
				$(".whole-div").fadeIn("slow").show();
				if(data){
				$("#loader").hide();
				var obj = jQuery.parseJSON(data);
				var id3 = obj.user_id;
				var user_id = id3;

				$("#btn-upload").click(function(){
					saveImage(option1, image2, user_id);
					$("#loader").show();
				});

				
				$("#user_profiles").attr('src', 'http://red.cssolutions.ph/red_app/profile_photo/'+user_id+".jpg");
				
				$("#profile-name").append(obj.name);
				$("#user-blood").append("<p>Blood Type: <b>"+obj.blood_type+"</b></p>");
				var age1 = obj.age;
				var finalAge = age1;	
				$("#edit-name").val(obj.name);
				$("#edit-blood").append("<option val="+obj.blood_type+" selected>"+obj.blood_type+"</option>");
				$("#profile-country").append("<option selected>"+obj.country+"</option>");
				$("#profile-city_state").append("<option val="+obj.city_state+" selected>"+obj.city_state+"</option>");
				$("#profile-password").val(obj.password);
				$("#profile-age").val(finalAge);
				$("#profile-gender").val(obj.gender);
				$("#profile-cell_number").val(obj.cell_number);
				$("#profile-email_address").val(obj.email_address);

				$("#profile-country").change(function(){

				var id1 = $("#profile-country").val();
				var city1 = obj.city_state;
				$.ajax({
					cache: false,
					type: "GET",
					url: "http://red.cssolutions.ph/red_app/process/regions.php?id="+id1,
					success: function(data){
						var obj = jQuery.parseJSON(data);
					 	var count = obj.length;
					 	$("#profile-city_state").empty();
					 	if(count == 0){
					 		$("#profile-city_state").append("<option>No Cities in this Country</option>");
					 	}

			 			else{
						 	for(var i=0; i<count;i++){	

						 		if(city1 == obj[i].name){
						 			$("#profile-city_state").append("<option value='"+obj[i].name+"' selected>"+obj[i].name+"</option>");

						 		}
						 		else{
						 			$("#profile-city_state").append("<option value='"+obj[i].name+"'>"+obj[i].name+"</option>");
						 		}
								}
			 			}

					}

				});

				});


				} //ending

			}
		});


		
	}
	load();

	function load6(){

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
							$("#profile-country").append("<option class='option-value' id="+obj[i].id+" value="+obj[i].id+" selected>"+obj[i].name+"</option>");
							$("#profile-country").trigger('change');
							
						}

						else{
							$("#profile-country").append("<option class='option-value' id="+obj[i].id+" value="+obj[i].id+">"+obj[i].name+"</option>");	
						}

						}
					}
				});

	}

	load6();	

	//age
	$("#age-edit").click(function(){
		$("#profile-age").focus();
		$("#profile-age").attr('readonly', false);
	});

	$("#profile-age").blur(function(){
		$("#profile-age").attr('readonly', true);
	});

	//gender
	$("#gender-edit").click(function(){
		$("#profile-gender").focus();
		$("#profile-gender").attr('readonly', false);
	});

	$("#profile-gender").blur(function(){
		$("#profile-gender").attr('readonly', true);
	});

	//contact
	$("#contact-edit").click(function(){
		$("#profile-cell_number").focus();
		$("#profile-cell_number").attr('readonly', false);
	});

	$("#profile-cell_number").blur(function(){
		$("#profile-cell_number").attr('readonly', true);
	});


	//email
	$("#email-edit").click(function(){
		$("#profile-email_address").focus();
		$("#profile-email_address").attr('readonly', false);
	});

	$("#profile-email_address").blur(function(){
		$("#profile-email_address").attr('readonly', true);
	});

	$("#btn-update").click(function(){
		$("#loader").fadeIn("slow").show();
		var age = $("#profile-age").val();
		var gender = $("#profile-gender").val();
		var contact  = $("#profile-cell_number").val();
		var country = $("#profile-country").val();
		var city = $("#profile-city_state").val();
		var email = $("#profile-email_address").val();
		var data1 = "age="+age+"&gender="+gender+"&contact="+contact+"&country="+country+"&city="+city+"&email="+email;
		
		$.ajax({
			cache: false,
			type: "POST",
			url: "http://red.cssolutions.ph/red_app/process/profile_update.php",
			data: data1,
			success: function(data){
				if(data1=="Success"){
				setInterval(function(){

					$.ajax({
						cache: false,
						type: "GET",
						url: "http://red.cssolutions.ph/red_app/process/profile.php",
						success: function(data){
						
						if(data){
						$("#loader").fadeOut("slow").hide();
						var obj = jQuery.parseJSON(data);
						$("#profile-age").val(obj.age);
						$("#profile-gender").val(obj.gender);
						$("#profile-cell_number").val(obj.cell_number);
						$("#profile-country").append("<option value="+obj.country_id+" selected='true'>"+obj.country+"</option>");
						$("#profile-country").attr("disabled", true);
						$("#profile-city_state").attr("disabled", true);
						$("#profile-city_state").append("<option value="+obj.city_state+">"+obj.city_state+"</option>");
						$("#profile-email_address").val(obj.email_address);
											
							}
						}
					});
				},1000);
				}
			}
		}); //hhhh 
	});

	$("#btn-logout").click(function(){

		localStorage.removeItem("username");
		window.location.replace('login.html');
	});


	//important details
	$("#imp-details-update").click(function(){
		$("#myModal").modal("toggle");

		$("#update-details").click(function(){
			var name = $("#edit-name").val();
			var blood = encodeURIComponent($("#edit-blood").val());
			var data1 = "name="+name+"&blood="+blood;
			$("#loader").fadeIn("slow").show();
				$.ajax({
					cache: false,
					type: "POST",
					url: "http://red.cssolutions.ph/red_app/process/profile_update1.php",
					data: data1,
					success: function(data1){
						if(data1=="Success"){
							setInterval(function(){
									$.ajax({
										cache: false,
										type: "GET",
										url: "http://red.cssolutions.ph/red_app/process/profile.php",
										success: function(data){
											if(data){
											$("#loader").fadeOut("slow").hide();
											$("#loader").fadeOut("slow").hide();
											var obj = jQuery.parseJSON(data);
											$("#profile-name").empty();
											$("#blood-type").empty();
											$("#profile-name").append(obj.name);
											$("#blood-type").append(obj.blood_type);
											
											}
										}
									});
								},1000);
						}
					},

					error: function(data){
						$("#loader").fadeOut("slow").hide();
					}
				});

				$("#myModal").modal("toggle");
		});
	
	});

	//password
	$("#password-edit").click(function(){
		$("#myModal1").modal("toggle");
		$("#update-password").click(function(){
			var oldPass = $("#profile-password").val();
			var oldPass1 = $("#edit-password").val();
			var newPass = $("#edit-new-password").val();
			var confPass = $("#edit-conf-password").val();

			if(oldPass == oldPass1){
				if(newPass == confPass){
					var data2 = "newPass="+newPass;

					$("#loader").fadeIn("slow").show();
					$.ajax({
						cache: false,
						type: "POST",
						url: "http://red.cssolutions.ph/red_app/process/profile_update2.php",
						data: data2,
						success: function(data2){
							if(data2=="Success"){

									setInterval(function(){
									$.ajax({
										cache: false,
										type: "GET",
										url: "http://red.cssolutions.ph/red_app/process/profile.php",
										success: function(data){
										$("#loader").fadeOut("slow").hide();
											if(data){

											var obj = jQuery.parseJSON(data);
											$("#profile-password").val(obj.password);
											
											}
										}
									});
								},1000);
							}

						},

						error: function(data){
							$("#loader").fadeOut("slow").hide();
							alert("Something went wrong");
						}
					});
					$("#myModal1").modal("toggle");
				}
				else{
					alert("password dont match");
					$("#edit-conf-password").focus();
				}
			}
			else{
				alert("Old Password is incorrect");
			}

			
		});

		
	});


	$("#btn-change").click(function(){
		$("#myModal9").modal("toggle");
		$("#myModal8").modal("toggle");
	});

	$("#blood-type6").click(function(){
		$("#myModal8").modal("toggle");
	});

	$("#camera-opt1").click(function(){
		getImage();
	});

	$("#gallery-opt1").click(function(){
		getImage1();
	});

	function getImage() {
       navigator.camera.getPicture(uploadPhoto, function(message) {
       alert('get picture failed');
       }, {
       quality: 10,
       correctOrientation: true,
       targetWidth: 314,
       targetHeight: 320,
       destinationType: navigator.camera.DestinationType.FILE_URI,
       sourceType: navigator.camera.PictureSourceType.CAMERA
       }
    
       );
   		

      }

      function getImage1() {

       navigator.camera.getPicture(uploadPhoto, function(message) {
       alert('get picture failed');
       }, {
       quality: 10,
       correctOrientation: true,
       targetWidth: 314,
       targetHeight: 320,
       destinationType: navigator.camera.DestinationType.FILE_URI,
       sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
       }
    
       );
   		
      }


    function uploadPhoto(imageURI) {
    image2 = imageURI;
     $("#myModal8").modal("toggle");
     $("#myModal9").modal("toggle");
     var options = new FileUploadOptions();
     options.fileKey = "file";
     options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
     options.mimeType = "image/jpeg";
     console.log(options.fileName);
     var imageName = decodeURIComponent(options.fileName);
     var image1 = document.getElementById('user_profiles1');
     image1.src = imageURI;
     var params = new Object();
     params.value1 = "test";
     params.value2 = "param";
     options.params = params;
     options.chunkedMode = false;
     option1 = options;
     }	


     function saveImage(option1, image2, user_id){
     	var ft = new FileTransfer();
     		option1.fileName = user_id;
	     ft.upload(image2, "http://red.cssolutions.ph/red_app/process/profilePhoto.php", function(result){
	     console.log(JSON.stringify(result));
	    $("#loader").hide();
	    $("#myModal9").hide();
	    location.reload();
	    load();
	     }, function(error){
	     console.log(JSON.stringify(error));
	     alert("failed to upload. Try again.");
	     }, option1);
     }
});