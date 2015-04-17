#pragma strict

var size : int = 10; //the size in all dimentions of the maze
var nextSegment = [];
var mazeArray : MazeSegment[,,];
var CreateMaze:CreateMaze;

class MazeSegment {
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
		Y = Y*3;
		Z = Z*3;
		rotation = R;
		isUsed = 0; //0 = unused, 1 = needs to be used, 2 = is used, 3 = can't be used
		segmentFrom = [];
		isStart = 0; //0 = no, 1 = start, 2 = end
	}
	public function ChangeUsed (newUsed){
		this.isUsed = newUsed;
	}
	public function CangeFrom(newFrom){
		var currentLength = this.segmentFrom.Length;
		this.segmentFrom[currentLength] = newFrom; 
	}
	public function CreateMe(type){
		CreateMaze.Create(type,this.X,this.Y,this.Z,this.rotation);
	}
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
		mazeArray[aX,aY,aZ].isStart = 2;
		var aR = Random.Range(0,2);
		mazeArray[aX,aY,aZ].rotation = aR;
		for(var x=aY;x>0;x--){
			mazeArray[aX,aY,aZ].isUsed = 3;
		}
}
function GenerateMaze (size:int){
	var mazeArray = GenerateArray(size);
	var randomX = Random.value;
	var randomY = Random.value;
	var randomZ = Random.value;
	randomX *= size;
	randomY *= size;
	randomZ *= size;
	FindEnd(randomX,randomY,randomZ);
}

function Start(){
	GenerateMaze(size);
}