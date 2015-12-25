
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
		});


		$("#game-button").click(StartGame);
	});
})()