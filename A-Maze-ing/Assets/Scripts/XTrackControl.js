#pragma strict

var Target = transform;
//var Target2 = gameObject.FindWithTag('player');
function OnCollisionStay ()
{	
	if (collider.transform.rotation.y == 0)
	{	//blocks z motion
		Target.transform.position.z = collider.transform.position.z;
	}
	else
	{	//blocks x motion
		Target.transform.position.x = collider.transform.position.x;
	}
}