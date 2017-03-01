#pragma strict

// remember the correct starting camera position so we can revert back once shaking is complete
var originPosition : Vector3;
var originRotation : Quaternion;
	
var originalDecay : int = 0.006;
var originalIntensity : int = 0.04;
var shake_decay : int;
var shake_intensity : int;
var shaking : boolean; // is the camera supposed to be shaking at the moment
var cameraTransform : Transform;
	
function Start() {        
	cameraTransform =  Camera.main.transform;        
}
	
function Update (){
    if(!shaking)            
        return;        
		
    if (shake_intensity > 0)
    {
        cameraTransform.localPosition = originPosition + Random.insideUnitSphere * shake_intensity;
        /*cameraTransform.localRotation = new Quaternion(                
			                                            originRotation.x + Random.Range (-shake_intensity,shake_intensity) * .2f,                
			                                            originRotation.y + Random.Range (-shake_intensity,shake_intensity) * .2f,                
			                                            originRotation.z + Random.Range (-shake_intensity,shake_intensity) * .2f,                
			                                            originRotation.w + Random.Range (-shake_intensity,shake_intensity) * .2f);*/
        cameraTransform.localRotation = new Quaternion(                
			                                            originRotation.x + UnityEngine.Random.Range (-shake_intensity,shake_intensity) * .2,                
			                                            originRotation.y + UnityEngine.Random.Range (-shake_intensity,shake_intensity) * .2,                
			                                            originRotation.z + UnityEngine.Random.Range (-shake_intensity,shake_intensity) * .2,                
			                                            originRotation.w + UnityEngine.Random.Range (-shake_intensity,shake_intensity) * .2);
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