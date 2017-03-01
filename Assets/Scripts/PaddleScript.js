#pragma strict

@SerializeField
var isPlayerTwo : boolean;
@SerializeField
var speed : int = 0.2;       // how far the paddle moves per frame
var myTransform : Transform;    // reference to the object's transform
var direction : int = 0; // 0 = still, 1= up, -1 = down
var previousPositionY : int;
// Use this for initialization
function Start () {
	myTransform = transform;
	previousPositionY = myTransform.position.y;
}
	
// FixedUpdate is called once per physics tick/frame
function FixedUpdate () {
    // first decide if this is player 1 or player 2 so we know what keys to listen for
    if (isPlayerTwo)
    {
        if (Input.GetKey ("o"))
            MoveUp ();
        else if (Input.GetKey ("l"))
            MoveDown ();
    }
    else // if not player 2 it must be player 1
    {
        if (Input.GetKey ("q"))
            MoveUp ();
        else if (Input.GetKey ("a"))
            MoveDown ();
    }

    if (previousPositionY > myTransform.position.y)
        direction = -1;
    else if (previousPositionY < myTransform.position.y)
        direction =1;
    else
        direction = 0;
}
	
// move the player's paddle up by an amount determined by 'speed'
function MoveUp()
{
    myTransform.position = new Vector2(myTransform.position.x, myTransform.position.y + speed);
}
	
// move the player's paddle down by an amount determined by 'speed'
function MoveDown()
{
    myTransform.position = new Vector2 (myTransform.position.x, myTransform.position.y - speed);            
}

function LateUpdate()
{
    previousPositionY = myTransform.position.y;
}

function OnCollisionExit2D(other)
{
    //Chequear tipo== Collision2D
    if(typeof(other)!==Collision2D)
        return;
    var adjust = 5 * direction;
    other.rigidbody.velocity = new Vector2(other.rigidbody.velocity.x, other.rigidbody.velocity.y + adjust);        
}