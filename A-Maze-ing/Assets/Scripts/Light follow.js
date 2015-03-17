#pragma strict

var target : Transform;
var distance = -4;
var lift = 4;
var offset = 4;
function Update () 
{
	transform.position = target.position + Vector3(offset,lift,distance);
} 