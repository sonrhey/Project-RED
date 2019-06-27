
$("#loader").fadeIn("slow").show()
$(".whole-div").hide();

$(document).ready(function(){

	function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    

	function load(){
	var headerID = getParameterByName('headerID');
	var blood_type = encodeURIComponent(getParameterByName('blood_type'));

		$("#patients_picture").attr('src' ,'http://red.cssolutions.ph/red_app/request_photo/'+headerID+".jpg");

		$.ajax({
			cache: false,
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/greetings.php",
			success: function(data){
				var obj1 = jQuery.parseJSON(data);

		$.ajax({
			cache: false,
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/request_details.php",
			data: "headerID="+headerID,
			success: function(data){
				var obj = jQuery.parseJSON(data);
				var count = obj.length;
				var post_id;
				var userLogin = obj1.user_id;
				$("#user_picture").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+userLogin+".jpg");
				for(var i=0;i<count;i++){
					if(userLogin == obj[i].posted_by){
					posted_by1 = obj[i].posted_by;
					post_id = obj[i].id;
					$("#posted_by").append(obj[i].name);
					var DateTimeAgo = obj[i].date_time;
					var agoText = jQuery.timeago(new Date(DateTimeAgo));
					$("#time-ago").append("<p>Posted: <i>"+agoText+"</i></p>");
					$("#request-details").append("<div class='request-details-height'><b class='patients-name'>"+obj[i].patients_name+"</b>, "+obj[i].age+", <p class='request-note '><p class='hostName'><i class='fa fa-arrow-right'></i> "+obj[i].hospital_name+"</p><p class='patients_description'><i class='fa fa-arrow-right'></i> "+obj[i].note+"</p></p><br></div>");
					$("#blood-type-request").append(obj[i].blood_type);
					$("#request_details").append("<div class='suggested_member_area'><h4 class='suggested_donators'>Suggested Donor's</h4><hr class='hr1'><div id='members-area'></div></div>");

					}

					else{
					posted_by1 = obj[i].posted_by;
					post_id = obj[i].id;
					$("#user_picture").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+posted_by1+".jpg");
					$("#posted_by").append(obj[i].name);
					var DateTimeAgo = obj[i].date_time;
					var agoText = jQuery.timeago(new Date(DateTimeAgo));
					$("#time-ago").append("<p>Posted: <i>"+agoText+"</i></p>");
					$("#request-details").append("<div class='request-details-height'><b class='patients-name'>"+obj[i].patients_name+"</b>, "+obj[i].age+", <p class='request-note '><p class='hostName'><i class='fa fa-arrow-right'></i> "+obj[i].hospital_name+"</p><br><i class='fa fa-arrow-right'></i> "+obj[i].note+"</p><button class='btn btn-lg btn-primary btn-pos btn-block' id='btn-donate'>I want to Donate</button><br><br><br></div>");
						$.ajax({
							type: "POST",
							url: "http://red.cssolutions.ph/red_app/process/disable_button.php",
							data: "headerID="+headerID,
							success: function(data){
								if(data == "Error"){
									$("#btn-donate").attr("disabled", "disabled");
								}
							}

						});
					$("#blood-type-request").append(obj[i].blood_type);
					}
				}

				$.ajax({
						type: "POST",
						url: "http://red.cssolutions.ph/red_app/process/suggested_member.php",
						data: "blood_type="+blood_type,
						success: function(data){
							$("#loader").hide();
							$(".whole-div").fadeIn("slow").show();
							var obj2 = jQuery.parseJSON(data);
							var count1 = obj2.length;
							if(count1 == 0){
								$("#members-area").append("<div class='error-message'>No available Donators.<i fa fa-frown-o></i></div>");
							}
							else{
							for(var k=0;k<count1;k++){
								var user_id = obj2[k].user_id;
								$("#members-area").prepend("<div class='suggested-names' id="+obj2[k].user_id+"><div class='media'><div class='media-right' id="+obj2[k].user_id+"><img src='images' width='45' height='45' id='users_picture1' onerror=\"this.onerror=null;this.src='images/samp-image1.png';\"/></div><div class='media-body'><div class='suggested-member-name'>"+obj2[k].name+", <i>"+obj2[k].city_state+"</i></div><i class='glyphicon glyphicon-comment pull-right message-color'></i></div></div></div><hr>");								
								var images = $("#users_picture1").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+user_id+".jpg");
								
							}

							$(".suggested-names").click(function(){
							var id = this.id;
							$("#loader").show();
							$.ajax({
								cache: false,
								type: "POST",
								url: "http://red.cssolutions.ph/red_app/process/member_details.php",
								data: "id="+id,
								success: function(data){
									if(data){
									$("#loader").hide();
									var obj = jQuery.parseJSON(data);
									$("#member-profile").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+obj.user_id+".jpg");
									$("#profile-name1").empty();
									$("#profile-name").empty();
									$("#blood-type5").empty();
									$("#profile-age").empty();
									$("#profile-gender").empty();
									$("#profile-country").empty();
									$("#profile-city_state").empty();
									$("#profile-name").prepend(obj.name);
									$("#profile-name1").prepend(obj.name);
									var age1 = obj.age;
									var finalAge = age1;
									$("#blood-type5").prepend(obj.blood_type);
									$("#profile-age").val(finalAge);
									$("#profile-gender").val(obj.gender);
									$("#profile-country").val(obj.country);
									$("#profile-city_state").val(obj.city_state);
									$("#myModal13").modal("toggle");


									$("#donate").click(function(){
											$("#loader").show();
											var id = obj.user_id;
											var name = obj.name;
											var data1 = "id="+id+"&name="+name;
											$("#loader").fadeIn("slow").show();
											window.location.replace("donation_history_member.html?"+data1);
													
											
										});

									$("#send_message").click(function(){
										$("#loader").show();
										var id = obj.user_id;
										var name = obj.name;
										var data = "id="+id+"&name="+name;
										window.location.replace("message.html?"+data);
									});



									}
								}
							});

							});

							}
						}
					});

				$("#btn-donate").click(function(){
				$("#loader").fadeIn("slow").show();
				var post_id1 = post_id; 
				var posted_by2 = posted_by1;
				var data = "post_id1="+post_id1+"&posted_by2="+posted_by2;
				$.ajax({
					cache: false,
					type: "POST",
					url: "http://red.cssolutions.ph/red_app/process/donate.php",
					data: data,
					timeout: 600000,
					success: function(data){
						if(data=="Save"){
						$("#loader").hide();
						$("#my_audio1").get(0).play();
						alert("Donation Send!");
						$("#btn-donate").attr("disabled", "disabled");
					}

						else if(data=="Error"){
						$("#my_audio2").get(0).play();
						alert("You already donated!");
						$("#loader").hide();
						
					}
					},

					error: function(data){
						alert("There's Something wrong with your network!");
					}
				});

			});
			}
		}); //end request details

		}

		});
	}
	load();



	



});//docoment ready