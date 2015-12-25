// Create the canvas
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width = document.documentElement.scrollWidth;
canvas.height = document.documentElement.scrollHeight;

var hourseCounter = 0;
var gostCounter = 0;
var backgroundFile = getBackground();
var mainSound = SoundManager.Sound("Main", "sounds/help.mp3", true);
var windSound = SoundManager.Sound("Wind", "sounds/wind.mp3", true);
var snowSound = SoundManager.Sound("Snow", "sounds/snow.mp3");
var horseSound = SoundManager.Sound("Horse", "sounds/horse.mp3");
var monsterSound = SoundManager.Sound("Monster", "sounds/monster.mp3");
var demonSound = SoundManager.Sound("Demon", "sounds/demon.mp3");
var loseSound = SoundManager.Sound("Lose", "sounds/lose.mp3");
SoundManager.addSound(mainSound);
SoundManager.addSound(windSound);
SoundManager.addSound(snowSound);
SoundManager.addSound(horseSound);
SoundManager.addSound(loseSound);
SoundManager.addSound(monsterSound);
SoundManager.addSound(demonSound);
SoundManager.play("Main");

function StartGame() {
    SoundManager.stop("Main");
    SoundManager.play("Wind");
    hourseCounter = AchievSystem.loadKillsData("Hourse");
    gostCounter = AchievSystem.loadKillsData("Ghost");

    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById('Menu').style.display = 'none';
    document.getElementById('PauseGame').style.display = 'none';
    document.getElementById('control-block').style.display = 'block';
    $("#canvas").show();
init();
}
function init() {
    play = true;
    light = true;
    background = new GameObject("Background", 1366, canvas.height, 0, 0, backgroundFile, 7);
    background.update = function () {
        if (background.x < -background.width)
		background.x = background2.x + background2.width;
		background.x -= background.speed;
	}
    background2 = new GameObject("Background", background.width, canvas.height, background.width, 0, backgroundFile, background.speed);
    background2.update = function () {
        if (background2.x < -background.width)
		background2.x = background.x + background.width;
		background2.x -= background2.speed;
	}

	lastTime = Date.now();
	player = new Player(100, 100, 100, canvas.height / 2, 'images/entities/Player.png', 3);
	GameEnd = false;
	GameObjects = [];
	pastTime = 0;
	Icetemp = 0;
	Horsetemp = 0;
    ghostTemp = 0;
    demonTemp = 0;
    Lifetemp = 0;
	TempCollision = 0;
    panel = new Panel();
	ctx.font = 'bold 50px courier';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ccc';
    resources.load(
        [
            backgroundFile,
            'images/entities/Player.png',
            'images/entities/Ice.png', 
            'images/entities/FrameHorse.png', 
            'images/entities/Balls.png', 
            'images/entities/Monster.png', 
            'images/entities/Demon.png',
            'images/ui/Life.png', 
            'images/Iceimg.png'
        ]);
	resources.onReady(main);
}

function getBackground() {
    var result;
    var number = rand(1, 3);
    if (number == 1) {
        result = 'images/backgrounds/Background.jpg';
    }
    if (number == 2) {
        result = 'images/backgrounds/Background1.jpg';
    }
    if (number == 3) {
        result = 'images/backgrounds/Background2.jpg';
    }
    return result;
}
var lastTime;
function main() {
    if (play == true && GameEnd == false) {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
        pastTime += dt;
	AdditionEntities(pastTime);
    update(dt);
    render(ctx);
    checkCollisions(pastTime);
    RemoveEntity();
    lastTime = now;
    }
    requestAnimFrame(main);
};
function render(ctx) {
    ctx.drawImage(resources.get(backgroundFile), background.x, background.y, background.width, background.height);
    ctx.drawImage(resources.get(backgroundFile), background2.x, background2.y, background2.width, background2.height);
    DrawLife();
    DrawCookies();
	DrawEntity(ctx);
    if (TempCollision > pastTime) {
        if (light) {
        player.sprite.render(ctx);
            light = !light;
    }
        else {
        light = !light;
    }
    }
    else {
        player.sprite.render(ctx);
    }


}
function update(dt) {
	background.update();
	background2.update();
	player.sprite.update(dt);
    for (i = 0; i < GameObjects.length; i++)
        if (GameObjects[i].type == "Monster") {
            GameObjects[i].update(dt, 'sin');
}
        else if (GameObjects[i].type == "Demon") {
            GameObjects[i].update(dt, 'cos');
        } else {
            GameObjects[i].update(dt);
        }

}

function rand(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}

document.getElementById("shot").addEventListener("touchstart", function (e) {
    if (pastTime > 1 && player.ice > 0 && GameEnd == false) {
        Ball = new GameObject("Ball", 20, 20, player.sprite.entity_pos[0] + player.width, player.sprite.entity_pos[1] + player.height / 2, 'images/entities/Balls.png', 10);
        Ball.collision = player.collision;
        GameObjects.push(Ball);
        player.ice--;
        SoundManager.play("Snow");
    }
});

document.onkeydown = function (e) {
    var keyCode;
    if (e) {
        keyCode = e.which;
    }
    else if (window.event) {
        keyCode = window.event.keyCode;
    }
    if (keyCode == 27 && pastTime > 1 && GameEnd == false) {
        PauseGame();
    }

}
function DrawEntity(ctx) {
    for (i = 0; i < GameObjects.length; i++)
		GameObjects[i].draw(ctx);
}

function AdditionEntities(pastTime) {
    if (pastTime > Icetemp) {
	    GameObjects.push(new GameObject("Ice", 48, 48, rand(canvas.width + 30, canvas.width + background.width), rand(50, canvas.height - 48), 'images/entities/Ice.png', rand(8, 15)));
        Icetemp = pastTime + 1;
	}
    if (parseInt(pastTime, 10) > ghostTemp) {
        for (i = 0; i < rand(1, 4) ; i++)
            GameObjects.push(new GameObject("Monster", 100, 100, rand(canvas.width + 30, 10000), rand(50, canvas.height - 200), 'images/entities/Monster.png', rand(15, 20)));
        ghostTemp = parseInt(pastTime, 10) + rand(15, 20);
	}

    if (parseInt(pastTime, 10) > Horsetemp) {
        for (i = 0; i < rand(1, 20) ; i++)
            GameObjects.push(new GameObject("Horse", 167, 100, rand(canvas.width + 30, 10000), rand(50, canvas.height - 56), 'images/entities/FrameHorse.png', rand(5, 10)));
        Horsetemp = parseInt(pastTime, 10) + rand(4, 8);
	}

    if (parseInt(pastTime, 10) > demonTemp) {
        for (i = 0; i < rand(1, 20) ; i++)
            GameObjects.push(new GameObject("Demon", 100, 100, rand(canvas.width + 30, 10000), rand(50, canvas.height - 56), 'images/entities/Demon.png', rand(10, 15)));
        demonTemp = parseInt(pastTime, 10) + rand(15, 20);
    }

    if (parseInt(pastTime, 10) > Lifetemp) {
        life = new GameObject("Life", 55, 55, rand(canvas.width + 30, canvas.width + background.width), rand(50, canvas.height - 56), 'images/ui/Life.png', 10);
        life.draw = function (ctx) {
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 0, 55, 55, this.sprite.entity_pos[0], this.sprite.entity_pos[1], 50, 50);
        }
        GameObjects.push(life);
        Lifetemp = parseInt(pastTime, 10) + rand(30, 50);
    }

}
function checkCollisions(pastTime) {
    if (TempCollision < parseInt(pastTime, 10)) {
        for (i = 0; i < GameObjects.length; i++) {
            if (player.collision(GameObjects[i]) && GameObjects[i].type != "Ice" && GameObjects[i].type != "Life" && GameObjects[i].type != "Ball") {
                if (play && !GameEnd) {
                    if (GameObjects[i].type === "Horse") {
                    SoundManager.play("Horse");
                }
                    if (GameObjects[i].type === "Monster") {
                        SoundManager.play("Monster");
                    }
                    if (GameObjects[i].type === "Demon") {
                        SoundManager.play("Demon");
                }
                }
                player.life--;
                TempCollision = parseInt(pastTime, 10) + 3;
                break;
            }
        }
    }
    for (i = 0; i < GameObjects.length; i++) {
        if (player.collision(GameObjects[i]) && GameObjects[i].type == "Ice") {
            player.ice++;
            GameObjects.splice(i, 1);
            break;
        }
        if (player.collision(GameObjects[i]) && GameObjects[i].type == "Life") {
            if (player.AdditionLife())
                GameObjects.splice(i, 1);
            break;
        }
        if (GameObjects[i].type == "Ball") {
            for (j = 0; j < GameObjects.length; j++) {
                if (GameObjects[i].collision(GameObjects[j]) && GameObjects[j].type != "Ball" && GameObjects[j].type != "Ice") {
                    switch(GameObjects[j].type){
                        case "Horse":
                            hourseCounter++;
                            break;
                        case "Monster":
                            gostCounter++;
                            break
                    }

                    GameObjects.splice(i, 1);
                    GameObjects.splice(j, 1);
                    break;
                }
            }
        }

    }
}
function collision(objA, objB) {
    if (objA.x + objA.width > objB.x &&
        objA.x < objB.x + objB.width &&
        objA.y + objA.height > objB.y &&
        objA.y < objB.y + objB.height) {
        return true;
    }
    else {
        return false;
    }
}
function RemoveEntity() {

    for (i = 0; i < GameObjects.length; i++) {
        if (GameObjects[i].sprite.entity_pos[0] < -200)
            GameObjects.splice(i, 1);
    }
}
function DrawCookies() {
    ctx.drawImage(resources.get('images/Iceimg.png'), 0, 0, 47, 51, canvas.width / 1.1 - 78, 0, 47, 51);
    ctx.fillText('X' + player.ice, canvas.width / 1.1, 0);
    ctx.fillText('Scores:' + (pastTime * 5.5).toFixed(), canvas.width / 2, 0);

}
function DrawLife() {
    switch (player.life) {
        case 1:
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 57, 55, 55, 85, 0, 50, 50);
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 57, 55, 55, 40, 0, 45, 45);
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 0, 55, 55, 0, 0, 40, 40);
            break;
        case 2:
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 57, 55, 55, 85, 0, 50, 50);
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 0, 55, 55, 40, 0, 45, 45);
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 0, 55, 55, 0, 0, 40, 40);
            break;
        case 3:
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 0, 55, 55, 85, 0, 50, 50);
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 0, 55, 55, 40, 0, 45, 45);
            ctx.drawImage(resources.get('images/ui/Life.png'), 0, 0, 55, 55, 0, 0, 40, 40);
            break;
        default:
            GameOver();
            break;
    }
}
function GameOver() {
    $("canvas").hide();
    document.getElementById('game-over').style.display = 'block';
    play = false;
    GameEnd = true;
    document.getElementById('control-block').style.display = 'none';
    document.getElementById('PauseGame').style.display = 'none';
    SoundManager.stop("Wind");
    SoundManager.play("Lose");
    var TimeScore = document.getElementById('time-score');
    var score = (pastTime * 5.5).toFixed();
    TimeScore.innerHTML = '<h1>Результат: ' + score + '</h1>';
    var lastScore = parseInt(loadScore());
    if (lastScore < score) {
        saveScore(score);
    }

    AchievSystem.saveKillsData("Hourse", hourseCounter);
    AchievSystem.saveKillsData("Ghost", gostCounter);

    if(hourseCounter > 100){
        AchievSystem.emit("HK");
        if(hourseCounter > 200){
            AchievSystem.emit("MHK");
        }
    }

    if(gostCounter > 100){
        AchievSystem.emit("GK");
        if(gostCounter > 200){
            AchievSystem.emit("MGK");
        }
    }

    window.plugin.notification.local.add({
        id: '0001',
        at: new Date,
        text: 'hello',
        title: 'title',
        badge: 1,
        autoCancel: true,
        ongoing: true
    });

    $("#record").text(loadScore());
    document.getElementById('play-again').addEventListener('click', function () {
            reset();
        });
    }

function reset() {
        document.getElementById('game-over').style.display = 'none';
        StartGame();
    }
function MainMenu() {
        $("#pick-character").hide();
        $('#game-over').hide();
        $('#PauseGame').hide();
        $('#info').hide();
        $('#achivment-list').hide();
        $('#Menu').show();
        play = false;
        SoundManager.play("Main");
    }

function PauseGame() {
    play = !play;
    if (!play) {
        document.getElementById('PauseGame').style.display = 'block';
    }
    else {
        document.getElementById('PauseGame').style.display = 'none';
    }
}

document.getElementById("swipe").addEventListener("touchmove", function (event) {
    if (play) {
        var touches = event.changedTouches;

        if (touches[0].pageY < canvas.height - player.height / 3 && touches[0].pageY > 50) {
            player.sprite.entity_pos[1] = touches[0].pageY - player.height / 2;
    }
}
    }
);
