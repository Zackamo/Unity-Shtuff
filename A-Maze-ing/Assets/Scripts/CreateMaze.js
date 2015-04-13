#pragma strict
 
var barrier : Transform;
var path : Transform;
var wall : Transform;
var ball : Transform;
var ballLight : Transform;
var cameraLight : Transform;
var startX = 0;
var startY = 1;
var startZ = 0;
 
function SetUp(startX,startY,startZ){
	var X : int = startX;
	var Y : int = startY;
	var Z : int = startZ; 
	cameraLight.position = Vector3(X,Y,Z);
	ball.position = Vector3(X,Y,Z);
	ballLight.position = Vector3(X,Y,Z);
}

//types are: "Straight", "Turn", "3Way", "4Way", "Gap", "Wall"
//rotations are 0 = from x, 1 = from z, 2 = from -x, and 3 = from -z
function Create(type,xIn,yIn,zIn,rotation){
			var x : int = xIn;
			var y : int = yIn;
			var z : int = zIn;
			//create corner barriers and center path => exist in all types
			Instantiate(barrier,new Vector3(x+1,y,z+1),barrier.rotation);
			Instantiate(barrier,new Vector3(x+1,y,z-1),barrier.rotation);
			Instantiate(barrier,new Vector3(x-1,y,z+1),barrier.rotation);
			Instantiate(barrier,new Vector3(x-1,y,z-1),barrier.rotation);
	
	barrier.rotation = Quaternion.AngleAxis(rotation, Vector3.up);
	switch(type){
		case "Straight":
			//straight along X-axis
			if(rotation == 0){
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
			}
			//straight along Z-axis
			else if(rotation == 1){
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
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
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
			}
			else if(rotation == 1){
			//+X to +Z
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
			}
			else if(rotation == 2){
			//+Z to -X
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
			}
			else if(rotation == 3){
			//-X to -Z
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
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
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
			}
			else if(rotation == 1){
			//+X to Z axis
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
			}
			else if(rotation == 2){
			//+Z to X axis
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z),path.rotation);
			}
			else if(rotation == 3){
			//-X to Z axis
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
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
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
			}
			else if (rotation == 1){
			//along the Z axis
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
			}
			else{
				Debug.Log("Invalid rotation for Gap");
			}
			break;
		case "Wall":
			if (rotation == 0){
			//From -Z
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
				Instantiate(wall,new Vector3(x,y+2,z),wall.rotation);
			}
			else if (rotation == 1){
			//From +X
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(wall,new Vector3(x,y+2,z),wall.rotation);
			}
			else if (rotation == 2){
			//From -X
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(wall,new Vector3(x,y+2,z),wall.rotation);
			}
			else if (rotation == 3){
			//From +Z
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y+2,z-1),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(wall,new Vector3(x,y,z),wall.rotation);
			}
			else{
				Debug.Log("Invalid rotation for Wall");
			}
			break;			
	}
}

function Start() { 
	Tutorial(startX,startY,startZ);
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