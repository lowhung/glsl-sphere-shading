varying vec4 V_Color;
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
    vec3 n = normalize(V_Normal_VCS.xyz);
    vec3 l = normalize(lightDirection);
    vec3 v = reflect(n, l);
    vec3 t = cross(n, l);
    vec3 h = normalize(l+v);
    vec3 camV = normalize(V_ViewPosition.xyz);


    float angle = dot(l,n);
    float specular = pow(max(dot(n,h), 0.0),shininess);

    // Heidrich-Seidel anisotropic distribution
    float ldott = dot(l,v);
    float vdott = dot(v,t);

    float aniso = pow(sin(ldott)*sin(vdott) +
                      cos(ldott)*cos(vdott), 10.0);

    float specValue = max(dot(reflect(l, n), camV), 0.0);


    vec3 ambIntesity = kAmbient * ambientColor;
    vec3 specIntensity = kSpecular * pow(specValue, 10.0) * ambientColor;
    vec3 diffIntensity = kDiffuse * ldott * lightColor;


    gl_FragColor = vec4((ambientColor*kAmbient) +
                        (lightColor*kDiffuse*angle) + (specIntensity*aniso), 1.0);
}
