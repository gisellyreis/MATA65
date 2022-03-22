// Mapeando uma imagem em Three.js

import * as THREE 	from '../resources/threejs/build/three.module.js';
import { GUI } 		from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'

var texture;
var renderer;
var scene;
var camera;

const gui = new GUI();

function main() {

	scene 		= new THREE.Scene();
	renderer 	= new THREE.WebGLRenderer();
	
	var textureLoader 	= new THREE.TextureLoader();
	texture 			= textureLoader.load("../resources/Images/mandrill.png", onLoadTexture);

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	camera 		= new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	// Global Axis
	var globalAxis = new THREE.AxesHelper( 1.0 );
	globalAxis.position.set(0.0, 0.0, 0.5);
	scene.add( globalAxis );

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	buildGUI();
};

function onLoadTexture() {

	if (!texture.image) 
		console.log("ERROR: loading texture");
	else {

		var txt = 	"Image size = " + texture.image.width + " <i>x</i> " + texture.image.height + "</br>" +
					"Pixel size: " + 1.0/texture.image.width + " <i>x</i> " + 1.0/texture.image.height;

		document.getElementById("output").innerHTML = txt;		
		
		var matShader = new THREE.ShaderMaterial( {
				uniforms		: 	{ 	uSampler 	: 	{ 	type: "t", 	value: texture },
										uW 			: 	{ 	type: "v3", value: new THREE.Vector3( 0.299, 0.587, 0.114 ) }
									},
				vertexShader	: document.getElementById( 'imgVertShader' ).textContent,
				fragmentShader	: document.getElementById( 'imgFragShader' ).textContent
			} );
		
		// Plane
		var planeGeometry 	= new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);                 
		var plane 			= new THREE.Mesh( planeGeometry, matShader );
		plane.name 			= "imagem";
		scene.add( plane );	

		renderer.setSize(texture.image.width, texture.image.height);
		renderer.render(scene, camera);
		}
};

function buildGUI() {

	var params = 	{ 	pesoR	: 0.299,		 
						pesoG	: 0.587, 
						pesoB	: 0.114, 
					};

	gui.add( params, 'pesoR', 0.0, 1.0, 0.1).onChange(function() 	{ 	var obj = scene.getObjectByName("imagem")
																		obj.material.uniforms.uW.value.x = params.pesoR;
																		obj.material.uniformsNeedUpdate  = true;
																		renderer.render(scene, camera);
																	});

	gui.add( params, 'pesoG', 0.0, 1.0, 0.1).onChange(function() 	{ 	var obj = scene.getObjectByName("imagem")
																		obj.material.uniforms.uW.value.y 		= params.pesoG;
																		obj.material.uniformsNeedUpdate = true;
																		renderer.render(scene, camera);
																	});

	gui.add( params, 'pesoB', 0.0, 1.0, 0.1).onChange(function() 	{ 	var obj = scene.getObjectByName("imagem")
																		obj.material.uniforms.uW.value.z 		= params.pesoB;
																		obj.material.uniformsNeedUpdate = true;
																		renderer.render(scene, camera);
																	});
	gui.open();
};

main();
