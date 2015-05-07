#pragma strict

var size : int = 10; //the size in all dimentions of the maze
var nextSegment = [];
var mazeArray : MazeSegment[,,];
public var barrier : Transform;
public var path : Transform;
public var wall : Transform;
public var end : Transform;
var ball : Transform;
var ballLight : Transform;
var cameraLight : Transform;

class MazeSegment {
	var GenerateMaze:GenerateMaze;
	var type = "none";
	var X : int;
	var Y : int;
	var Z : int;
	var rotation : int;
	var isUsed : int;
	var segmentFrom = [];
	var isStart :int;

	public function MazeSegment (aType,X:int,Y:int,Z:int,R:int) {
		type = aType;
		X = X*3;
		Y = Y*5;
		Z = Z*3;
		rotation = R;
		isUsed = 0; //0 = unused, 1 = needs to be used, 2 = is used/can't be used
		segmentFrom = [];
		isStart = 0; //0 = no, 1 = start, 2 = end
	}
	public function CangeFrom(newFrom){
		var currentLength = this.segmentFrom.Length;
		this.segmentFrom[currentLength] = newFrom; 
	}
	public function CreateMe(){
		if(this.isUsed != 2){
			GenerateMaze.Create(this.type,this.X,this.Y,this.Z,this.rotation);
			this.isUsed = 2;
		}
	}
}

function GenerateMaze (size:int){
	var mazeArray = GenerateArray(size);
	var randomX = Random.Range(0,size);
	var randomY = Random.Range(0,size);
	var randomZ = Random.Range(0,size);
	FindEnd(randomX,randomY,randomZ);
}

function GenerateArray (size:int) {
	Debug.Log("array started");
	mazeArray = new MazeSegment[size,size,size];
	for(var h = 0; h < size; h++){
		for (var k = 0; k < size; k++) {
			for (var l = 0; l < size; l++) {
				mazeArray[h,k,l] = new MazeSegment("none",h,k,l,0);
			}
		}
	}
	Debug.Log("array generated");
	return mazeArray;
}

function FindEnd(aX:int,aY:int,aZ:int){
	Debug.Log("Start findEnd");
	mazeArray[aX,aY,aZ].isStart = 2;
	var aR = Random.Range(0,2);
	mazeArray[aX,aY,aZ].rotation = aR;
	mazeArray[aX,aY,aZ].type = "Straight";
	mazeArray[aX,aY,aZ].CreateMe();
	for(var x=0;x>aY;x++){
		mazeArray[aX,x,aZ].isUsed = 2;
	}
	if(aR == 0){
		nextSegment[nextSegment.Length] = mazeArray[aX+1,aY,aZ];
		nextSegment[nextSegment.Length] = mazeArray[aX-1,aY,aZ];
	}
	else if (aR == 1){
		nextSegment[nextSegment.Length] = mazeArray[aX,aY,aZ+1];
		nextSegment[nextSegment.Length] = mazeArray[aX,aY,aZ-1];
	}
	Debug.Log(nextSegment.Length);
}

public function Create(type,xIn,yIn,zIn,rotation){
			var x : int = xIn;
			var y : int = yIn;
			var z : int = zIn;
			//create corner barriers => exist in all types
			Instantiate(barrier,new Vector3(x+1,y+3,z+1),barrier.rotation);
			Instantiate(barrier,new Vector3(x+1,y+3,z-1),barrier.rotation);
			Instantiate(barrier,new Vector3(x-1,y+3,z+1),barrier.rotation);
			Instantiate(barrier,new Vector3(x-1,y+3,z-1),barrier.rotation);
	
	switch(type){
		case "Straight":
			//straight along X-axis
			if(rotation == 0){
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
			}
			//straight along Z-axis
			else if(rotation == 1){
				Instantiate(barrier,new Vector3(x+1,y+3,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y+3,z),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
			}
			else{
				Debug.Log("Invalid rotation for straight");
			}
			break;
		case "Turn":
			if(rotation == 0){
			//-Z to +X 
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y+3,z),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
			}
			else if(rotation == 1){
			//+X to +Z
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y+3,z),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
			}
			else if(rotation == 2){
			//+Z to -X
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y+3,z),barrier.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
			}
			else if(rotation == 3){
			//-X to -Z
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y+3,z),barrier.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
			}
			else{
				Debug.Log("Invalid rotation for turn");
			}
			break;
		case "3Way":
			if (rotation == 0){
			//-Z to X axis
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
			}
			else if(rotation == 1){
			//+X to Z axis
				Instantiate(barrier,new Vector3(x-1,y+3,z),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
			}
			else if(rotation == 2){
			//+Z to X axis
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
			}
			else if(rotation == 3){
			//-X to Z axis
				Instantiate(barrier,new Vector3(x+1,y+3,z),barrier.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
			}
			else{
				Debug.Log("Invalid rotation for 3-Way Intersection");
			}
			break;
		case "4Way":
			Instantiate(path,new Vector3(x+1,y,z),path.rotation);
			Instantiate(path,new Vector3(x-1,y,z),path.rotation);
			Instantiate(path,new Vector3(x,y,z+1),path.rotation);
			Instantiate(path,new Vector3(x,y,z-1),path.rotation);
			Instantiate(path,new Vector3(x,y,z),path.rotation);
			break;
		case "Gap":
			if(rotation == 0){
			//along the X axis
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
			}
			else if (rotation == 1){
			//along the Z axis
				Instantiate(barrier,new Vector3(x-1,y+3,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y+3,z),barrier.rotation);
			}
			else{
				Debug.Log("Invalid rotation for Gap");
			}
			break;
		case "Wall":
			if (rotation == 0){
			//From -Z
				Instantiate(barrier,new Vector3(x-1,y+3,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y+3,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
				Instantiate(wall,new Vector3(x,y+2.5,z),wall.rotation);
			}
			else if (rotation == 1){
			//From +X
				Instantiate(barrier,new Vector3(x-1,y+3,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(wall,new Vector3(x,y+2.5,z),wall.rotation);
			}
			else if (rotation == 2){
			//From -X
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y+3,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(wall,new Vector3(x,y+2.5,z),wall.rotation);
			}
			else if (rotation == 3){
			//From +Z
				Instantiate(barrier,new Vector3(x-1,y+3,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y+3,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(wall,new Vector3(x,y+2.5,z),wall.rotation);
			}
			else{
				Debug.Log("Invalid rotation for Wall");
			}
			break;	
		case "End":
			if(rotation == 0){
			//on X axis
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
			} 	
			else if(rotation == 1){
			// on Z axis
				Instantiate(barrier,new Vector3(x,y+3,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+3,z-1),barrier.rotation);
				Instantiate(end,new Vector3(x+1,y,z),end.rotation);
				Instantiate(end,new Vector3(x,y,z),end.rotation);
				Instantiate(end,new Vector3(x-1,y,z),end.rotation);
			}	
		break;
	}
}

function SetUp(startX,startY,startZ){ 
	cameraLight.position = Vector3(startX,startY,startZ);
	ball.position = Vector3(startX,startY,startZ);
	ballLight.position = Vector3(startX,startY,startZ);
	CreateMaze();
}
function CreateMaze(){
	//instantiates everytning
}
function Tutorial(startX,startY,startZ){
	SetUp(startX,startY,startZ);
	Create("Straight",0,0,0,1);
	Create("3Way",0,0,-3,2);
	Create("Wall",3,0,-3,2);
	Create("Straight",0,5,-3,1);
	Create("Gap",0,5,0,1);
	Create("Wall",0,0,3,0);
	Create("Wall",0,5,3,0);
	Create("Turn",-3,0,3,2);
}

function Start(){
	GenerateMaze(size);
	//SetUp();
}