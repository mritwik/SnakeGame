
function init(){
	var canvas = document.getElementById("mycanvas");
	W = canvas.width = 1000;
	H = canvas.height =600;
	pen = canvas.getContext('2d');
	cs=66; 
	game_over = false;
	score=0;
	bonus = false;
	//json obj
	food_img = new Image();
	food_img.src = "Assets/apple.png";
	trophy = new Image();
	trophy.src = "Assets/trophy.png";
	food = getRandomFood();
	if(score%5==0 && score!=0)
	{
		bonus_food = getRandomFood();
	}
	else
	{
		bonus_food = {
			x: -1000,
			y: -1000,
			color:"red",
		}
	}

	snake={
		init_len : 5,
		color: "blue",
		cells: [],
		direction:"right",

		createSnake:function()
		{
			for (var i = this.init_len; i > 0; i--) {
				this.cells.push({x:i, y:0});
			}
		},
		drawSnake:function()
		{
			//console.log("In drawSnake")
			for (var i = 0; i < this.cells.length; i++) {
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-3, cs-3	);
			}
		},
		updateSnake:function(){
			//console.log("In updateSnake");
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			if(score%3==0 && score!=0 && bonus==false)
			{
				bonus_food=getRandomFood();
				bonus=true;

			}
			else
			{
				if(bonus==true){}
					//do nothing
				
				else
				{
					bonus=false;
				
				bonus_food={
					x:-1000,
					y:-1000,
					color:"red",
					}
				}
			}
			if(headX==food.x && headY==food.y)
			{
				score++;
				food = getRandomFood();

			}
			else if(headX==bonus_food.x && headY==bonus_food.y)
			{
				console.log("bonus_food");
				score = score+5;
				bonus=false;


			}
			else
			{
				this.cells.pop();
			}
			

			var nextX, nextY;

			if(this.direction ==="right")
			{
				nextX = headX+1;
				nextY = headY;
			}
			else if(this.direction ==="left")
			{
				nextX = headX-1;
				nextY = headY;
			}
			else if(this.direction ==="down")
			{
				nextX = headX;
				nextY = headY+1;
			}
			else if(this.direction ==="up")
			{
				nextX = headX;
				nextY = headY-1;
			}
			this.cells.unshift({x:nextX, y:nextY});
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x <0 || this.cells[0].x > last_x || this.cells[0].y>last_y)
			{
				game_over = true;
				var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3'); 
            	audio.play();
			}
			hx = this.cells[0].x;
			hy = this.cells[0].y;
			for (var i = this.cells.length-1; i >0; i--) {
				
				if(hx == this.cells[i].x && hy==this.cells[i].y)
				{
					game_over = true;
					var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3'); 
            		audio.play();
				}
			}
		}
	};
	snake.createSnake();
	function keyPressed(e)
	{
		if(e.key === "ArrowRight" && (snake.direction=="up" || snake.direction=="down"))
			snake.direction = "right";
		else if(e.key ==="ArrowLeft" && (snake.direction=="up" || snake.direction=="down"))
			snake.direction = "left";
		else if(e.key === "ArrowDown" && (snake.direction=="left" || snake.direction=="right"))
			snake.direction = "down";
		else if(e.key==="ArrowUp" && (snake.direction=="left" || snake.direction=="right"))
			snake.direction = "up";
		console.log(snake.direction);
	}
	document.addEventListener('keydown', keyPressed);

document.addEventListener('swiped-left', function(e) {
	if(snake.direction=="up" || snake.direction=="down")
					snake.direction = "left";

  // ...
});

// swiped-right
document.addEventListener('swiped-right', function(e) {
	if(snake.direction=="up" || snake.direction=="down")
				snake.direction = "right";

  // ...
});

// swiped-up
document.addEventListener('swiped-up', function(e) {
	if(snake.direction=="left" || snake.direction=="right")
				snake.direction = "up";

  // ...
});

// swiped-down
document.addEventListener('swiped-down', function(e) {
	if(snake.direction=="left" || snake.direction=="down")
				snake.direction = "down";

  // ...
});

}
function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs, food.y*cs, cs, cs);
	pen.drawImage(food_img, bonus_food.x*cs, bonus_food.y*cs, 100,100);
	pen.drawImage(trophy, 25,15,cs,cs);
	pen.fillStyle="blue";
	pen.font="40px Roboto ";
	pen.fillText(score, 50, 50);

}
function update(){
	snake.updateSnake();

}

function getRandomFood()
{
	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);
	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;


}






function gameloop(){
	if(game_over==true)
	{
		clearInterval(f);
		alert("Game Over !\n Your Score is "+score);
		return;
	}
	//console.log("foodx: ",food.x,"foody: ",food.y);
	//console.log("snakex: ",snake.cells[0].x,"snakey: ",snake.cells[0].y);
	
	draw();
	update();  
}


init();
var f = setInterval(gameloop, 150);