#pragma strict

public var barrier : Transform;
public var path : Transform;
public var wall : Transform;
public var end : Transform;
var ball : Transform;
var ballLight : Transform;
var cameraLight : Transform;


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

function Start () {
	Tutorial(0,1,0);
}