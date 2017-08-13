
varying vec4 V_ViewPosition;
varying vec4 V_Normal_VCS;

const vec3 lightColor = vec3(1,1,1);
const vec3 ambientColor = vec3(0.4,0.4,0.4);
const vec3 lightDirection= vec3(0.49,0.79,0.49);
const float kAmbient = 0.4;
const float kDiffuse = 0.8;
const float kSpecular = 0.8;
const float shininess = 10.0;

void main() {

	vec3 lDirection = lightDirection;
	//lDirection = normalMatrix * lightDirection;
	lDirection = normalize(lDirection);
	vec3 normalV = normalize(V_Normal_VCS.xyz);
	vec3 cameraV = normalize(V_ViewPosition.xyz);

	float angle = dot(lDirection, normalV);
	float specValue = abs(dot(reflect(lDirection, normalV), cameraV));

	vec3 ambIntesity = kAmbient * ambientColor;
	vec3 specIntensity = kSpecular * pow(specValue, 10.0) * ambientColor;
	vec3 diffIntensity = kDiffuse * angle * lightColor;
	gl_FragColor = vec4(ambIntesity + diffIntensity + specIntensity, 1.0);
}
