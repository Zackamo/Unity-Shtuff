#pragma strict
 
var barrier : Transform;

function Create(type,x,y,z,rotation){
	
	barrier.rotation = Quaternion.AngleAxis(rotation, Vector3.up);
	switch(type){
		case "barrier":
			Instantiate(barrier,new Vector3(x,y,z),barrier.rotation);			
	}
}

function Start() { 

Create("barrier",1,-2,7,0);

}

function Update () {

}