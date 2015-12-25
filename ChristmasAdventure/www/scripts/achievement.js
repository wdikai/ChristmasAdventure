(function(){
	
var achiv = [{
	name: "Hourse killer",
	path: "images/acievements/HourseKiller.png",
	id: "HK"
},{
	name: "Ghost killer",
	path: "images/acievements/GhostKiller.png",
	id: "GK"
},{
	name: "Most hourse killer",
	path: "images/acievements/MostHourseKiller.png",
	id: "MHK"
},{
	name: "Most ghost killer",
	path: "images/acievements/MostGhostKiller.png",
	id: "MGK"
}];

var myAchivs = [];

function loadAchivs(){
	var temp = localStorage.getItem("achi");
	myAchivs = JSON.parse(temp);
}

function saveAchivs(){
	var temp = JSON.stringify(myAchivs);
	localStorage.setItem("achi", temp);
}

function loadKillsData(mob){
	var	result = 0;
	var temp = localStorage.getItem("kills" + mob);
	if(temp){
		result = parseInt(temp);
	}

	return temp;
}

function saveKillsData(mob, temp){
	localStorage.setItem("kills" + mob, temp);
}

window.AchievSystem = {
	emit: function(id){
		if(myAchivs.indexOf(id) === -1){
			myAchivs.push(id);
		}
		saveAchivs();
	},
	getAchiev: function(){
		loadAchivs();
		console.log(myAchivs);
		var temp = [];
	    if (myAchivs.length) {
	        for (var i = 0; i < myAchivs.length; i++) {
	            for (var k = 0; k < achiv.length; k++) {
	                if (myAchivs[i] === achiv[k].id) {
	                    temp.push(achiv[k]);
	                }
	            }
	        }
	    }

	    return temp;
	},
	loadKillsData: loadKillsData,
	saveKillsData: saveKillsData,
};


})()