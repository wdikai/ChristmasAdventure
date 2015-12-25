
(function(){
	$(window).load(function(){
		$("#info-button").click(function information(){
			$("#pick-character").hide();
			$("#game-over").hide();
			$("#PauseGame").hide();
			$("#Menu").hide();
			$("#achivment-list").hide();
			$("#info").show();
		});

		$("#achivement-button").click(function(){
			$("#pick-character").hide();
			$("#PauseGame").hide();
			$("#Menu").hide();
			$("#info").hide();
			$("#achivment-list").show();
			var achivList = AchievSystem.getAchiev();
			if(achivList.length === 0){
				$(".achivment-list").hide();
				$(".empty-list").show();
			} else {
				$(".empty-list").hide();
				var container = $(".achivment-list").show();
				achivList.forEach(function(a){
					container.append($("<li><img class='achivment' src='" + a.path + "' height='200' width='200'</li>"));
				});				
			}
		});

		$("#game-button").click(function(){
			$("#Menu").hide();
			$("#game-over").hide();
			$("#PauseGame").hide();
			$("#Menu").hide();
			$("#achivment-list").hide();
			$("#info").hide();
			$("#pick-character").show();
		});

		$("#jack-button").click(function(){
        	$("#pick-character").hide();
			StartGame("jack");
		});
		$("#sand-button").click(function(){
        	$("#pick-character").hide();
			StartGame("sand");
		});
		$("#fairy-button").click(function(){
        	$("#pick-character").hide();
			StartGame("fairy");
		});

		$("#record").text(loadScore());
	});
})()