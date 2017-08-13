varying vec4 V_Color;
uniform vec3 lightDirection;
uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform vec3 lightColor;
uniform float shininess;
uniform vec3 ambientColor;


void main() {

	V_Color = vec4(1.0, 0.0, 0.0, 1.0);

	gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);

	vec4 n = modelMatrix * vec4(normal, 0.0);
	vec3 norm = normalize(n.xyz);
	vec3 lDirection = lightDirection;
	lDirection = normalize(lDirection);

	float angle = dot(norm, lDirection);
	float specValue = abs(dot(reflect(lDirection, norm), normalize(cameraPosition)));

	//innerBracketIntensity = (kDiffuse * intensity) + kSpecular;
	//V_Color = vec4((kAmbient * ambientColor) + (((kDiffuse * intensity) + kSpecular)*lightColor), 1.0);
	//	float lambertian = max(dot(lightDirection, GL_Normal), 0.0)*kAmbient;
	//	V_Color = vec4(lambertian*ambientColor + kSpecular*lightColor)*V_Color;

	vec3 ambIntesity = kAmbient * ambientColor;
	vec3 specIntensity = kSpecular * pow(specValue, 10.0) * ambientColor;
	vec3 diffIntensity = kDiffuse * angle * lightColor;
	V_Color = vec4(ambIntesity + diffIntensity + specIntensity, 1.0);

}
