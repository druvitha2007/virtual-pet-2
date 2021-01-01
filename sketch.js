var database ,dog,dog1,dog2
var position

var feed,add
var foodobject
var fedTime, lastFed;

function preload(){
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png")
}

function setup() {
	
  database = firebase.database();
  console.log(database);

  createCanvas(900,500);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
  
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("FEED LUCY")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

  input = createInput("Name of your dog");
  input.position(600,200)
  button = createButton('Play');
  button.position(650,240)
  greeting = createElement('h2');
  button.mousePressed(()=>{
    input.hide()
    button .hide()
    name = input.value();
    greeting.html("Hello I am your pet dog "+name+"🐶")
   greeting .position(400,50)
    
  })
    
}

function draw(){
 background(46,139,87);

 foodobject.display()

  drawSprites();
  fill (0)
  textSize(30)

  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  })
 
  //if(lastFed>=12)
  //{
    //text("Last Feed : "+ lastFed%12 + " PM",50,30);
  //}
  //else if(lastFed===0)
  //{
    //text("Last Feed : 12 AM",50,30)
  //}
  //else
  //{
    //text("Last Feed : "+ lastFed + " AM",50,30);
  //}

  //if(Name!==undefined)
  //{
  //text("Your Pet Name: "+ Name,600,32);
  //}
 
}

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);
  
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}

function AddFood(){
  position++
  database.ref('/').update({
  Food:position
})
}

function FeedDog(){
    dog.addImage(dogimg2)
    foodobject.updateFoodStock(foodobject.getFoodStock()-1)
    database.ref('/').update({
    Food:foodobject.getFoodStock(),
    FeedTime:hour ()
 })
}
