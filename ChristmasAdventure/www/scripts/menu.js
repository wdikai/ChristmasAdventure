
(function(){
	$(window).load(function(){
		$("#info-button").click(function information(){
			$("#game-over").hide();
			$("#PauseGame").hide();
			$("#Menu").hide();
			$("#achivment-list").hide();
			$("#info").show();
		});

		$("#achivement-button").click(function(){
			$("#game-over").hide();
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

		$("#game-button").click(StartGame);

		$("#record").text(loadScore());
	});
})()