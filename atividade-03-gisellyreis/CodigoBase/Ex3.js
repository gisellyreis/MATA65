// Iluminação 

import * as THREE 			from '../resources/threejs/build/three.module.js';
import { GUI } 				from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';
import { TeapotGeometry } 	from '../resources/threejs/examples/jsm/geometries/TeapotGeometry.js';

var scene 			= null;
var renderer		= null;
var camera 			= null;
var orbitControls	= null;
var flatMat			= null;
var clock;


function main() {

	clock = new THREE.Clock();
	scene = new THREE.Scene(); 
	
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	const maxDim = Math.max(window.innerWidth, window.innerHeight) * 0.7;
	renderer.setSize(maxDim, maxDim);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(60.0, 1.0, 0.1, 30.0);

	var textureLoader 	= new THREE.TextureLoader();
	var texture 		= textureLoader.load("../resources/Textures/brick_diffuse.jpg");


	
	// Controle de Camera Orbital
	orbitControls 	= new OrbitControls(camera, renderer.domElement);

	initMaterials(texture);
	buildScene();
			
	renderer.clear();
	render();
}

function render() {
	var delta = clock.getDelta();
    orbitControls.update(delta);

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function initMaterials(texture) {
	flatMat			= new THREE.MeshStandardMaterial	(	{ 	map: texture, 
																color: 0xeeac9e,
																flatShading : true 
															} );
}

function buildScene() {

	 // cria Mapeamento de Ambiente
	 const path          = "../resources/Textures/Cubemaps/";
	 const textCubeMap   =    [  path + "posx.jpg", 
								 path + "negx.jpg",
								 path + "posy.jpg", 
								 path + "negy.jpg",
								 path + "posz.jpg", 
								 path + "negz.jpg"
							 ];
 
	 const textureCube   = new THREE.CubeTextureLoader().load( textCubeMap );
	 scene.background    = textureCube;

	const teapot 	= new TeapotGeometry();
	const mesh 		= new THREE.Mesh( teapot, flatMat );
	mesh.name 		= "teapot";

	scene.add(mesh);

	// Bounding Box	
	var box 		= new THREE.Box3();
	box.setFromObject(mesh);

	// Adjust Camera Position and LookAt	
	var maxCoord 	= Math.max(box.max.x,box.max.y,box.max.z);
	camera.position.set( 300, 100, 400 );

	
	camera.far 			= new THREE.Vector3(	maxCoord*5, 
												maxCoord*5, 
												maxCoord*5).length();

	camera.lookAt(new THREE.Vector3(	(box.max.x + box.min.x)/2.0,
										(box.max.y + box.min.y)/2.0,
										(box.max.z + box.min.z)/2.0));
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxesHelper(maxCoord*1.3);
	scene.add( globalAxis );


	const ambLight 			= new THREE.DirectionalLight( 0xFFFFFF, 1.0 ); 
	ambLight.name 			= "ambLight";
	ambLight.visible 		= true;
	ambLight.position.set(  0.0, 0.0, 3.0 );
	scene.add( ambLight );

}


	
main();
