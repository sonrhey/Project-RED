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

	var id = getParameterByName('id');

	function load(){

	
		var id2 = id;
		$.ajax({
			cache: false,
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/donation_history_member.php",
			data: "id="+id2,
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

	function load1(){
		var name = getParameterByName('name');
		var trimName = jQuery.trim(name).substring(0,10).split(" ").slice(0, -1).join(" ")+" ";
		var id1 = id;
				$.ajax({
				cache: false,
				type: "GET",
				url: "http://red.cssolutions.ph/red_app/process/donation_member_content.php",
				data: "id="+id1,
				success: function(data){
					$("#loader").hide();
					$("#donation_list").empty();
					var obj = jQuery.parseJSON(data);
					var count = obj.length;
					$("#donation_list").append("<h4 class='title'><center>Donation(s) made by, <h3>''" +trimName+ "''</h3></center></h4><hr class='titles'>");
					
					if(count == 0){
						$("#donation_list").append("<h4 class='error-message-don'>You have no Donations made!</h4>");
					}
					else{
					for(var i=0;i<count;i++){
						$("#donation_list").append("<div class='media media-position'><div class='media-right'><img src='images/samp-image1.png' class='img-position1' width='50'/></div><div class='media-body'><h5 class='receiver-name'>"+obj[i].name+"<i class='fa fa-check pull-right icon-check'></i></h5></div></div><hr class='name-divider'>");
					}
					}

				}
			});
	}


	$("#show_detailed").click(function(){
		$("#loader").fadeIn("slow").show();
		$("#donation_list").slideToggle(function(){
				load1();
		});
	});
		
	
});