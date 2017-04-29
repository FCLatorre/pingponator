#pragma strict

private var playerOneScore : int;
private var playerTwoScore : int;
@SerializeField
var gameBall : BallScript;
@SerializeField
var scoreText: UnityEngine.UI.Text;
@SerializeField
var goalScored : AudioClip;
@SerializeField
var endGame : AudioClip;
private var audSource: AudioSource;
@SerializeField
var endGameScreen : GameObject;
private var camShake : CameraShakeScript;

   // Use this for initialization
function StartNewGame()
{
	playerOneScore = 0;
	playerTwoScore = 0;
	UpdateScoreText ();
	endGameScreen.SetActive (false);
	gameBall.Reset ();
}
	
function Start ()
{
    audSource = gameObject.GetComponent(AudioSource);
    camShake = gameObject.GetComponent(CameraShakeScript);
	StartNewGame();
}
	
    // Update is called once per frame
function Update () {
	
}

function GoalScored(playerNumber)
{
    camShake.Shake();
    PlaySound (goalScored);
    // increase the score for whichever player scored
    if(playerNumber == 1)
	    playerOneScore++;
    else if (playerNumber ==2)
		playerTwoScore++;
		
    // now check if the player has won
	if(playerOneScore == 3)
		GameOver(1);
    else if (playerTwoScore ==3)
		GameOver(2);

	UpdateScoreText();

	gameBall.Reset ();

} 

function GameOver(winner)
{
    // this is called when a player reaches 3 points 
		
    // reset the scores
	 
    gameBall.Stop ();
    endGameScreen.SetActive (true);
    PlaySound (endGame);
}

function UpdateScoreText()
{
    scoreText.text = "Player One " + playerOneScore.ToString() + " - " + playerTwoScore.ToString() + " Player Two";
}

function PlaySound(soundClip : AudioClip)
{
	audSource.clip = soundClip;
    audSource.Play();
}