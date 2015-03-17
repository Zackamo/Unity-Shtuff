#pragma strict

var target : Transform;
var distance = -10;
var lift = 1.5;
var offset = 0;
function Update () 
{
	transform.position = target.position + Vector3(offset,lift,distance);
	transform.LookAt (target);
} 