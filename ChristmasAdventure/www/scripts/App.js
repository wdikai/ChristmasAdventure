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

function StartGame() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById('Menu').style.display = 'none';
    document.getElementById('PauseGame').style.display = 'none';
    document.getElementById('shot').style.display = 'block';
    document.getElementById('swipe').style.display = 'block';
    document.getElementById('control-block').style.display = 'block';
    $("#canvas").show();
init();
}
function init() {
    play = true;
    light = true;
    background = new GameObject("Background", 1366, canvas.height, 0, 0, 'images/backgrounds/Background.jpg', 7);
    background.update = function () {
        if (background.x < -background.width)
		background.x = background2.x + background2.width;
		background.x -= background.speed;
	}
    background2 = new GameObject("Background", background.width, canvas.height, background.width, 0, 'images/backgrounds/Background.jpg', background.speed);
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
	Sputniktemp = 0;
    Lifetemp = 0;
	TempCollision = 0;
    panel = new Panel();
	ctx.font = 'bold 50px courier';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ccc';
    resources.load(
        [
            'images/backgrounds/Background.jpg',
         'images/entities/Player.png',
         'images/entities/Ice.png', 
         'images/entities/FrameHorse.png', 
         'images/entities/Balls.png', 
         'images/entities/Monster.png', 
         'images/ui/Life.png', 
            'images/Iceimg.png'
        ]);
	resources.onReady(main);
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
    ctx.drawImage(resources.get('images/backgrounds/Background.jpg'), background.x, background.y, background.width, background.height);
    ctx.drawImage(resources.get('images/backgrounds/Background.jpg'), background2.x, background2.y, background2.width, background2.height);
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
	    if (GameObjects[i].type != "Monster")
	GameObjects[i].update(dt);
    else
            GameObjects[i].update(dt, 'sin');
}

function rand(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}

document.getElementById("shot").addEventListener("tapped", function (e) {
    if (pastTime > 1 && player.ice > 0 && GameEnd == false) {
        Ball = new GameObject("Ball", 20, 20, player.sprite.entity_pos[0] + player.width, player.sprite.entity_pos[1] + player.height, 'images/entities/Balls.png', 10);
        Ball.collision = player.collision;
        GameObjects.push(Ball);
        player.ice--;
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
    if (parseInt(pastTime, 10) > Sputniktemp) {
        for (i = 0; i < rand(1, 4) ; i++)
            GameObjects.push(new GameObject("Monster", 100, 100, rand(canvas.width + 30, 10000), rand(50, canvas.height - 200), 'images/entities/Monster.png', rand(10, 20)));
        Sputniktemp = parseInt(pastTime, 10) + rand(4, 8);
	}
    if (parseInt(pastTime, 10) > Horsetemp) {
        for (i = 0; i < rand(1, 20) ; i++)
            GameObjects.push(new GameObject("Horse", 167, 100, rand(canvas.width + 30, 10000), rand(50, canvas.height - 56), 'images/entities/FrameHorse.png', rand(10, 20)));
        Horsetemp = parseInt(pastTime, 10) + rand(4, 8);
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
       
        document.getElementById('PauseGame').style.display = 'none';
        var TimeScore = document.getElementById('time-score');
        TimeScore.innerHTML = '<h1>Scores: ' + (pastTime * 5.5).toFixed() + '</h1>';
    document.getElementById('play-again').addEventListener('click', function () {
            reset();
        });
    }

function reset() {
        document.getElementById('game-over').style.display = 'none';
        StartGame();
    }
function MainMenu() {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('PauseGame').style.display = 'none';
        document.getElementById('info').style.display = 'none';
        //canvas.style.display = 'none';
        document.getElementById('Menu').style.display = 'block';
        play = false;
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
