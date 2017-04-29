#pragma strict

@SerializeField
var isPlayerOne : boolean;
var isPlayerTwo : boolean;
var isPlayerThree : boolean;
var isPlayerFour : boolean;
@SerializeField
var speed : float = 0.2f;       // how far the paddle moves per frame
private var myTransform : Transform;    // reference to the object's transform
private var direction : int = 0; // 0 = still, 1= up, -1 = down
private var previousPositionY : int;
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
        if (Input.GetKey (KeyCode.UpArrow))
            MoveUp ();
        else if (Input.GetKey (KeyCode.DownArrow))
            MoveDown ();
    }
    else if (isPlayerThree) // if not player 2 it must be player 1
    {
        if (Input.GetKey ("r"))
            MoveUp ();
        else if (Input.GetKey ("f"))
            MoveDown ();
    }
    else if (isPlayerFour) // if not player 2 it must be player 1
    {
        if (Input.GetKey("o"))
            MoveUp();
        else if (Input.GetKey("l"))
            MoveDown();
    }
    else if (isPlayerOne)
    {
        if (Input.GetKey("q"))
            MoveUp();
        else if (Input.GetKey("a"))
            MoveDown();
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

function OnCollisionExit2D(other : Collision2D)
{
    //Chequear tipo== Collision2D
    if(typeof(other)!==Collision2D)
        return;
    var adjust = 5 * direction;
    other.rigidbody.velocity = new Vector2(other.rigidbody.velocity.x, other.rigidbody.velocity.y + adjust);        
}