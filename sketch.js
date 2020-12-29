var monkey,monkeyrunning;
var banana,bananaImg,bananaGroup;
var obstacle,obstacleImg;
var foodGroup,obstacleGroup;
var score = 0;
var ground;
var gameState = "play"

function preload(){  
monkeyrunninng = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png"); 
bananaImg = loadImage("banana.png");
obstacleImg = loadImage("obstacle.png"); 
}
function setup() { 
  createCanvas(500,400);
  ground = createSprite(250,395,500,10);
  ground.visible = false;
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("hi",monkeyrunninng);
  monkey.scale = 0.1;    
  bananaGroup = new Group();
  obstacleGroup = new Group();
}
function draw() {  
  background ("white");
  if (gameState === "play"){
    if (keyDown("space")){
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.5;  
    spawnBanana();
    spawnObstacle();
    monkey.collide(ground);
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score + 1;
    }
    if (obstacleGroup.isTouching(monkey)){
      monkey.destroy();
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
      gameState = "end";
    }
    text("Score="+score,430,10);
  }
  drawSprites();
  if(gameState === "end"){
    textSize(50);
    text("GAME OVER",110,200);
    textSize(20);
    text("Score="+score,230,250);
  }
}
function spawnBanana(){
  if (frameCount%150 === 0){
    banana = createSprite(350,20,10,10);
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -2;
    banana.y = Math.round(random(120,200));
    banana.lifetime = 300;
    bananaGroup.add(banana);
  }
}
function spawnObstacle(){
  if (frameCount%110 === 0){
    obstacle = createSprite(350,380,20,20);
    obstacle.addImage(obstacleImg);
    obstacle.scale =0.1;
    obstacle.velocityX = -2;
    obstacleGroup.add(obstacle);
  }
}