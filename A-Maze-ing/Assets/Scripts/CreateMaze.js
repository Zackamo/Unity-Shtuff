#pragma strict
 
var barrier : Transform;
var path : Transform;
var wall : Transform;

//types are: "Straight", "Turn", "3Way", "4Way", "Gap", "Wall"
function Create(type,x,y,z,rotation){
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
			if(rotation === 0){
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