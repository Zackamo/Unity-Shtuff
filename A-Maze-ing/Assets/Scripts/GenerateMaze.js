#pragma strict

//a place to remember
//http://wiki.unity3d.com/index.php/Choosing_the_right_collection_type

var size : int = 10; //the size in all dimentions of the maze
var nextSegment = new ArrayList();
var mazeArray : MazeSegment[,,] = new MazeSegment[size,size,size];
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
	var previousSegments:int;
	var isStart :int;

	public function MazeSegment (aType,X:int,Y:int,Z:int,R:int) {
		type = aType;
		X = X*3;
		Y = Y*5;
		Z = Z*3;
		rotation = R;
		isUsed = 0; //0 = unused, 1 = needs to be used, 2 = is used/can't be used
		previousSegments = 0;
		isStart = 0; //0 = no, 1 = start, 2 = end
	}
}

function GenerateMaze (size:int){
	var mazeArray = GenerateArray(size);
	var randomX = Random.Range(1,size-1);
	var randomY = Random.Range(1,size-1);
	var randomZ = Random.Range(1,size-1);
	FindEnd(randomX,randomY,randomZ);
}

function GenerateArray (size:int) {
	Debug.Log("array started");
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
	var currentSegment = mazeArray[aX,aY,aZ];
	currentSegment.isStart = 2;
	currentSegment.previousSegments ++;
	var aR = Random.Range(0,2);
	currentSegment.rotation = aR;
	currentSegment.type = "End";
	Create(currentSegment);
	mazeArray[aX,aY,aZ] = currentSegment;
	for(var x=0;x>aY;x++){
		currentSegment = mazeArray[aX,x,aZ];
		currentSegment.isUsed = 2;
		mazeArray[aX,x,aZ] = currentSegment;
	}
	/*if(aR == 0){
		nextSegment.Add();
	}
	else if (aR == 1){
		
	}*/
	Debug.Log(nextSegment[0]);
}

public function Create(Segment){
	if (Segment.isUsed != 2){
		var type = Segment.GetType;
		var x : int = Segment.X;
		var y : int = Segment.Y;
		var z : int = Segment.Z;
		var rotation = Segment.rotation;   
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
/*function Tutorial(startX,startY,startZ){
	SetUp(startX,startY,startZ);
	Create("Straight",0,0,0,1);
	Create("3Way",0,0,-3,2);
	Create("Wall",3,0,-3,2);
	Create("Straight",0,5,-3,1);
	Create("Gap",0,5,0,1);
	Create("Wall",0,0,3,0);
	Create("Wall",0,5,3,0);
	Create("Turn",-3,0,3,2);
}*/

function Start(){
	GenerateMaze(size);
	//SetUp();
}