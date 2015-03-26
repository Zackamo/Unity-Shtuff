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
	Instantiate(ballLight,new Vector3(X,Y,Z),ballLight.rotation);
	Instantiate(cameraLight,new Vector3(0,0,0),cameraLight.rotation);
	Instantiate(ball,new Vector3(X,Y,Z),ball.rotation);
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
			Instantiate(path,new Vector3(x,y,z),path.rotation);
	
	barrier.rotation = Quaternion.AngleAxis(rotation, Vector3.up);
	switch(type){
		case "Straight":
			//straight along x-axis
			if(rotation == 0){
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
			}
			//straight along z-axis
			else if(rotation == 1){
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
			}
			break;
		case "Turn":
			if(rotation == 0){
			//-Z to +X 
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
			}
			else if(rotation == 1){
			//+X to +Z
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x+1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
			}
			else if(rotation == 2){
			//+Z to -X
				Instantiate(barrier,new Vector3(x,y,z-1),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
			}
			else if(rotation == 3){
			//-X to -Z
				Instantiate(barrier,new Vector3(x,y,z+1),barrier.rotation);
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x-1,y,z),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
			}
			break;
		case "3Way":
			break;
		case "4Way":
			break;
		case "Gap":
			break;
		case "Wall":
			break;			
	}
}

function Start() { 

SetUp(startX,startY,startZ);
Create("Straight",3,0,0,1);
Create("Straight",-3,0,0,1);
Create("Straight",0,0,3,0);
Create("Straight",0,0,-3,0);
Create("Turn",-3,0,3,0);
Create("Turn",-3,0,-3,1);
Create("Turn",3,0,3,3);
Create("Turn",3,0,-3,2);

}

function Update () {

}