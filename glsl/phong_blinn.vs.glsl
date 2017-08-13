varying vec4 V_Normal_VCS;
varying vec4 V_ViewPosition;

void main() {

	vec3 n = normalize(normal);
	V_Normal_VCS = modelMatrix * vec4(n, 0.0);
	V_ViewPosition = vec4(normalize(cameraPosition), 1.0);

	gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);
}
