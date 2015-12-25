function loadScore(){
	var result = 0;
	var score = localStorage.getItem("score");
	if(score){
		result = score;
	}

	return result;
}

function saveScore(score){
	localStorage.setItem("score", score);
}