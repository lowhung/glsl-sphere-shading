uniform sampler2D sphereTexture;
varying vec2 texCoord;

void main() {

	vec4 texColor = texture2D(sphereTexture, texCoord);
	gl_FragColor = texColor; 
}
