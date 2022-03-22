// Mapeando uma imagem em Three.js

import * as THREE from '../resources/threejs/build/three.module.js';

var texture;
var renderer;
var scene;
var camera;

function main() {

	scene 		= new THREE.Scene();
	renderer 	= new THREE.WebGLRenderer();
	
	var textureLoader 	= new THREE.TextureLoader();
	texture 			= textureLoader.load("../resources/Images/lena.png", onLoadTexture);

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	camera 		= new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	// Global Axis
	var globalAxis = new THREE.AxesHelper( 1.0 );
	globalAxis.position.set(0.0, 0.0, 0.5);
	scene.add( globalAxis );

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	renderer.clear();
};

function onLoadTexture() {

	if (!texture.image) 
		console.log("ERROR: loading texture");
	else {

		var txt = 	"Image size = " + texture.image.width + " <i>x</i> " + texture.image.height + "</br>" +
					"Pixel size: " + 1.0/texture.image.width + " <i>x</i> " + 1.0/texture.image.height;

		document.getElementById("output").innerHTML = txt;		

		const uniform = {
			uSampler 		: 	{ 	type: "t", 	value:texture }
			};
		
		var matShader = new THREE.ShaderMaterial( {
				uniforms		: uniform,
				vertexShader	: document.getElementById( 'imgVertShader' ).textContent,
				fragmentShader	: document.getElementById( 'imgFragShader' ).textContent
			} );
		
		// Plane
		var planeGeometry 	= new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);                 
		var plane 			= new THREE.Mesh( planeGeometry, matShader );
		scene.add( plane );	

		renderer.setSize(texture.image.width, texture.image.height);
		renderer.render(scene, camera);
		}
};

main();
