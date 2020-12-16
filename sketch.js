PLAY = 1;
END = 0;
gameState = PLAY;
var monkey , monkey_running ;
var ground , groundImage ;
var banana ,bananaImage, obstacle, obstacleImage ;
var FoodGroup, obstacleGroup ;
var score ;

function preload(){
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","   sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(400,400);
   monkey = createSprite(80,315,20,20);
   monkey.addAnimation("moving",monkey_running);
   monkey.scale = 0.1;
  
   ground = createSprite(400,350,900,10);
   ground.velocityX = -4;
   ground.x = ground.width/2;
   console.log(ground.x);
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
}


function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    survivalTime();
    
    if(keyDown("space") && monkey.y >= 180){
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  if(gameState===END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
     
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    stroke("black");
    textSize(30);
    fill("black");
    text("GAME OVER",120,200);
    
  }
   monkey.collide(ground);
  food();
  obstacles();
  drawSprites();
}

function food(){
 if (frameCount % 80 === 0){
   banana = createSprite(600,165,10,40);
   banana.y = Math.round(random(120,200));
   banana.addImage(bananaImage);
   banana.velocityX = -6;
   
   banana.scale = 0.1;
   banana.lifetime = 200;
   
   FoodGroup.add(banana);
 }
}

function obstacles(){
  if (frameCount % 200 === 0){
    obstacle = createSprite(400,327,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -9;
    obstacle.lifetime = 50;
    
    obstacleGroup.add(obstacle);
  }
}

function survivalTime(){
  var survivalTime = 0;
  stroke("white");
  textSize(20);
  fill("white")
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50);
}