$(document).ready(function(){
	function load(){

		$("#loader").fadeIn("slow").show();
		$(".whole-div").hide();
		$.ajax({
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/member_list.php",
			success: function(data){
				$("#loader").hide();
				$(".whole-div").fadeIn("slow").show();
				var obj = jQuery.parseJSON(data);
				var count = obj.length;
				var borderColor = 0;

				for(var i=0; i<count;i++){
					if(borderColor%2==0){
						var color = "#929091";
					}
					else{
						var color = "#bbb9ba";
					}

					$("#member_list").append("<div id="+obj[i].user_id+" class='member_list_bg mem-details' style='border-left:5px solid "+color+"'><div class='media_wrapper pos'><div class='media-left member-image-pos'><img src='images/samp-image1.png' class='member-image-pos1' width='65'/><span class='label label-danger' id ='blood-type1'>"+obj[i].blood_type+"</span></div><div class='media-body'><h5 class='member-name'>"+obj[i].name+"</h5><p class='member-details'>"+obj[i].age+", "+obj[i].city_state+", "+obj[i].code+"</p></div></div><span class='fa fa-comments-o fa-3x pull-right message-pos'></span></div><p class='message-now pull-right'>Message Now!</p>");
					borderColor++;
				}

					$(".mem-details").click(function(){
					var id = this.id;
					var data2 = "id="+id;
					$("#loader").fadeIn("slow").show();
							window.location.replace('member_details.html?'+data2);
							
					
					});

			}
		});

	}

	load();
});