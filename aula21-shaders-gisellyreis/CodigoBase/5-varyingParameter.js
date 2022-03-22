// Iluminação 

import * as THREE 				from '../resources/threejs/build/three.module.js';
import { GUI } 					from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'
import { TrackballControls }	from '../resources/threejs/examples/jsm/controls/TrackballControls.js';

var scene 		= null;
var renderer	= null;
var camera 		= null;
var camControl	= null;
var params 		= null;
var shaderMat 	= null;
var baseMat 	= null;
var clock;
var timeTick 	= 0.0;

var gui 		= new GUI();

function main() {

	clock = new THREE.Clock();
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	const maxDim = Math.max(window.innerWidth, window.innerHeight) * 0.5;
	renderer.setSize(maxDim, maxDim);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(60.0, 1.0, 0.01, 300.0);
	camera.position.x 	= 0.0;
	camera.position.y 	= 100.0;
	camera.position.z 	= 100.0;

	camera.updateProjectionMatrix();

	// Controle de Camera Orbital
	camControl 	= new TrackballControls(camera, renderer.domElement);

	shaderMat = new THREE.ShaderMaterial( 	
						{ 	uniforms 		: 	{ 	uTime	: 	{ 	type 	: "f", 
																	value 	: timeTick 
																},
													uAmp	: 	{ 	type 	: "f", 
																	value 	: 7.0 
																},
												},
							vertexShader 	: document.getElementById('vertShader').textContent,
							fragmentShader 	: document.getElementById('fragShader').textContent,
							wireframe  		: true,
							side 			: THREE.DoubleSide
						} );

	baseMat 		= new THREE.MeshBasicMaterial(	{ 	color 		: 	0x556BFF, 
														side 		: 	THREE.DoubleSide,
														wireframe 	:	true
													} );

	// Ground
	var groundMesh 	= new THREE.Mesh(	new THREE.PlaneBufferGeometry(700.0, 700.0, 150, 150), 
										baseMat);

	groundMesh.name 				= "ground";
	groundMesh.rotation.x 			= -Math.PI / 2;
	groundMesh.position.y 			= 1.1;

	scene.add(groundMesh);

	// Global Axis
	var globalAxis = new THREE.AxesHelper(50);
	scene.add( globalAxis );

	initGUI();
			
	renderer.clear();
	render();
}

function render() {
	var delta = clock.getDelta();
    camControl.update(delta);

	if (params.shaderOn) {
	    timeTick += delta;
	    var obj = scene.getObjectByName("ground");
		obj.material.uniforms.uTime = { type 	: "f", 
										value 	: timeTick };
		obj.material.uniformsNeedUpdate = true;
		}

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function initGUI() {	
	params = 	{	shaderOn 	: false,
					amplitud	: 7.0 
				};

	gui.add( params, 'shaderOn').onChange(function() 	{ 	var obj = scene.getObjectByName("ground")
															if (params.shaderOn)
																obj.material = shaderMat;
															else
																obj.material = baseMat;												
														});
	gui.add( params, 'amplitud', 1.0, 20.0).onChange(function() 	{ 	var obj = scene.getObjectByName("ground")
																		obj.material.uniforms.uAmp.value = params.amplitud;
																		obj.material.uniformsNeedUpdate = true;
																	});
	gui.open();
};
		
main();
