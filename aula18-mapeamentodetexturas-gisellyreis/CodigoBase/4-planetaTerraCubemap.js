// Mapeamento de Texturas 

import * as THREE           from '../resources/threejs/build/three.module.js';
import { OrbitControls }    from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

var renderer;
var scene;
var camera;
var cameraControl;
var earthMesh;
var cloudMesh;
var cubeMesh;

function main() {

    var clock               = new THREE.Clock();

    scene                   = new THREE.Scene();

    renderer                = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

    document.body.appendChild(renderer.domElement);

    camera                  = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x       = 25;
    camera.position.y       = 10;
    camera.position.z       = 63;
    camera.lookAt(scene.position);

    cameraControl           = new OrbitControls(camera, renderer.domElement);
    cameraControl.enablePan = false;
    
    // cria Mapeamento de Ambiente
    const path          = "../resources/Textures/Cubemaps/";
    const textCubeMap   =    [  path + "galaxyposx.png", 
                                path + "galaxynegx.png",
                                path + "galaxyposy.png", 
                                path + "galaxynegy.png",
                                path + "galaxyposz.png", 
                                path + "galaxynegz.png"
                            ];

    const textureCube   = new THREE.CubeTextureLoader().load( textCubeMap );
    scene.background    = textureCube;

    // cria esfera do planeta Terra
    const sphereGeometry  = new THREE.SphereGeometry(15, 60, 60);
    const textureLoader   = new THREE.TextureLoader();
    const earthTexture    = textureLoader.load("../resources/Textures/earthmap4k.jpg");

    const normalMap       = textureLoader.load("../resources/Textures/earthnormal2k.jpg");

    const earthMaterial     = new THREE.MeshPhongMaterial();
    earthMaterial.map       = earthTexture;
    earthMaterial.normalMap = normalMap;
    earthMesh               = new THREE.Mesh(sphereGeometry, earthMaterial);
    scene.add(earthMesh);

    // cria a atmosfera com as nuvens, uma esfera um pouco maior que a da Terra
    var cloudGeometry       = new THREE.SphereGeometry(15.2, 60, 60);
    cloudMesh               = new THREE.Mesh(cloudGeometry, createCloudMaterial());
    scene.add(cloudMesh);

    // Luz ambiente
    var ambientLight    = new THREE.AmbientLight(0x111111);
    ambientLight.name   = 'ambient';
    scene.add(ambientLight);

    // Luz do sol
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set( 3, 3, 3 ).normalize();
    directionalLight.name = 'directional';
    scene.add(directionalLight);

    render();
}

function createCloudMaterial() {
    var textureLoader           = new THREE.TextureLoader();
    var cloudTexture            = textureLoader.load("../resources/Textures/earthcloudmapspec.jpg");

    var cloudMaterial 			= new THREE.MeshPhongMaterial();
    cloudMaterial.map 			= cloudTexture;
    cloudMaterial.transparent 	= true;
    cloudMaterial.opacity 		= 0.8;
    cloudMaterial.blending 		= THREE.AdditiveBlending;

    return cloudMaterial;
}

function render() {

    cameraControl.update();

	earthMesh.rotation.y+=0.00005;
	cloudMesh.rotation.y+=0.00060;

    renderer.autoClear = false;
    renderer.render(scene, camera);

    requestAnimationFrame(render);
};

main();
