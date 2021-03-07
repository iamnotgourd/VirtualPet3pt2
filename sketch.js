//Create variables here
var dog,happyDog,database,foodS,feedButton,addButton,foodStock,snacks,fedTime,lastFed,foodObj,currHour,changeState,readState,bedroom,garden,washroom,currTime;
function preload()
{
  dogImage = loadImage("images/dogImg.png")
  dogImageHappy = loadImage("images/dogImg1.png")
  washroom = loadImage("images/Wash Room.png")
  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
}

function setup() {
  createCanvas(1000, 1000);
 
  foodObj = new Food()
  
  database = firebase.database();
  dog = createSprite(500,500,50,50)
  dog.addImage(dogImage)
  console.log("bla")
 snacks = database.ref('food')
 snacks.on("value",function(data){ 
 foodS = data.val();console.log(foodS)})

 lastFedTime = database.ref("feedTime")
 lastFedTime.on("value",function(data){lastFed = data.val()})
 console.log(lastFed)

 readState = database.ref("gameState")
 readState.on("value",function(data){gameState = data.val()})

  feedButton = createButton('Feed')
 feedButton.position(700,95)
 feedButton.mousePressed(feedDog)
  addButton = createButton('Add Food')
 addButton.position(800,95)
 addButton.mousePressed(addFood)
}


function draw() {  
  background(46,139,87)
  
/*if(keyWentDown(UP_ARROW)){
  dog.addImage(dogImageHappy)
  if(foodS){
  console.log(foodS)
  update(foodS)
}
}*/

 currTime = hour()
 if(currTime == (lastFed)){
   updateState("Full")
 }
else if(currTime == (lastFed+1) ){
  updateState("Playing")
  background(garden,550,500)
}else if(currTime>(lastFed+2)&&currTime <=(lastFed+4)){
  updateState("Bathing")
  background(washroom,550,100)
}else{
  updateState("Hungry")
  foodObj.display()
}

if(gameState!="Hungry"){
  feedButton.hide()
  addButton.hide()
}else{
  feedButton.show()
  addButton.show()
}

if(foodS){
  if(lastFed>=12){
    text("Last Fed : " +lastFed%12 +"P.M.",350,30)
  }else if(lastFed === 0){
    text("Last Fed : 12 A.M.",350,30)
  }else{
    text("Last Fed : " + lastFed + "A.M.",350,30)
  }
}
}

function update(x,hour){
  if(x<=0){
      x = 0
  }else{
      x = x-1
  }
  database.ref('/').update({food:x,feedTime:hour})
}
function feedDog(){
  dog.addImage(dogImageHappy)
  currHour = new Date().getHours()
  console.log(currHour+ ' ' + foodS)
  update(foodS,currHour)
}
function addFood(x){
 foodS++
database.ref('/').update({food:foodS})
}
function updateState(state){
  database.ref('/').update({gameState:state})
}