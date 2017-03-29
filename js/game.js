window.addEventListener("load",function(){
	
	(function() {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;
	})();

	var canvas = document.getElementById("mycanvas")
	ctx = canvas.getContext("2d")
	canvas.width=384
	canvas.height=216
	player = {
		x : canvas.width/2,
		y : canvas.height/2,
		width : 10,
		height : 10,
		speed : 1,
		thrust : 0,
		rot: 0
	}
	bullet = {
		x : canvas.width/2,
		y : canvas.height-5,
		width : 10,
		height : 10,
		speed : 6,
		velX : 0,
		velY : 0,
	}
	keys = []
	friction = .99
	gravity = 0.2

	function update(){
		if (keys[38]){
			if (player.thrust < player.speed){
				player.thrust++
			}
		}
		if (keys[39]){
			rot++
		}
		if (keys[37]){
			rot--
		}
		if (keys[32]){
			
		}
		player.thrust *= friction
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
		/*ctx.clearRect(0,0,canvas.width, canvas.height);
		ctx.fillStyle = "red"
		ctx.fillRect(player.x, player.y, player.width, player.height)
		*/
		ctx.beginPath()
		ctx.moveTo(10, 10)
		ctx.lineTo(10, 20)
		ctx.lineTo(20, 20)
		ctx.closePath
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