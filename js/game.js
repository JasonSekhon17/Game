window.addEventListener("load",function(){
	
	(function() {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;
	})();

	var canvas = document.getElementById("mycanvas")
	var ctx = canvas.getContext("2d")
    var width=600
    var height=500
	canvas.width=width
	canvas.height=height
	var player = {
		x : width/2,
		y : height/2,
		width : 10,
		height : 10,
		speed : 10,
		thrustX : 0,
        thrustY : 0,
        distanceX : .1,
        distanceY : 1,
		rot : 0
	}
	var keys = []
	var friction = .99

    function drawShip(){
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.moveTo(-2,2)
        ctx.lineTo(2,10)
        ctx.lineTo(-2,18)
        ctx.lineTo(-25,10)
        ctx.lineTo(-2,2)
        ctx.strokeStyle = "red"
        ctx.stroke()
        ctx.fill()
    }

    function moveShip(){
        if (keys[38]){
            player.thrustX += player.distanceX * Math.cos(convertToRadians(player.rot));
            player.thrustY += player.distanceY * Math.sin(convertToRadians(player.rot));
            if(player.thrustX > player.speed){
                player.thrustX = player.speed;
            }
            if(player.thrustY > player.speed){
                player.thrustY = player.speed;
            }
        }
        if (keys[39]){
            incrementAngle()
        }
        if (keys[37]){
            decrementAngle()
        }
        if (keys[32]){

        }
    }

    function outOfBorders(){
        if(player.x > width){
            player.x = player.x - width
        }
        if(player.x< 0){
            player.x = width
        }
        if(player.y > height){
            player.y = player.y - height
        }
        if(player.y < 0){
            player.y = height
        }
    }

    function convertToRadians(degree) {
        return degree*(Math.PI/180)
    }

    function incrementAngle() {
        player.rot += 5
        if(player.rot > 360){
            player.rot = 0
        }
    }

    function decrementAngle(){
        player.rot -= 5
        if(player.rot > 360){
            player.rot = 0
        }
    }

	function update(){
        moveShip()
        player.x += player.thrustX * player.distanceY
        player.y += player.thrustY * player.distanceY
        player.thrustX *= friction
        player.thrustY *= friction
        outOfBorders()
		/*player.thrust *= friction
		player.x += player.thrust
		if (player.x >= canvas.width-player.width){
			player.x = canvas.width-player.width
		} else if(player.x <= 0){
			player.x = 0
		}
		if(player.y >= canvas.height-player.height){
			player.y = canvas.height - player.height;
		} else if(player.y <= 0){
			player.y = 0
		}
		ctx.clearRect(0,0,canvas.width, canvas.height);
		ctx.fillStyle = "red"
		ctx.fillRect(player.x, player.y, player.width, player.height)
		*/
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawShip()
		requestAnimationFrame(update)
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