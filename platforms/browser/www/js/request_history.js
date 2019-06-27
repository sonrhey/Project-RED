$(document).ready(function(){
	function load(){
		$("#loader").fadeIn("slow").show();
		$(".whole-div").hide();
		$.ajax({
			cache: false,
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/request_history.php",
			success: function(data){
				var obj = jQuery.parseJSON(data);
				var count = obj.length;
				var borderColor = 0;

				if(count == 0){

				$("#loader").hide();
				$(".whole-div").fadeIn("slow").show();
					$("#request_list").append("<div class='error-pos'><h5>No request history yet... <i class='fa fa-frown-o fa-2x'></i></h5></div>");
				}

				else{

				$("#loader").hide();
				$(".whole-div").fadeIn("slow").show();
				for(var i=0; i<count;i++){
				if(borderColor%2==0){
					var color = "#929091";
				}
				else{
					var color = "#bbb9ba";
				}

				$("#request_list").append("<div class='request_history_bg' id= "+obj[i].id+" style='border-bottom: 5px solid "+color+";'><div class='container request_history_details'><div class='patients_name_padding'><span class='fa fa-trash fa-2x trash-bg pull-right' id="+obj[i].id+"></span>&nbsp;&nbsp; "+obj[i].patients_name+", "+obj[i].age+ " <label class='label label-danger request_blood_type_note pull-left'>"+obj[i].blood_type+"</label></div><hr class='divider-line'><div class='request_note'><span class='fa fa-arrow-right'></span> "+obj[i].note+"</div></div></div>");
				borderColor++;
				}

				$("#request_list").append(" <div class='btn-delete'><button class='btn btn-lg btn-block btn-danger ' id='btn-clear'><i class='fa fa-trash fa-1x'></i> Clear All</button></div><button class = 'btn btn-lg btn-block btn-success ' id='btn-donation-history'>Donation History</button>");


				$(".trash-bg").click(function(){
					 $(this).closest("div.request_history_bg").fadeOut().remove();

				});

				$("#btn-clear").click(function(){
					 $(".request_history_bg").fadeOut().remove();

				});

				$("#btn-donation-history").click(function(){
					window.location.replace("donation_history.html");
				});
				}
			}
		});
	}

	load();
});