// Criando uma malha poligonal 3D em Three.js

import * as THREE from '../resources/threejs/build/three.module.js';

var scene;
var renderer;
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

	buildScene();

	requestAnimationFrame(animate);		
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function animate(time) {

	var cube = scene.getObjectByName("cubo");

	cube.rotation.x = time * 0.00001;
	cube.rotation.y = time * 0.0001;
	cube.rotation.z = time * 0.0005;

	renderer.clear();
	renderer.render(scene, camera);

	requestAnimationFrame(animate);		
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function buildScene() {

	const positions 	= [];
	const indices		= [];

	positions.push( 0.5,  0.5,  0.5); 	// V0
	positions.push(-0.5, -0.5,  0.5); 	// V1 
	positions.push( 0.5, -0.5,  0.5); 	// V2 
	positions.push(-0.5,  0.5,  0.5); 	// V3 
	positions.push( 0.5,  0.5, -0.5); 	// V4 
	positions.push(-0.5, -0.5, -0.5); 	// V5 
	positions.push( 0.5, -0.5, -0.5); 	// V6 
	positions.push(-0.5,  0.5, -0.5); 	// V7 

	// Front
	indices.push(1, 2, 0); 
	indices.push(1, 0, 3); 
	// Back
	indices.push(5, 4, 6); 
	indices.push(5, 7, 4); 
	// Top
	indices.push(3, 0, 4); 
	indices.push(3, 4, 7); 
	// Bottom
	indices.push(1, 6, 2); 
	indices.push(1, 5, 6); 
	// Right
	indices.push(2, 6, 4); 
	indices.push(2, 4, 0); 
	// Left
	indices.push(5, 1, 3); 
	indices.push(5, 3, 7);
	
	const cubeGeom = new THREE.BufferGeometry(); 

	cubeGeom.setIndex( indices );
	cubeGeom.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );

	const cubeMaterial 	= 	new THREE.MeshBasicMaterial(	{	color:0x0000FF,
																wireframe:false
															});

	const cubeMesh 		= new THREE.Mesh(cubeGeom, cubeMaterial); 
	cubeMesh.name 		= "cubo";

	const axis = new THREE.AxesHelper();
	cubeMesh.add(axis);

	scene.add( cubeMesh );
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
