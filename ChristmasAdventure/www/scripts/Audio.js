(function(){

	var sounds = [];

	var remove = function(name){
		for(var i=0; i<sounds.length; i++){
			if(sounds[i].name === name){
				sounds.splice(i, 1);
			}
		}
	}

	function Sound(name, url, loop){
		var self = this;
		this.name = name;
		this.audio = new Audio(url);
		this.audio.loop = (loop || false);
	}
	Sound.prototype.play = function() {
	    this.audio.currentTime = 0;
		this.audio.play();
	};
	Sound.prototype.stop = function() {
		this.audio.pause();
	    this.audio.currentTime = 0;
	};


	window.SoundManager = {};

	window.SoundManager.Sound = function(name, url, loop){
		return new Sound(name, url, loop);
	};

	window.SoundManager.addSound = function(sound){
		sounds.push(sound);
	};

	window.SoundManager.play = function(name){
		for(var i=0; i<sounds.length; i++){
			if(sounds[i].name === name){
				sounds[i].play();
				return;
			}
		}
	};

	window.SoundManager.stop = function(name){
		for(var i=0; i<sounds.length; i++){
			if(sounds[i].name === name){
				sounds[i].stop();
				return;
			}
		}
	};

	window.SoundManager.clear = function(name){
		sounds = [];
	};
	
})()