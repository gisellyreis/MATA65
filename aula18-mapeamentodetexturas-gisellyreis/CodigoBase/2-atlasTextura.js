// Mapeamento de Texturas 

import * as THREE 			from '../resources/threejs/build/three.module.js';
import { OBJLoader } 		from '../resources/threejs/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

var renderer;
var scene;
var camera;
var cameraControl;
var objMesh;

function main() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

	// Controle de Camera Orbital
	cameraControl 	= new OrbitControls(camera, renderer.domElement);

	var objectLoader = new OBJLoader();
	objectLoader.load("../resources/Models/AtlasModels/bunny.obj", loadMesh);

	// cria luz ambiente
	var ambientLight = new THREE.AmbientLight(0xffffff);
	ambientLight.name='ambient';
	scene.add(ambientLight);
	
    // Luz principal
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.name = 'directional';
    scene.add(directionalLight);

	render();
}

function loadMesh(loadedMesh) {
	
	const textureLoader = new THREE.TextureLoader();
	const texture 		= textureLoader.load("../resources/Models/AtlasModels/bunny-atlas.jpg");
	const material 		= new THREE.MeshBasicMaterial({map:texture});
	
	loadedMesh.children.forEach(function (child) {
		child.material = material;
		});

	scene.add(loadedMesh);
	
	const box = new THREE.Box3().setFromObject(loadedMesh);
	
	camera.position.x = box.max.x*2;
	camera.position.y = box.max.y*2;
	camera.position.z = box.max.z*2;
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	
	const farPlane = Math.max(	(box.max.x - box.min.x),
								(box.max.y - box.min.y),
								(box.max.z - box.min.z) );
	camera.near = 0.1;
	camera.far = farPlane*10.0;
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxesHelper(farPlane);
	scene.add( globalAxis );

	cameraControl.update();
}

function render() {

	cameraControl.update();

	if (objMesh) 
		objMesh.rotation.y+=0.005;

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

main();
