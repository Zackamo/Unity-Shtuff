﻿#pragma strict

var size : int = 10; //the size in all dimentions of the maze
var mazeArray  = [0,0,0];

class MazeSegment {
	var type = "none";
	var X : int;
	var Y : int;
	var Z : int;
	var rotation : int;
	var isUsed : int; 

	public function MazeSegment (type,X:int,Y:int,Z:int,R:int) {
		this.type = type;
		this.X = X*3;
		this.Y = Y*3;
		this.Z = Z*3;
		this.rotation = R;
		this.isUsed = 0; //0 = unused, 1 = needs to be used, 2 = is used, 3 = can't be used
	}
	public function ChangeUsed (newUsed){
		this.isUsed = newUsed;
	}
}

function GenerateArray (size:int) {
	for(var x = 0; x < size; x++){
		for (var y = 0; y < size; y++) {
			for (var z = 0; z < size; z++) {
				//var myObject = new MazeSegment("none",x,y,z,0);
				//mazeArray[x,y,z] = myObject;
			}
		}
	}
}
function GenerateMaze (){
	
}
