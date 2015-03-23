#pragma strict
 
var barrier : Transform;
var path : Transform;
var wall : Transform;
 
function SetUp(){
	//Instantiate(Camera,new Vector3(0,0,0),Camera);
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
			else{
				Instantiate(barrier,new Vector3(x+1,y,z),barrier.rotation);
				Instantiate(barrier,new Vector3(x-1,y,z),barrier.rotation);
				Instantiate(path,new Vector3(x,y,z+1),path.rotation);
				Instantiate(path,new Vector3(x,y,z-1),path.rotation);
			}
			break;
		case "Turn":
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

Create("Straight",0,0,0,0);

}

function Update () {

}