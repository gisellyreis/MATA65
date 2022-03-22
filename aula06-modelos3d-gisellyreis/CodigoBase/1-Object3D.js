// Criando uma malha poligonal 3D em Three.js

import * as THREE 	from '../resources/threejs/build/three.module.js';
import { GUI } 		from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'

var objMesh;
var scene;
var renderer;
var camera;

var gui = new GUI();

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	const maxWinDim = Math.min(window.innerWidth, window.innerHeight)
	renderer.setSize(maxWinDim*0.7, maxWinDim*0.7);

	document.getElementById("WebGL-output").appendChild( renderer.domElement );

	initGUI();

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	buildScene();

	renderer.render( scene, camera );
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function buildScene() {

	const axis = new THREE.AxesHelper();
	scene.add(axis);

	objMesh = new THREE.Mesh 	(	new THREE.CylinderGeometry(	0.9, 0.9, 0.9, 10, 10), 
									new THREE.MeshBasicMaterial({color:0xFF00FF, wireframe:true })
								); 
	objMesh.name = "cilindro";
	scene.add( objMesh );

	objMesh = new THREE.Mesh 	( 	new THREE.TorusGeometry(0.7, 0.2, 40, 50), 
									new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true })
								); 
	objMesh.name 	= "toro";
	objMesh.visible = false;
	scene.add( objMesh );

	objMesh = new THREE.Mesh 	(	new THREE.DodecahedronGeometry(0.8), 
									new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true })
								); 
	objMesh.name = "dodeca";
	objMesh.visible = false;

	scene.add( objMesh );

	renderer.render(scene, camera);
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function initGUI() {	

	var controls = 	{	Forma3D : "Cilindro"
					};

	gui.add( controls, 'Forma3D', [ 	"Cilindro", 
										"Toro", 
										"Dodecaedro" ] ).onChange(changeForma);
	gui.open();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function changeForma(val) { 

	switch (val) {
		case "Cilindro"		: 	scene.getObjectByName("cilindro").visible 	= true;
								scene.getObjectByName("toro").visible 		= false;
								scene.getObjectByName("dodeca").visible 	= false;
								break;
		case "Toro"			:  	scene.getObjectByName("cilindro").visible 	= false;
								scene.getObjectByName("toro").visible 		= true;
								scene.getObjectByName("dodeca").visible 	= false;
								break;
		case "Dodecaedro"	:  	scene.getObjectByName("cilindro").visible 	= false;
								scene.getObjectByName("toro").visible 		= false;
								scene.getObjectByName("dodeca").visible 	= true;
								break;
		}

	renderer.render(scene, camera);
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
