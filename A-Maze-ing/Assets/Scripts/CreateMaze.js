#pragma strict
 

var barrier : Transform;

function Create(type,x,y,z,rotation){
	switch(type){
		case "barrier":
			Instantiate(barrier,new Vector3(x,y,z),rotation);
			
	}
}

function Start() { 

Create("barrier",1,5,7,0);

}

function Update () {

}