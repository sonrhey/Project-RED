$(document).ready(function(){
	function load(){
		$.ajax({
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/donation_count.php",
			success: function(data){
				if(data){
					$("#donation_count").append("<div><h4 class='count'>"+data+"</h4></div>");
					$(".count").each(function(){
						$("#donation_count").prop('Counter',0).animate({
							Counter: $("#donation_count").text()
						},{
							duration: 1000,
							easing: 'swing',
							step: function(now){
								$("#donation_count").text(Math.ceil(now));
							}
						});

					});
				}
			}
		});
	}

	load();

	$("#show_detailed").click(function(){
		$("#loader").fadeIn("slow").show();
		$("#donation_list").slideToggle(function(){
			
			$.ajax({
				type: "GET",
				url: "http://red.cssolutions.ph/red_app/process/donation_content.php",
				success: function(data){
					$("#loader").hide();
					$("#donation_list").empty();
					$("#donation_list").append("<h4 class='title'><center>People you Donated:</center></h4><hr class='titles'>");
					var obj = jQuery.parseJSON(data);
					var count = obj.length;

					for(var i=0;i<count;i++){
						$("#donation_list").append("<div class='media media-position'><div class='media-right'><img src='images/samp-image1.png' class='img-position1' width='50'/></div><div class='media-body'><h5 class='receiver-name'>"+obj[i].name+"<i class='fa fa-check pull-right icon-check'></i></h5></div></div><hr class='name-divider'>");
					}

				}
			});


			
		});
	});
		
	
});