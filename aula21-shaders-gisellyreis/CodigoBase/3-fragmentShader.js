// Processando uma imagem usando shaders no Three.js

import * as THREE 	from '../resources/threejs/build/three.module.js';
import Stats 		from '../resources/threejs/examples/jsm/libs/stats.module.js'
import { GUI } 		from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'

var texture;
var renderer;
var scene;
var camera;
var params;

var gui = new GUI();

function main() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	const wsize = Math.max(window.innerWidth, window.innerHeight);
	renderer.setSize(wsize*0.4, wsize*0.4);

	camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	// Global Axis
	var globalAxis = new THREE.AxesHelper( 1.0 );
	globalAxis.position.set(0.0, 0.0, 0.5);
	scene.add( globalAxis );

	var matShader = new THREE.ShaderMaterial( {
							uniforms: { fixedColor: { type: "bool", value : true }},
							vertexShader: document.getElementById( 'vertexShader' ).textContent,
							fragmentShader: document.getElementById( 'fragShader' ).textContent
							} );
	
	// Plane
	var planeGeometry 	= new THREE.PlaneBufferGeometry();                 
	var plane 			= new THREE.Mesh( planeGeometry, matShader );
	plane.name = "image";
	scene.add( plane );	

	buildGUI();

	renderer.clear();
	renderer.render( scene, camera );
};

function buildGUI() {

	params = { bFixedColor: true }; // boolean (checkbox)

	gui.add( params, 'bFixedColor').onChange(function() 	{ 	var obj = scene.getObjectByName("image")
																obj.material.uniforms.fixedColor.value = params.bFixedColor;
																obj.material.uniformsNeedUpdate = true;
																renderer.render( scene, camera );
															});
	gui.open();
};

main();
