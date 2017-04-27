window.addEventListener("load",function(){
	(function() {
	    // requestAnimationFrame vs setInterval
	    //http://stackoverflow.com/questions/13935262/settimeout-or-setinterval-or-requestanimationframe
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;
	})();
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
    var width=600;
    var height=600;
	canvas.width=width;
	canvas.height=height;
	var player = {
	    id : 1,
		x : width/1.5,
		y : height/1.5,
		width : 10,
		height : 10,
		speed : 5,
		thrustX : 0,
        thrustY : 0,
        distanceX : .1,
        distanceY : 1,
		rot : 0,
        colour : "red",
        hb : 20,
        winner : false,
        drawBullet : false
	};
    var player2 = {
	    id : 2,
        x : width/3,
        y : height/3,
        width : 10,
        height : 10,
        speed : 5,
        thrustX : 0,
        thrustY : 0,
        distanceX : .1,
        distanceY : 1,
        rot : 0,
        colour : "blue",
        hb : 20,
        winner : false,
        drawBullet : false
    };
    var bullet = {
        width : 10,
        height : 10,
        x : 0,
        y : 0,
        thrustX : 1,
        thrustY : 1,
        angle : 0,
        colour : "white"
    };
    var bullet2 = {
        width : 10,
        height : 10,
        x : 0,
        y : 0,
        thrustX : 1,
        thrustY : 1,
        angle : 0,
        colour : "white"
    };
	var keys = [];
	var friction = .99;

    function drawShip(p){
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(30,10);
        ctx.lineTo(0,20);
        ctx.lineTo(5,10);
        ctx.lineTo(0,0);
        ctx.strokeWidth = 5;
        ctx.strokeStyle = "white";
        ctx.fillStyle= p.colour;
        ctx.stroke();
        ctx.fill();
    }

    function drawBullet(p, b){
        ctx.fillStyle= p.colour;
        ctx.fillRect(b.x, b.y, b.width, b.height);
    }

    function moveBullet(p, b){
        b.x += b.thrustX;
        b.y += b.thrustY;
    }

    function movement(p, b){
        if (p.id == 1) {
            if (keys[38]) {
                p.thrustX += p.distanceX * Math.cos(convertToRadians(p.rot));
                p.thrustY += p.distanceX * Math.sin(convertToRadians(p.rot));
                if (p.thrustX > p.speed) {
                    p.thrustX = p.speed;
                }
                if (p.thrustY > p.speed) {
                    p.thrustY = p.speed;
                }
            }
            if (keys[39]) {
                incrementAngle(p);
            }
            if (keys[37]) {
                decrementAngle(p);
            }
            if (keys[32]) {
                p.drawBullet = true;
                b.x = p.x;
                b.y = p.y;
                b.angle = convertToRadians(p.rot);
                b.thrustX = Math.cos(b.angle);
                b.thrustY = Math.sin(b.angle);
                b.thrustX *= 10;
                b.thrustY *= 10;
            }
        } else {
            if (keys[87]) {
                p.thrustX += p.distanceX * Math.cos(convertToRadians(p.rot));
                p.thrustY += p.distanceX * Math.sin(convertToRadians(p.rot));
                if (p.thrustX > p.speed) {
                    p.thrustX = p.speed;
                }
                if (p.thrustY > p.speed) {
                    p.thrustY = p.speed;
                }
            }
            if (keys[68]) {
                incrementAngle(p)
            }
            if (keys[65]) {
                decrementAngle(p)
            }
            if (keys[69]) {
                p.drawBullet = true;
                b.x = p.x;
                b.y = p.y;
                b.angle = convertToRadians(p.rot);
                b.thrustX = Math.cos(b.angle);
                b.thrustY = Math.sin(b.angle);
                b.thrustX *= 10;
                b.thrustY *= 10;
            }
        }
    }

    function outOfBorders(p){
        if(p.x > width){
            p.x = p.x - width
        }
        if(p.x< 0){
            p.x = width
        }
        if(p.y > height){
            p.y = p.y - height
        }
        if(p.y < 0){
            p.y = height
        }
    }

    function bulletCollision(p,p2,b){
        if (b.x - p.x < p.hb && b.x - p.x > -p.hb)
            if (b.y - p.y < p.hb && b.y - p.y > -p.hb)
                p2.winner = true;
    }

    function convertToRadians(degree) {
        return degree*(Math.PI/180);
    }

    function incrementAngle(p) {
        p.rot += 5;
        if(p.rot > 360){
            p.rot = 0;
        }
    }

    function decrementAngle(p){
        p.rot -= 5;
        if(p.rot < -360){
            p.rot = 0;
        }
    }

    function moveShip(p){
        p.x += p.thrustX * p.distanceY;
        p.y += p.thrustY * p.distanceY;
        p.thrustX *= friction;
        p.thrustY *= friction;
    }

    function background(){
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,width,height);
    }

	function update(){
        //draw background
        background();
        movement(player, bullet);
        movement(player2, bullet2);
        moveShip(player);
        moveShip(player2);
        outOfBorders(player);
        outOfBorders(player2);
        bulletCollision(player, player2, bullet2);
        bulletCollision(player2, player, bullet);
        if (player.winner || player2.winner){
            if (player.winner){
                ctx.font = "40px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("Red Wins!",width/3,height/2);
            } else {
                ctx.font = "40px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("Blue Wins!",width/3,height/2);
            }
        } else {
            //redraw player 1
            ctx.save();
            ctx.translate(player.x, player.y);
            ctx.rotate(convertToRadians(player.rot));
            ctx.translate(-7, -10);
            if (player.drawBullet) {

            }
            ctx.fillStyle = player.colour;
            drawShip(player);
            ctx.restore();
            //redraw player 2
            ctx.save();
            ctx.translate(player2.x, player2.y);
            ctx.rotate(convertToRadians(player2.rot));
            ctx.translate(-7, -10);
            ctx.fillStyle = player2.colour;
            drawShip(player2);
            ctx.restore();
            //bullets
            if (player.drawBullet) {
                drawBullet(player, bullet);
                moveBullet(player, bullet);
            }
            if (player2.drawBullet) {
                drawBullet(player2, bullet2);
                moveBullet(player2, bullet2);
            }
            requestAnimationFrame(update);
        }
	}

	document.body.addEventListener("keydown", function(e){
		e.preventDefault();
		keys[e.keyCode] = true;
	});

	document.body.addEventListener("keyup", function(e){
		e.preventDefault();
		keys[e.keyCode] = false;
	});

	update();
});