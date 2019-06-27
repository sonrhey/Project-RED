


$(document).ready(function(){

	//auto complete place 
	var option1;
	var image2;
    
	$("#loader, #loader2").fadeIn("slow").show();
	$(".whole-div").hide();

	function load1(){
	setInterval(function(){

		$.ajax({
			cache: false,
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/notifications.php",
			success: function(data3){
				var bloodTypeCount = data3;
				$.ajax({
					type: "GET",
					url: "http://red.cssolutions.ph/red_app/process/alert.php",
					success: function(data4){

						var alertCount = data4;
						var sumAlerts = 0;

						sumAlerts = Number(alertCount) + Number(bloodTypeCount);
						if(sumAlerts > 0){

							if(postIDs.indexOf(sumAlerts) == -1){
							postIDs.push(sumAlerts);

							$(".badge-pos").empty();
							$("#my_audio").get(0).play();
							$(".badge-pos").append("<span class='badge badge-padding' id= "+sumAlerts+">"+sumAlerts+"</span>");
								original_title = document.title
								document.title = "("+sumAlerts+") " + original_title;
							}
						}
					}
				});
			}
		});
	},1000);	

	}
	load1();

	function messageCount(){
	setInterval(function(){

		$.ajax({
			cache: false,
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/message_count.php",
			success: function(data3){
				
				var messageCount = data3;
				if(messageCount > 0){
					if(postIDs.indexOf(messageCount) == -1){
					postIDs.push(messageCount);

					$("#badge-id1").empty();

					if(messageCount >99){
						$("#my_audio1").get(0).play();
						$(".badge-pos1").append("<span class='badge badge-padding1' id= "+data3+">99+</span>");
						
					}
					else{
						$("#my_audio1").get(0).play();
						$(".badge-pos1").append("<span class='badge badge-padding1' id= "+data3+">"+data3+"</span>");
						
					}
					}
				}
				
			}
		});
	},1000);	

	}
	messageCount();


	function load(){
		$.ajax({
			cache: false,
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/greetings.php",
			success: function(data){
				if(data){

				var obj = jQuery.parseJSON(data);
				var user_id = obj.user_id;
				$("#user_profiles").attr('src', 'http://red.cssolutions.ph/red_app/profile_photo/'+user_id+".jpg");
				var country_id = obj.country_id;
				var reg2 = obj.city_state;
				var name = obj.name;
				var trimName = jQuery.trim(name).substring(0,10).split(" ").slice(0, -1).join(" ")+" ";
				var trimName1 = jQuery.trim(name).substring(0,10).split(" ").slice(0, -1).join(" ")+" ";
				$("#greetings").append(trimName);
				$("#blood-type").append(obj.blood_type);
				$("#region").append(obj.city_state);
				$("#country").append(obj.country);
				$("#regions").append("<option value="+obj.city_state+" selected>"+obj.city_state+"</option>");

				$.ajax({
					type: "GET",
					url: "http://red.cssolutions.ph/red_app/process/regions.php?id="+country_id,
					success: function(data){
						var obj = jQuery.parseJSON(data);
					 	var count = obj.length;
					 	$("#regions").empty();
					 	if(count == 0){
					 		$("#regions").append("<option>No Cities in this Country</option>");
					 	}

			 			else{
			 				var reg = reg2;
						 	for(var i=0; i<count;i++){	
						 		if(reg == obj[i].name){
						 			$("#regions").append("<option value='"+obj[i].name+"' selected>"+obj[i].name+"</option>");
						 		}
						 		else{
						 			$("#regions").append("<option value='"+obj[i].name+"'>"+obj[i].name+" </option>");
						 		}
								
								}
			 			}

					}

				});
				}
			}
		});


	}
	load();


//Top smooth scrolling effect

	$("#backToTop").click(function(){
		$('html, body').animate({
			scrollTop: $("#main").offset().top
		},1000);
	});

	$("#imgup").click(function(){
		$("#top").removeClass('navbar-fixed-top');
	});

//fix top
$(window).scroll(function(){

if($(this).scrollTop()>0){
	if(!$(".header-bg1").hasClass('navbar-fixed-top')){
		 $('.header-bg1').stop().addClass('navbar-fixed-top').css({'top':'-50px',
		 	'-webkit-box-shadow':' 0px -10px 43px 8px rgba(0,0,0,0.78)',
		 	'-moz-box-shadow':' 0px -10px 43px 8px rgba(0,0,0,0.78)', 
		 	'box-shadow':' 0px -10px 43px 8px rgba(0,0,0,0.78)'}).animate({'top': '0px'}, 500);
	}
}

else{
	$('.header-bg1').removeClass('navbar-fixed-top').css({'top':'',
		 	'-webkit-box-shadow':'',
		 	'-moz-box-shadow':'', 
		 	'box-shadow':''});
}


});


$(".header-bg")
//Modal Toggle

$("#newPost").click(function(){
	$("#myModal").modal("toggle");
});

//Age increment
$(function(){
    var $select = $(".age");

    for (i=0;i<=80;i++){
        $select.append($("<option></option>").val(i).html(i+" yrs. old"));
    }
});

//New Post

$("#newPost1").click(function(){

		var patients_name = $("#patients_name").val();
		var age = $("#age").val();
		var gender = $("#gender").val();
		var bloodType = encodeURIComponent($("#bloodType1").val());
		var bloodType3 = $("#bloodType1").val();
		var note = $("#note").val();
		var city_state = $("#regions").val();
		if($("select#hospital_name").val() === "other"){
			var hospital_name = $("input#hospital_name").val();
		}
		else{
			var hospital_name = $("select#hospital_name").val();
		}
		
		
	if((patients_name == null)||(age == null)||(gender == null)||(bloodType3 == null)||(note == null)||(city_state == null)||(hospital_name == null)){
		alert("Please fill up all fields!");
	}
	else{
	$("#loader").fadeIn("slow").show();
		var data1 = "patients_name="+patients_name+"&age="+age+"&gender="+gender+"&bloodType="+bloodType+"&note="+note+"&city_state="+city_state+"&hospital_name="+hospital_name;
		$.ajax({
			type: "POST",
			url: "http://red.cssolutions.ph/red_app/process/dashboard.php",
			data: data1,
			success: function(data){
				console.log(data);
				$("#loader").hide();
				alert("Request Posted!");
				$("#myModal").modal("toggle");
				if(data!="null"){
					var obj = jQuery.parseJSON(data);
					var headerID = obj.id;
					var blood_type = bloodType;
					$("#loader, #loader3").show();
					var data4 = "headerID="+headerID+"&blood_type="+blood_type;
					window.location.replace("request_details.html?"+data4);
					saveImage(option1, image2, headerID);
					
				}
			}
		});

		
		}


}); 



var postIDs = [];

function request(){
setInterval(function(){
$.ajax({
	cache: true,
	type: "GET",
	url: "http://red.cssolutions.ph/red_app/process/request.php",
	success: function(data){

		if(data){

		$(".whole-div").fadeIn("fast").show();
		var obj = jQuery.parseJSON(data);
		var count = obj.length;
		var count1 = obj.length;
		var borderColor = 0;

			if(count == 0){
				$("#loader, #loader2").hide();
			}

			for(var i=0; i<count;i++){
			var headerID = obj[i].header_id;
			var name = obj[i].name;
			var trimName1 = jQuery.trim(name).substring(0,10).split(" ").slice(0, -1).join(" ")+" ";
			 if(postIDs.indexOf(obj[i].header_id) == -1){
			 $("#loader, #loader2").hide();
			 postIDs.push(obj[i].header_id);
			if(count1%2 == 0){
				var color = "#bbb9ba";
			}

			else{
				var color = "#929091";
			}
			var DateTimeAgo = obj[i].date_time;
			var agoText = jQuery.timeago(new Date(DateTimeAgo));
			var note1 = obj[i].note;
			var trimNote = note1.substr(0,175)+"...<button class='btn-link' id='more-link' style='text-decoration:none'> more</button>";
			$("#requestsArea").prepend($("<div class='row row1 request-bg' id="+obj[i].header_id+" name="+obj[i].blood_type+" style='border-left:5px solid "+color+"'><div class='col-xs-3'><img src='image' width='55' class='img-position' id='patients_picture1' onerror=\"this.onerror=null;this.src='images/samp-image1.png';\"/></div><div class='col-xs-6 request-details request-details-name' id='request-name'><p class='posters-name'>"+obj[i].patients_name+"</p><div class='posted-time'>Posted by: <b class='posted_name'>"+trimName1+", </b><i>"+agoText+"</i></div><div class='idn' id='more-note'>"+trimNote+"</div></div><div class='col-xs-3'><div class='pull-right'><span class='label label-danger request-details' id='request-blood-type'>"+obj[i].blood_type+"</span></div></div></div>").fadeIn('slow'));	
			
			 var image = $("#patients_picture1").attr('src' ,'http://red.cssolutions.ph/red_app/request_photo/'+headerID+".jpg");

			 count1++;
			 } 
			 
			}	
			

			$(".row1").click(function(){
			$("#loader").fadeIn("slow").show();
			var blood_type = encodeURIComponent($(this).attr('name'));
			var headerID = this.id;
			var data2 = "headerID="+headerID+"&blood_type="+blood_type;
			window.location.replace('request_details.html?'+data2);

			});
			
	}

	else{
		$(".whole-div").fadeIn("fast").show();
		$("#loader,#loader2").hide();
	}
	}

});
 },1000);
}
request();

function message(){

	$("#message").click(function(){
		window.location.replace("inbox.html");
	});
}
message();

// function alert(){
// if(cordova.plugins.diagnostic){
// cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
//     console.log("GPS location is " + (enabled ? "enabled" : "disabled"));
//     alert("En");
// }, function(error){
//     console.error("The following error occurred: "+error);
// });
// }
// }

// alert();

function navigate(){


	if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
          enableHighAccuracy: true;
         var lat = position.coords.latitude,
	     lng = position.coords.longitude;

	     $.ajax({
	type: "GET",
	url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCrPdIMWf1_tjWdYG1-OifL3dzkDvoJakU&radius=50000&location="+lat+","+lng+"&type=hospital&rankBy=distance",
	success: function(data){

		var count = Object.keys(data.results).length;
		for(var i=0; i<count; i++){
			// alert(data.results[i].name);
			var hostName = encodeURIComponent(data.results[i].name);
			$("#hospital_name").append("<option value="+hostName+">"+data.results[i].name+"</option>");

		}
		


			}
		});


          });
}


}

navigate();


	$("#hospital_name").change(function(){
		var hospital_name = $("#hospital_name").val();

		if(hospital_name === "other"){
			$(".hide-this").show();
			$("input#hospital_name").focus();

		}

		else{
			$(".hide-this").hide();
		}
	});

	function hospitalChange(){
		var hospital_name = $("#hospital_name").val();

			if(hospital_name === "other"){
				$(".hide-this").show();
				$("input#hospital_name").focus();

			}	
	}
	
	hospitalChange();


	$("#btn-upload").click(function(){
		$("#myModal5").modal("toggle");
	});

	$("#camera-opt").click(function(){
		getImage();
	});

	$("#gallery-opt").click(function(){
		getImage1();
	});

	function getImage() {
       navigator.camera.getPicture(uploadPhoto, function(message) {
       alert('get picture failed');
       }, {
       quality: 10,
       correctOrientation: true,
       targetWidth: 600,
       targetHeight: 400,
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
       targetWidth: 600,
       targetHeight: 400,
       destinationType: navigator.camera.DestinationType.FILE_URI,
       sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
       }
    
       );
   		
      }


    function uploadPhoto(imageURI) {
    image2 = imageURI;
     $("#myModal5").modal("toggle");
     var options = new FileUploadOptions();
     options.fileKey = "file";
     options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
     options.mimeType = "image/jpeg";
     console.log(options.fileName);
     $("#user_profile").show();
     var imageName = decodeURIComponent(options.fileName);
     var image1 = document.getElementById('user_profile');
     image1.src = imageURI;
     var params = new Object();
     params.value1 = "test";
     params.value2 = "param";
     options.params = params;
     options.chunkedMode = false;
     option1 = options;
     }	


     function saveImage(option1, image2, headerID){
     	var ft = new FileTransfer();
     		option1.fileName = headerID;
	     ft.upload(image2, "http://red.cssolutions.ph/red_app/process/requestPhoto.php", function(result){
	     console.log(JSON.stringify(result));
	     $("#loader").hide();


	     }, function(error){
	     console.log(JSON.stringify(error));
	     alert("failed to upload. Try again.");
	     }, option1);
     }

     $("#toggle-butt").click(function(){
     	$("#bs-example-navbar-collapse-1").collapse("toggle");
     });

     $("#user_profiles").click(function(){
     	window.location.replace("profile.html");
     });

     $("#logout").click(function(){
     	localStorage.removeItem("username");
		window.location.replace('login.html');
     });
}); //end document ready
