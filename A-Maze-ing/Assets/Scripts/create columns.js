#pragma strict

function Start () {
	column_wall(0, 5, 0);
}


function column_air(x, y, z){
	
}

function column_floor(x, y, z){

}

function column_wall(x, y, z){
	var wall : GameObject;
	wall = new GameObject ("wall");
	//wall.AddComponent("BoxCollider");
	//wall.AddComponent("cube(mesh filter)");
	//wall.transform.position.x = x;
	//wall.transform.position.y = y;
	//wall.transform.position.z = z;
	Instantiate(wall, Vector3(x, y, z), Quaternion.identity);
}

function column_gap(x, y, z){

}