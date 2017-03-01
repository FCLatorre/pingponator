#pragma strict

// remember the correct starting camera position so we can revert back once shaking is complete
private var originPosition : Vector3;
private var originRotation : Quaternion;
	
var originalDecay : float = 0.006f;
var originalIntensity : float = 0.04f;
private var shake_decay : float;
private var shake_intensity : float;
private var shaking : boolean; // is the camera supposed to be shaking at the moment
private var cameraTransform : Transform;
	
function Start() {        
    cameraTransform =  Camera.main.transform;        
}
	
function Update (){
    if(!shaking)            
        return;        
		
    if (shake_intensity > 0)
    {
        cameraTransform.localPosition = originPosition + Random.insideUnitSphere * shake_intensity;

        cameraTransform.localRotation = new Quaternion(                
			                                            originRotation.x + Random.Range (-shake_intensity,shake_intensity) * .2f,                
			                                            originRotation.y + Random.Range (-shake_intensity,shake_intensity) * .2f,                
			                                            originRotation.z + Random.Range (-shake_intensity,shake_intensity) * .2f,                
			                                            originRotation.w + Random.Range (-shake_intensity,shake_intensity) * .2f);
        shake_intensity -= shake_decay;
    }
		
    else
    {        
        shaking = false;
        // reset the camera to its original state
        cameraTransform.localPosition = originPosition;            
        cameraTransform.localRotation = originRotation;            
    }
}
	
function Shake(){
		
    if(!shaking) {            
        originPosition = cameraTransform.localPosition;            
        originRotation = cameraTransform.localRotation;
    }
		
    shaking = true;        
    shake_intensity = originalIntensity;        
    shake_decay = originalDecay;
}