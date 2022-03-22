// Controle de camera.

import * as THREE from '../resources/threejs/build/three.module.js';

var scene 		= null;
var renderer	= null;
var camera 		= null;
var myObj		= null;
var dz			= 0.004;

function main() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	const aspectRatio = window.innerWidth/window.innerHeight;

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	let fovY = 65.0;

	camera = new THREE.PerspectiveCamera( fovY, aspectRatio, 0.1, 100.0 );
	scene.add( camera );
	
	var globalAxis = new THREE.AxesHelper(2.0);
	scene.add( globalAxis );

	const helper = new THREE.CameraHelper( camera );
	scene.add( helper );

	var objGeometry = new THREE.SphereGeometry(1.0, 20, 20);                 
	var objMat = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe:true} );
	myObj = new THREE.Mesh( objGeometry, objMat );
	myObj.name = "myObj";
	scene.add( myObj );
		
	requestAnimationFrame(render);
};


function render() {

	var angleX 	= 0.007;

	myObj.rotateX(angleX);

	if (camera.position.z >= 0.9) 
		dz = -0.004;
	else
		if (camera.position.z <= -0.9)
			dz = 0.004;

	camera.position.z += dz;
	camera.updateProjectionMatrix();

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

main();
