#pragma strict

@SerializeField
var forceValue : int = 4.5;
var myBody : Rigidbody2D;
        
function Start () {
    this.myBody = gameObject.GetComponent( typeof(myBody) );
}

function Update () {
	
}

function Reset()
{
    // reset the ball position and restart the ball movement
    myBody.velocity = Vector2.zero;
    transform.position = new Vector2(0,0);
    myBody.AddForce (new Vector2 (forceValue * 50, 50));
    forceValue = forceValue * -1;
}

function Stop()
{
    // this method stops the ball
    myBody.velocity = Vector2.zero;
}