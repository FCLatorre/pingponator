#pragma strict

@SerializeField
var forceValue : float = 4.5f;
private var myBody : Rigidbody2D;
private var speedX : float;
private var speedY : float;
private var oldPositionx : float;
        
function Start () {
    this.myBody = gameObject.GetComponent( Rigidbody2D);
    oldPositionx = transform.position.x; 

}

function Update () {
    checkSlowX();
}

function checkSlowX()
{
    speedX = oldPositionx - transform.position.x;
    oldPositionx = transform.position.x;
    if (speedX !=0 ){
        if(speedX < 0.14 && speedX > 0){
            myBody.AddForce (new Vector2 (-50, 0));
        }else if (speedX > -0.14 && speedX < 0){
            myBody.AddForce (new Vector2 (50, 0));
        }
        Debug.Log(speedX);
    }
}


function Reset()
{
    // reset the ball position and restart the ball movement
    myBody.velocity = Vector2.zero;
    transform.position = new Vector2(0,0);
    myBody.AddForce (new Vector2 (forceValue * 50, forceValue *50));
}

function Stop()
{
    // this method stops the ball
    myBody.velocity = Vector2.zero;
}