$(document).ready(function(){


	var obj;
	var receiver_id = getParameterByName('id');
	var name = getParameterByName('name');
	var i;
	var count;
	var id;
	var page = $("html, body");
	var a;
	var messageID = [];
	$("#loader, #loader2").fadeIn("slow").show();

$("#receiverPicture").attr('src', 'http://red.cssolutions.ph/red_app/profile_photo/'+receiver_id+".jpg");
$(window).scroll(function(){

if($(this).scrollTop()>0){
	if(!$(".name-bg").hasClass('navbar-fixed-top')){
		 $('.name-bg').stop().addClass('navbar-fixed-top').css({'top':'-50px',
		 	'-webkit-box-shadow':' 0px -10px 43px 8px rgba(0,0,0,0.78)',
		 	'-moz-box-shadow':' 0px -10px 43px 8px rgba(0,0,0,0.78)', 
		 	'box-shadow':' 0px -10px 43px 8px rgba(0,0,0,0.78)'}).animate({'top': '0px'}, 500);
		 $("#messages").stop(true);
	}
}

else{

	$('.name-bg').removeClass('navbar-fixed-top').css({'top':'',
		 	'-webkit-box-shadow':'',
		 	'-moz-box-shadow':'', 
		 	'box-shadow':''});
	$("#messages").stop(true);
}


});

	
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

    function insertMessageHeader(){

    	var data = "receiver_id="+receiver_id;
    	$.ajax({
    		type: "POST",
    		url: "http://red.cssolutions.ph/red_app/process/message_code.php",
    		data: data,
    		success: function(data){
    			console.log(data);
    		}
    	});
    }

    insertMessageHeader();

	$("#send").click(function(){
		var message = $("#message-box").val();
		//$("#messages").append("<div class='container'><div class='row message-wrapper'><div class='message-bg pull-right'>"+message+"</div></div></div>");
		//$("#messages").append("<div class='container'><div class='row message-wrapper'><div class='message-bg1 pull-left'>"+message+"</div></div></div>");
		$("#message-box").val("");
		var data = "receiver_id="+receiver_id+"&message="+message;

		$.ajax({
			type: "POST",
			url: "http://red.cssolutions.ph/red_app/process/message.php",
			data: data,
			success: function(data){
				
				if(data == "Success"){
					console.log(data);
					$("#my_audio").get(0).play();
					sendMessage();
					page.animate({ scrollTop: page.prop("scrollHeight")}, 1000);
			}
			}
		});


	});

		var messId = [];

		function sendMessage(){
		setInterval(function(){
			$.ajax({
				type: "GET",
				url: "http://red.cssolutions.ph/red_app/process/greetings.php",
				success: function(data){
					if(data){
					$("#loader, #loader2").hide();
					obj = jQuery.parseJSON(data);
					id = obj.user_id;
				$.ajax({
					type: "GET",
					url: "http://red.cssolutions.ph/red_app/process/conversation.php",
					data:"receiver_id="+receiver_id,
					success: function(data){
						if(data){
						obj = jQuery.parseJSON(data);
						count = obj.length;
						for(i=0;i<count;i++){

							if(messId.indexOf(obj[i].id) == -1){
								messId.push(obj[i].id);

							if(obj[i].sender_id == id){
								$("#messages").append("<div class='container container1' id="+obj[i].id+"><div class='row message-wrapper'><div class='message-bg pull-right'>"+obj[i].content+"</div></div></div>");
								
							}
							else{
								//var recImage = receiver_id;
								$("#messages").append("<div class='container container2' id="+obj[i].id+"><div class='row message-wrapper'><div class='message-bg1 pull-left'>"+obj[i].content+"</div></div></div>");
								//var recI = $("#receiversPic").append('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+recImage+".jpg");
								if(obj[i].status == 'UNREAD'){
									$("#my_audio1").get(0).play();
									page.animate({ scrollTop: page.prop("scrollHeight")}, 1000);
									updateMessage1();
								}

							}

							}
						}
						page.animate({ scrollTop: page.prop("scrollHeight")}, 1000);
					}
					}
				});
			}
			}
			});
		},1000);
		}
		sendMessage();

	$(".back-button").click(function(){
		window.location.replace("inbox.html");
	});

	function receiversName(){
		$("#receivers-name-id").append(name);

	}
	receiversName();



	function updateMessage(){
		var sender_id = receiver_id;

		var data = "sender_id="+sender_id;

		$.ajax({
			type: "POST",
			url: "http://red.cssolutions.ph/red_app/process/updateStatus.php",
			data: data,
			success: function(data){
				console.log(data);
			}
		});
	}

	updateMessage();

	function updateMessage1(){
		var sender_id = receiver_id;

		var data = "sender_id="+sender_id;
		setInterval(function(){
		$.ajax({
			type: "POST",
			url: "http://red.cssolutions.ph/red_app/process/updateStatus.php",
			data: data,
			success: function(data){
				console.log(data);
			}
		});

		},3000);
	}


});

