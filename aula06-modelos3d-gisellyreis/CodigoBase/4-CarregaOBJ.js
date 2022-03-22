// Carregando uma malha de triangulos em Three.js

import * as THREE from '../resources/threejs/build/three.module.js';
import {OBJLoader} from '../resources/threejs/examples/jsm/loaders/OBJLoader.js';

var mesh;
var renderer;
var scene;
var camera;

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	const maxWinDim = Math.min(window.innerWidth, window.innerHeight)
	renderer.setSize(maxWinDim*0.7, maxWinDim*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	
	scene.add( camera );
	
	// Load Mesh
	const loader = new OBJLoader();
	loader.load('../resources/Models/OBJ/dragon.obj', loadMesh);

	render();
	}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {

	if (mesh) 
		requestAnimationFrame(animate);	
		
	else 
		requestAnimationFrame(render);	
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {
	var material = new THREE.MeshBasicMaterial({color: 0xAAAAFF, wireframe: true});

	loadedMesh.children.forEach(function (child) {
		child.material = material;
		});

	mesh = loadedMesh;
	scene.add(mesh);

	const axis = new THREE.AxesHelper();
	mesh.add(axis);	
	};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function animate(time) {

	mesh.rotation.y = time * 0.001;

	renderer.render(scene, camera);

	requestAnimationFrame(animate);		
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
