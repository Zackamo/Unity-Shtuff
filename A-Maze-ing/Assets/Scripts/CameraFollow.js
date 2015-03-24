#pragma strict

var target : Transform;
var distance = -7;
var lift = 3;
var offset = 7;
function LateUpdate () 
{
	transform.position = target.position + Vector3(offset,lift,distance);
	transform.LookAt (target);
} 