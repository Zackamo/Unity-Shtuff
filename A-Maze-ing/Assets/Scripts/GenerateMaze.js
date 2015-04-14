#pragma strict

var size : int = 10; //the size in all dimentions of the maze
var nextSegment = [];

class MazeSegment {
	var type = "none";
	var X : int;
	var Y : int;
	var Z : int;
	var rotation : int;
	var isUsed : int;
	var segmentFrom = [];
	var isStart :int;

	public function MazeSegment (type,X:int,Y:int,Z:int,R:int) {
		this.type = type;
		this.X = X*3;
		this.Y = Y*3;
		this.Z = Z*3;
		this.rotation = R;
		this.isUsed = 0; //0 = unused, 1 = needs to be used, 2 = is used, 3 = can't be used
		this.segmentFrom = [];
		this.isStart = 0; //0 = no, 1 = start, 2 = end
	}
	public function ChangeUsed (newUsed){
		this.isUsed = newUsed;
	}
	public function cangeFrom(newFrom){
		var currentLength = this.segmentFrom.Length;
		this.segmentFrom[currentLength] = newFrom; 
	}
}

function GenerateArray (size:int) {
	var mazeArray = [[[]]];
	for(var h = 0; h < size; h++){
		for (var k = 0; k < size; k++) {
			for (var l = 0; l < size; l++) {
				mazeArray[h][k][l] = new MazeSegment("none",h,k,l,0);
				return mazeArray;
			}
		}
	}
	Debug.Log("array generated");
}
function FindEnd(aX : int,aY : int,aZ : int,mazeArray){
		mazeArray[aX,aY,aZ].isStart = 2;
}
function GenerateMaze (size:int){
	var mazeArray = GenerateArray(size);
	var randomX = Random.value;
	var randomY = Random.value;
	var randomZ = Random.value;
	randomX *= size;
	randomY *= size;
	randomZ *= size;
	FindEnd(randomX,randomY,randomZ,mazeArray);
}

function Start(){
	GenerateMaze(size);
}