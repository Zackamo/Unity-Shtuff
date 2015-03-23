#pragma strict

var target : Transform;
var distance = 0;
var lift = 0;
var offset = 0;
function Update () 
{
	transform.position = target.position + Vector3(offset,lift,distance);
} 