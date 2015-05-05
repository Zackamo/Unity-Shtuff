#pragma strict

var BallControl:BallControl;

function OnCollisionEnter(){
	BallControl.isFalling = false;
}
function OnCollisionExit(){
	BallControl.isFalling = true;
}