$(document).ready(function(){
	
	var obj;
	var i;
	var count = 0;

	$("#loader, #loader2").fadeIn("slow").show();

	function updateMessageView(){
		$.ajax({
			type: "GET",
			url: "http://red.cssolutions.ph/red_app/process/updateMessage.php",
			success: function(data){
				console.log(data);
			}
		});
	}
	updateMessageView();

	function messageInbox(){
	$.ajax({
		type: "GET",
		url: "http://red.cssolutions.ph/red_app/process/message_list.php",
		success: function(data){
			
			if(data){
			$("#loader, #loader2").hide();
			obj = jQuery.parseJSON(data);
			count = obj.length;
			var color = "red";
			var color1 = "white";
			for(i=0;i<count;i++){
				if(obj[i].status == 'UNREAD'){
					var senderID = obj[i].sender_id;
					$("#message-list1").prepend("<div class='message_code' id="+obj[i].code+"><div class='media media-clic' style='border-left: 4px solid "+color+"' id="+obj[i].sender_id+" value="+obj[i].name+"><input type='hidden' class='media-clic' value="+obj[i].name+"/><div class='media-left'><img src='senderImage' id='senders-pic' width='40' height='40' class='senders-image' onerror=\"this.onerror=null;this.src='images/samp-image1.png';\"/></div><div class='media-body senders-preview'><p class='media-clic senders-name' id="+obj[i].name+">"+obj[i].name+"</p><p class='pull-right mess-count'></p><div><p class='senders-message'><i class='fa fa-arrow-right'></i> "+obj[i].content+"</p></div></div></div><hr class='mess-divider'></div>");
					var senderImage = $("#senders-pic").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+senderID+".jpg"); 
				}
				
			}

			for(i=0;i<count;i++){
				if(obj[i].status == 'READ'){
					var senderID = obj[i].sender_id;
					$("#message-list1").prepend("<div class='message_code' id="+obj[i].code+"><div class='media media-clic' style='border-left: 4px solid "+color1+"' id="+obj[i].sender_id+" value="+obj[i].name+"><input type='hidden' class='media-clic' value="+obj[i].name+"/><div class='media-left'><img src='senderImage' id='senders-pic' width='40' height='40' class='senders-image' onerror=\"this.onerror=null;this.src='images/samp-image1.png';\"/></div><div class='media-body senders-preview'><p class='media-clic senders-name' id="+obj[i].name+">"+obj[i].name+"</p><p class='pull-right mess-count'></p><div><p class='senders-message'><i class='fa fa-arrow-right'></i> "+obj[i].content+"</p></div></div></div><hr class='mess-divider'></div>");
					var senderImage = $("#senders-pic").attr('src' ,'http://red.cssolutions.ph/red_app/profile_photo/'+senderID+".jpg"); 
				}
			}

			$(".media-clic").click(function(){
				var id = this.id;
				var tname = $(this).text();
				var name = jQuery.trim(tname).substring(0,10).split(" ").slice(0, -1).join(" ")+" ";
				var data = "id="+id+"&name="+name;
				window.location.replace("message.html?"+data);
				
			});
		}
		}
	});

	$(".ret-button").click(function(){
		window.location.replace("dashboard.html");
	});

	}

	messageInbox();
});