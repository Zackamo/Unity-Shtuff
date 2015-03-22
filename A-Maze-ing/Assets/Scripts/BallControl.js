#pragma strict

var rotationSpeed = 200;
var jumpHight = 12;
var lastYvelocity = 0;

private var isFalling = false;

function Update () 
{
	//ball rotation
	var rotationX : float = Input.GetAxis ("Horizontal") * rotationSpeed;
	rotationX *= Time.deltaTime;
	GetComponent.<Rigidbody>().AddTorque (Vector3.back * rotationX);
	
	var rotationZ : float = Input.GetAxis ("Vertical") * rotationSpeed;
	rotationZ *= Time.deltaTime;
	GetComponent.<Rigidbody>().AddTorque (Vector3.right * rotationZ);
	

	
	if (Input.GetKeyDown(KeyCode.Space) && Mathf.Abs(GetComponent.<Rigidbody>().velocity.y) < 4 && isFalling == false)
	{	
		GetComponent.<Rigidbody>().velocity.y = jumpHight;
	}
	lastYvelocity = Mathf.Abs(GetComponent.<Rigidbody>().velocity.y);
}
function OnCollisionStay()
{	// need to know if this was a wall or not
	isFalling = false;
}
function OnCollisionExit ()
{
	//var floor = gameObject.FindWithTag ('');
	isFalling = true;
}
function OnCollisionEnter ()
{
	//causes bounce
	if (lastYvelocity > 1)
	{
		GetComponent.<Rigidbody>().velocity.y = lastYvelocity * 0.8;
	}
	if (lastYvelocity < 4)
	{	 isFalling = false;
	}
}