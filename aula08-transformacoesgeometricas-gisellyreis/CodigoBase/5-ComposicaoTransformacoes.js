// Construindo um sistema planetário.

import * as THREE 	from '../resources/threejs/build/three.module.js';
import { GUI } 		from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'

var scene 		= null;
var renderer	= null;
var camera 		= null;
var pos 		= 0.0;

var controls 	= null;

var gui = new GUI();

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerHeight*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -1.0, 5.0, 5.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	initGUI();

	buildScene();

	// renderer.render(scene, camera);
	requestAnimationFrame(anime);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initGUI() {

	controls = 	{	UseMatrix : true,
					};

	gui.add( controls, 'UseMatrix').onChange(mudaMatrizes);
	gui.open();
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function mudaMatrizes(val) {

	if (val) {
		console.log("TRUE");
		scene.getObjectByName("Quadrado0").matrixAutoUpdate = false;
		scene.getObjectByName("Quadrado1").matrixAutoUpdate = false;
		scene.getObjectByName("Quadrado2").matrixAutoUpdate = false;
		scene.getObjectByName("Quadrado0").matrixWorld.identity();
		scene.getObjectByName("Quadrado1").matrixWorld.identity();
		scene.getObjectByName("Quadrado2").matrixWorld.identity();
		}
	else {
		console.log("FALSE");
		scene.getObjectByName("Quadrado0").matrixAutoUpdate = true;
		scene.getObjectByName("Quadrado1").matrixAutoUpdate = true;
		scene.getObjectByName("Quadrado2").matrixAutoUpdate = true;
		scene.getObjectByName("Quadrado0").matrixWorld.identity();
		scene.getObjectByName("Quadrado1").matrixWorld.identity();
		scene.getObjectByName("Quadrado2").matrixWorld.identity();
	}
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {

	var axis = new THREE.AxesHelper(5.0);
	scene.add(axis);

	var quad0 	= new THREE.Mesh 	( 	new THREE.PlaneGeometry( 1.0, 1.0 ), 
										new THREE.MeshBasicMaterial( {color:0xFFFFFF} ), 
									);
	var quad1 	= new THREE.Mesh 	( 	new THREE.PlaneGeometry( 1.1, 1.1 ), 
										new THREE.MeshBasicMaterial( {color:0xFF0000} ), 
									);
	var quad2 	= new THREE.Mesh 	( 	new THREE.PlaneGeometry( 1.2, 1.2 ), 
										new THREE.MeshBasicMaterial( {color:0x0000FF} ), 
									);
	quad0.name = "Quadrado0";
	quad0.matrixAutoUpdate = false;
	quad1.name = "Quadrado1";
	quad1.matrixAutoUpdate = false;
	quad2.name = "Quadrado2";
	quad2.matrixAutoUpdate = false;

	scene.add(quad0);
	scene.add(quad1);
	scene.add(quad2);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function anime(time) {

	var teta 	= Math.PI * time * 0.0001; 

	if (!controls.UseMatrix) {
		var obj = scene.getObjectByName("Quadrado0");
		obj.rotation.z = teta;
		obj.scale.x = 
		obj.scale.y = 0.8;

		obj = scene.getObjectByName("Quadrado1");

		obj.rotation.z = teta;
		obj.position.x = 3.0;
		obj.scale.x = 
		obj.scale.y = 0.8;

		obj = scene.getObjectByName("Quadrado2");
		obj.scale.x = 
		obj.scale.y = 0.5;
		obj.position.x = 3.0;
		obj.rotation.z = teta;
		}
	else {
		var trans 		= new THREE.Matrix4();
		var rot 		= new THREE.Matrix4();
		var rotTrans	= new THREE.Matrix4();
		var transRot	= new THREE.Matrix4();

		trans.makeTranslation(3.0, 0.0, 0.0);

		rot.makeRotationZ(Math.PI * time * 0.0001);

		rotTrans.multiply(rot);
		rotTrans.multiply(trans);

		transRot.multiply(trans);
		transRot.multiply(rot);

		var obj = scene.getObjectByName("Quadrado0");
		obj.matrix.copy(rot);

		var obj = scene.getObjectByName("Quadrado1");
		obj.matrix.copy(rotTrans);

		var obj = scene.getObjectByName("Quadrado2");
		obj.matrix.copy(transRot);
		}

	renderer.render(scene, camera);

	requestAnimationFrame(anime);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
