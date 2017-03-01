#pragma strict

@SerializeField
private var attackingPlayer : int; // which player scores into this goal

@SerializeField
var gameMan : GameManagerScript; // this will hold a reference to the game manager script
@SerializeField
var partSys : ParticleSystem;

function Start () {
	
}

function Update () {
	
}

function OnCollisionEnter2D(other : Collision2D)
{
    //Chequear tipo other    
	if(typeof(other)==Collision2D && other.transform.name == "Ball")
	{
        gameMan.GoalScored(attackingPlayer);
        partSys.transform.position = new Vector2(partSys.transform.position.x, other.transform.position.y);
        partSys.Play();
    }
}
