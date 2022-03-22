// Desenhando linhas em Three.js

import * as THREE from '../resources/threejs/build/three.module.js';

function main() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

    var axis = new THREE.AxesHelper();
    scene.add(axis);

	const vertices = [];

	vertices.push(	new THREE.Vector3( -1.0,  0.5, 0.0 ) );
	vertices.push(	new THREE.Vector3( -0.5, -0.5, 0.0 ) );
	vertices.push(	new THREE.Vector3(  0.0,  0.5, 0.0 ) );
	vertices.push(	new THREE.Vector3(  0.5, -0.5, 0.0 ) );
	vertices.push(	new THREE.Vector3(  1.0,  0.5, 0.0 ) ); 

	var geometry = new THREE.BufferGeometry().setFromPoints( vertices );
	
	var line = new THREE.Line( geometry );
	scene.add( line );	

	renderer.clear();
	renderer.render(scene, camera);
};

main();
