uniform vec3 lightDirection;
uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular; 
uniform vec3 lightColor; 
uniform float shininess;
uniform vec3 ambientColor;

varying vec4 V_ViewPosition;
varying vec4 V_Normal_VCS;


void main()
{	
	vec3 n = normalize(normal);
	V_Normal_VCS = modelMatrix * vec4(n, 0.0);
	V_ViewPosition = vec4(normalize(cameraPosition), 1.0);
		
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
}