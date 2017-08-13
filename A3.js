/**
 * UBC CPSC 314, Vsep2015
 * Assignment 3 Template
 */

var scene = new THREE.Scene();

// SETUP RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var aspect = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 10000);
camera.position.set(10,15,40);
camera.lookAt(scene.position); 
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

// FLOOR WITH CHECKERBOARD 
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(30, 30);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

//!!!!!!!!!! Texture for the sphere in part 4 !!!!!!!!!!!
var sphereTexture =  {type: 't', value: THREE.ImageUtils.loadTexture('images/gravel-rocks-texture.jpg')};
sphereTexture.wrapS = THREE.RepeatWrapping;
sphereTexture.wrapT = THREE.ClampToEdgeWrapping;
//sphereTexture.repeat.set( 4, 4 );

// !!!!!!!!!  Parameters defining the light position !!!!!!!!! 
var lightColor = {type: 'c', value: new THREE.Color(1,1,1)};
var ambientColor = {type: 'c', value: new THREE.Color(0.4,0.4,0.4)};
var lightDirection= {type: 'v3', value: new THREE.Vector3(0.49,0.79,0.49)};


// !!!!!!!!! Material properties !!!!!!!!!!
var kAmbient = {type: 'f', value: 0.4};
var kDiffuse = {type: 'f', value: 0.8};
var kSpecular = {type: 'f', value: 0.8};

var shininess = {type: 'f', value: 10.0};


// MATERIALS
var gouraudMaterial = new THREE.ShaderMaterial({
   uniforms: {
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
    lightColor: lightColor,
    lightDirection: lightDirection,
    ambientColor: ambientColor,

   },
});

var phongMaterial = new THREE.ShaderMaterial({
   uniforms: {

  },
});

var bPhongMaterial = new THREE.ShaderMaterial({
   uniforms: {

  },
});
var textureMaterial = new THREE.ShaderMaterial({
  uniforms: {
    sphereTexture: sphereTexture,
  },
});

var anisotropicMaterial = new THREE.ShaderMaterial({
  uniforms: {
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
    lightColor: lightColor,
    lightDirection: lightDirection,
    ambientColor: ambientColor,


  },
});

// LOAD SHADERS
var shaderFiles = [
  'glsl/gouraud.fs.glsl',
  'glsl/gouraud.vs.glsl',
  'glsl/phong.vs.glsl',
  'glsl/phong.fs.glsl',
  'glsl/phong_blinn.vs.glsl',
  'glsl/phong_blinn.fs.glsl',
  'glsl/texture.fs.glsl',
  'glsl/texture.vs.glsl',
  'glsl/anisotropic.vs.glsl',
  'glsl/anisotropic.fs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
 gouraudMaterial.vertexShader = shaders['glsl/gouraud.vs.glsl'];
 gouraudMaterial.fragmentShader = shaders['glsl/gouraud.fs.glsl'];
 phongMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
 phongMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];
 bPhongMaterial.vertexShader = shaders['glsl/phong_blinn.vs.glsl'];
 bPhongMaterial.fragmentShader = shaders['glsl/phong_blinn.fs.glsl'];
 textureMaterial.fragmentShader = shaders['glsl/texture.fs.glsl'];
 textureMaterial.vertexShader = shaders['glsl/texture.vs.glsl'];
 anisotropicMaterial.vertexShader = shaders['glsl/anisotropic.vs.glsl'];
 anisotropicMaterial.fragmentShader = shaders['glsl/anisotropic.fs.glsl'];
  
textureMaterial.needsUpdate = true;
phongMaterial.needsUpdate = true;
bPhongMaterial.needsUpdate = true;
gouraudMaterial.needsUpdate = true;
anisotropicMaterial.needsUpdate = true;
})

// LOAD OBJs
function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader()
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = floor;
    scene.add(object);

  }, onProgress, onError);
}

// CREATE SPHERES
var sphere = new THREE.SphereGeometry(1, 16, 16);
var gem_gouraud = new THREE.Mesh(sphere, gouraudMaterial); // tip: make different materials for each sphere
gem_gouraud.position.set(-3, 1, -1);
scene.add(gem_gouraud);
//gem_gouraud.parent = floor;    CHANGE THIS AT SOME POINT

var gem_phong = new THREE.Mesh(sphere, phongMaterial);
gem_phong.position.set(-1, 1, -1);
scene.add(gem_phong);
//gem_phong.parent = floor;

var gem_phong_blinn = new THREE.Mesh(sphere, bPhongMaterial);
gem_phong_blinn.position.set(1, 1, -1);
scene.add(gem_phong_blinn);
//gem_phong_blinn.parent = floor;

var gem_texture = new THREE.Mesh(sphere, textureMaterial);
gem_texture.position.set(3, 1, -1);
scene.add(gem_texture);
// gem_texture.parent = floor;

var gem_anisotropic = new THREE.Mesh(sphere, anisotropicMaterial);
    gem_anisotropic.position.set(5, 1, -1);
    scene.add(gem_anisotropic);



// SETUP UPDATE CALL-BACK
var keyboard = new THREEx.KeyboardState();
var render = function() {

	
 // tip: change armadillo shading here according to keyboard

 requestAnimationFrame(render);
 renderer.render(scene, camera);
}

render();