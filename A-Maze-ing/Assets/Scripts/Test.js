#pragma strict

function Start () {
	var anArray = [[00,01,02,03,04,05,06,07,08,09],[10,11,12,13,14,15,16,17,18,19]];
	var random = Random.Range(0,10);
	var random2 = Random.Range(0,2);
	Debug.Log(random);
	var num = anArray [random2,random];
	Debug.Log(num);
}

function Update () {

}