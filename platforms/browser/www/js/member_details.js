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


  	$("#loader").fadeIn("slow").show();
    $(".whole-div").hide();
	function load(){

		var id = getParameterByName('id');
		$("#member-profile").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+id+".jpg");

		$.ajax({
			cache: false,
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/member_details.php",
			data: "id="+id,
			success: function(data){
				$("#loader").hide();
				$(".whole-div").fadeIn("slow").show();
				if(data){
				var obj = jQuery.parseJSON(data);
				$("#profile-name").append(obj.name);
				var age1 = obj.age;
				var finalAge = age1;
				$("#edit-name").val(obj.name);
				$("#blood-type5").append(obj.blood_type);
				$("#profile-age").val(finalAge);
				$("#profile-gender").val(obj.gender);
				$("#profile-cell_number").val(obj.cell_number);
				$("#profile-country").val(obj.country);
				$("#profile-city_state").val(obj.city_state);
				$("#profile-email_address").val(obj.email_address);
				}
			}
		});
	}

	load();


			$("#donate").click(function(){
				var id = getParameterByName('id');
				var name = $("#profile-name").text();

				var data1 = "id="+id+"&name="+name;
				$("#loader").fadeIn("slow").show();
				window.location.replace("donation_history_member.html?"+data1);
						
				
			});

$("#send_message").click(function(){
	var id = getParameterByName('id');
	var name = $("#profile-name").text();
	var data = "id="+id+"&name="+name;
	window.location.replace("message.html?"+data);
});


});