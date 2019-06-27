$(document).ready(function(){

	//NOT VISITED
	$("#loader").fadeIn("slow").show();
	$(".whole-div").hide();

	function load1(){
		$.ajax({
					cache: false,
					type: "GET",
					url: "http://red.cssolutions.ph/red_app/process/alert_content.php",
					success: function(data1){
						if(data1){
						$("#loader").hide();
						$(".whole-div").fadeIn("slow").show();
						var obj = jQuery.parseJSON(data1);
						var count = obj.length;
				
					for(var i=0; i<count;i++){
					var visited_status1 = obj[i].visited_status;
					if(visited_status1 == "NOT VISITED"){
					var user_id1 = obj[i].user_id;
					var color = "#af0707";
					var note1 = obj[i].note;
					var trimNote = jQuery.trim(note1).substring(0,100).split(" ").slice(0, -1).join(" ")+"...<button class='btn-link' id='more-link' style='text-decoration:none'> more</button>";

					$("#notifications_list").prepend("<div class='container padding-post1' id="+obj[i].user_id+" style='border-left: 5px solid "+color+" '><div class='media'><div class='media-left'><img src='images1' id='users_picture2' width='50' height='50' class='notif-image-pos' onerror=\"this.onerror=null;this.src='images/samp-image1.png';\"/></div><div class='media-body'><div class='notif-wrapper'><div class='notif-poster'>"+obj[i].user_name+"</div><div class='notif-note'><i class='fa fa-arrow-right'></i> "+obj[i].note+"</div></div></div></div></div><div class='container'><hr id='notif-divider'></div>");
					var images1 = $("#users_picture2").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+user_id1+".jpg"); 
					}
				} 

					$(".padding-post1").click(function(){
						var id = this.id;
						var data2 = "id="+id;
						$("#loader").fadeIn("slow").show();
						$.ajax({
							type: "POST",
							url: "http://red.cssolutions.ph/red_app/process/request_visited_status_update.php",
							data: data2,
							success: function(data1){
								if(data1=="Update"){
								$("#loader").hide();
								window.location.replace('member_details.html?'+data2);
								}
							}
						});
					
					});

					}
					}

				});
	}


	function load2(){
		$.ajax({
					cache: false,
					type: "GET",
					url: "http://red.cssolutions.ph/red_app/process/notifications_content.php",
					success: function(data2){

					if(data2){


						$("#loader").hide();
						$(".whole-div").fadeIn("slow").show();
						var obj = jQuery.parseJSON(data2);
						var count = obj.length;
					
					if(count == 0){

					}
					else{
					for(var i=0; i<count;i++){
					var visited_status1 = obj[i].visited_status;
					if(visited_status1 == "UNVISITED"){
					var color = "#af0707";
					var note1 = obj[i].note;
					var trimNote = jQuery.trim(note1).substring(0,100).split(" ").slice(0, -1).join(" ")+"...<button class='btn-link' id='more-link' style='text-decoration:none'> more</button>";
					var user_id3 = obj[i].posted_by;
					$("#notifications_list1").prepend("<div class='container padding-post' style='border-left: 5px solid "+color+" ' id="+obj[i].header_id+"><div class='media' id="+obj[i].posted_by+"><div class='media-left'><img src='images3' width='50' height='50' id='users_picture3' class='notif-image-pos' onerror=\"this.onerror=null;this.src='images/samp-image1.png';\"/></div><div class='media-body'><div class='pull-right notif-blood-type-request'>"+obj[i].blood_type+"</div><div class='notif-poster'>"+obj[i].name+"</div><div class='poster-location'>"+obj[i].city_state+", "+obj[i].country+"</div><div class='notif-note'><i class='fa fa-arrow-right'></i> "+trimNote+"</div></div></div></div><div class='container'><hr id='notif-divider'></div>");
					var images3 = $("#users_picture3").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+user_id3+".jpg"); 
					}
				} 
				}
		
					$(".padding-post").click(function(){
						var headerID = this.id;
						var data2 = "headerID="+headerID;
						$("#loader").fadeIn("slow").show();
						$.ajax({
							type: "POST",
							url: "http://red.cssolutions.ph/red_app/process/request_visited_status_update.php",
							data: data2,
							success: function(data2){
								if(data2=="Update"){
								$("#loader").hide();
								window.location.replace('request_details.html?'+data2);
								}
							}
						});
					
					});

					}
					}
				});
	}


	//VISITED
	function load3(){
				
				$.ajax({
					cache: false,
					type: "GET",
					url: "http://red.cssolutions.ph/red_app/process/alert_content.php",
					success: function(data3){
						if(data3){


						$("#loader").hide();
						$(".whole-div").fadeIn("slow").show();
						var obj = jQuery.parseJSON(data3);
						var count = obj.length;
					
					for(var i=0; i<count;i++){
						var visited_status1 = obj[i].visited_status;
						if(visited_status1 == "VISITED"){
						var color = "white";
						var note1 = obj[i].note;
						var trimNote = jQuery.trim(note1).substring(0,100).split(" ").slice(0, -1).join(" ")+"...<button class='btn-link' id='more-link' style='text-decoration:none'> more</button>";
						var user_id2 = obj[i].user_id;
						$("#notifications_list2").prepend("<div class='container padding-post2' id="+obj[i].user_id+" style='border-left: 5px solid "+color+" '><div class='media'><div class='media-left'><img src='images2' width='50'  height='50' id='users_picture3' class='notif-image-pos' onerror=\"this.onerror=null;this.src='images/samp-image1.png';\"/></div><div class='media-body'><div class='notif-poster'>"+obj[i].user_name+"</div><div class='notif-note'><i class='fa fa-arrow-right'></i> "+obj[i].note+"</div></div></div></div><div class='container'><hr id='notif-divider'></div>");
						var images2 = $("#users_picture3").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+user_id2+".jpg"); 
						}
					}
					

					$(".padding-post2").click(function(){
						var id = this.id
						var data2 = "id="+id;
						$("#loader").fadeIn("slow").show();
						$(".whole-div").fadeIn("slow").show();
						$.ajax({
							type: "POST",
							url: "http://red.cssolutions.ph/red_app/process/request_visited_status_update.php",
							data: data2,
							success: function(data3){
								if(data3=="Update"){
								$("#loader").hide();
								window.location.replace('member_details.html?'+data2);
								
								}
							}
						});
						
					
					});

					}
					}
				});
	}


	function load4(){
				
				$.ajax({
					cache: false,
					type: "GET",
					url: "http://red.cssolutions.ph/red_app/process/notifications_content.php",
					success: function(data4){

						if(data4){


						$("#loader").hide();
						var obj = jQuery.parseJSON(data4);
						var count = obj.length;

					if(count == 0){

					}
					else{


					for(var i=0; i<count;i++){

						var visited_status1 = obj[i].visited_status;
						if(visited_status1 == "VISITED"){
						var color = "white";
						var note1 = obj[i].note;
						var trimNote = jQuery.trim(note1).substring(0,100).split(" ").slice(0, -1).join(" ")+"...<button class='btn-link' id='more-link' style='text-decoration:none'> more</button>";
						var user_id4 = obj[i].posted_by;
						$("#notifications_list3").prepend("<div class='container padding-post' style='border-left: 5px solid "+color+" ' id="+obj[i].header_id+"><div class='media' id="+obj[i].posted_by+"><div class='media-left'><img src='images4' width='50'  height='50' id='users_picture4' class='notif-image-pos' onerror=\"this.onerror=null;this.src='images/samp-image1.png';\"/></div><div class='media-body'><div class='pull-right notif-blood-type-request'>"+obj[i].blood_type+"</div><div class='notif-poster'>"+obj[i].name+"</div><div class='poster-location'>"+obj[i].city_state+", "+obj[i].country+"</div><div class='notif-note'><i class='fa fa-arrow-right'></i> "+trimNote+"</div></div></div></div><div class='container'><hr id='notif-divider'></div>");
						var images4 = $("#users_picture4").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+user_id4+".jpg"); 

						}
					}
					}
					$(".padding-post").click(function(){
						var headerID = this.id;
						var data2 = "headerID="+headerID;
						$("#loader").fadeIn("slow").show();
						$.ajax({
							type: "POST",
							url: "http://red.cssolutions.ph/red_app/process/request_visited_status_update.php",
							data: data2,
							success: function(data4){
								if(data4=="Update"){
								window.location.replace('request_details.html?'+data2);

								$("#loader").hide();
								}
							}
						});
					
					});

					}
					}
				});
	}


	function loadAll(){
		load1();
		load2();
		load3();
		load4();
		$("#loader").hide();
	}

	loadAll();
});

