// Controle de camera com GUI.

import * as THREE 			from '../resources/threejs/build/three.module.js';
import {GLTFLoader} 		from '../resources/threejs/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

var scene 			= null;
var renderer		= null;
var camera 			= null;
var mesh			= null;
var orbitControls	= null;
var clock;
var farPlane		= 200.0;
var nearPlane		= 1.0;

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 45.0, window.innerWidth/window.innerHeight, nearPlane, farPlane);
	camera.position.x = 100.0;
	camera.position.y = 100.0;
	camera.position.z = 100.0;

	// Controle de Camera Orbital
	orbitControls = new OrbitControls(camera, renderer.domElement);
	orbitControls.autoRotate = false;
	
	// Load Mesh
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('../resources/Models/city/scene.gltf', loadMesh); 
	
	render();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {
	
	loadedMesh.name = "city";
	
	mesh = loadedMesh.scene;
	scene.add(mesh);
	setMaterial(mesh);
	
	const box = new THREE.Box3().setFromObject(mesh);
	
	camera.position.x = box.max.x;
	camera.position.y = box.max.y;
	camera.position.z = box.max.z;
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	
	farPlane = Math.max(	(box.max.x - box.min.x),
							(box.max.y - box.min.y),
							(box.max.z - box.min.z) );
	camera.near = nearPlane;
	camera.far = farPlane*10.0;
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxesHelper(farPlane);
	scene.add( globalAxis );

	orbitControls.update();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {

    orbitControls.update();

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function setMaterial(obj, isLast = true) {

	const lastNdx = obj.children.length - 1;

	switch (obj.name) {
		case "mesh_0" 	: 	obj.material = new THREE.MeshBasicMaterial(	{ 	color : 0xFF0000,
																			wireframe:  true 
																		} );
							break;
		case "mesh_1" 	: 	obj.material = new THREE.MeshBasicMaterial(	{ 	color : 0x00FF00,
																			wireframe:  true 
																		} );
							break;
		case "mesh_2" 	: 	obj.material = new THREE.MeshBasicMaterial(	{ 	color : 0x0000FF,
																			wireframe:  true 
																		} );
							break;
		default		 	: 	obj.material = new THREE.MeshBasicMaterial(	{ 	color : 0xFFFFFF,
																			wireframe:  true 
																		} );
							break;
		}

	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		setMaterial(child, isLast);
										  	} );
};



main();
