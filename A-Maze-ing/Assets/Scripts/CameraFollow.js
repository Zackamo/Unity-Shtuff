#pragma strict

var target : Transform;
var distance = -5;
var lift = 3;
var offset = 3;
function Update () 
{
	transform.position = target.position + Vector3(offset,lift,distance);
	transform.LookAt (target);
} 