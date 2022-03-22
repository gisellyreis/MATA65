// Controle de camera com GUI.

import * as THREE 	from '../resources/threejs/build/three.module.js';
import { GUI } 		from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'

var scene 			= null;
var renderer		= null;
var cameraPersp		= null;
var cameraOrto		= null;
var cameraHelper 	= null;
var controls		= null;
var angleX 			= 0.007;
var angleY			= 0.003;
var angleZ			= 0.001;
var winDim;

var gui = new GUI();

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {
		
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	winDim = Math.min(window.innerWidth*0.7, window.innerHeight*0.7);
	renderer.setSize(winDim*2.0, winDim);

	renderer.autoClear = false;

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	cameraPersp = new THREE.PerspectiveCamera();
	cameraPersp.fov 		= 75.0;
	cameraPersp.aspect 		= 1.0;
	cameraPersp.near 		= 70.0;
	cameraPersp.far			= 15.0;
	cameraPersp.position.x	= 0.0;
	cameraPersp.position.y	= 0.0;
	cameraPersp.position.z	= 40.0;

	scene.add( cameraPersp );

	cameraHelper = new THREE.CameraHelper(cameraPersp);
	scene.add( cameraHelper );

	cameraOrto = new THREE.OrthographicCamera(-70.0, 70.0, 70.0, -70.0, -100.0, 100.0);
	cameraOrto.position.x	= 40.0;
	cameraOrto.position.y	= 40.0;
	cameraOrto.position.z	= 40.0;
	cameraOrto.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

	const globalAxis = new THREE.AxesHelper(20.0);
	scene.add( globalAxis );

	const objGeometry = new THREE.TorusKnotGeometry( 10.0, 3.0, 100, 16 );                 
	const objMatSolid = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe:true} );
	const objMatLines = new THREE.MeshBasicMaterial( {color: 0x0000aa, wireframe:false} );

	const myObj = new THREE.Object3D();
	myObj.add(new THREE.Mesh( objGeometry, objMatSolid ));
	myObj.add(new THREE.Mesh( objGeometry, objMatLines ));
	myObj.name = "myObj";
	scene.add( myObj );

	initGUI();

	renderer.clear();
	render();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {

	var obj = scene.getObjectByName("myObj");
	obj.rotateX(angleX);
	obj.rotateY(angleY);
	obj.rotateZ(angleZ);

	renderer.setViewport(0.0, 0.0, winDim, winDim );
	cameraPersp.updateProjectionMatrix();
	cameraHelper.visible = false;
	cameraHelper.update();
	renderer.render( scene, cameraPersp );

	renderer.setViewport(winDim, 0.0, winDim, winDim )
	cameraHelper.visible = true;
	cameraOrto.updateProjectionMatrix();
	cameraHelper.update();
	renderer.render( scene, cameraOrto );
		
	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function initGUI() {

	controls = new function () {
		this.fov 		= cameraPersp.fov;
		this.near		= cameraPersp.near;
		this.far 		= cameraPersp.far;
		this.camPosX	= cameraPersp.position.x;
		this.camPosY	= cameraPersp.position.y;
		this.camPosZ	= cameraPersp.position.z;
		}

	var fCamPersp = gui.addFolder('Perspectiva');
	fCamPersp.add(controls, 'fov', 10.0, 170.0).onChange(function (value) {
		cameraPersp.fov = controls.fov;
		cameraPersp.updateProjectionMatrix();
		});

	fCamPersp.add(controls, 'near', 0.1, 100.0).onChange(function (value) {
		cameraPersp.near = controls.near;
		cameraPersp.updateProjectionMatrix();
		});

	fCamPersp.add(controls, 'far', 1.0, 1000.0).onChange(function (value) {
		cameraPersp.far = controls.far;
		cameraPersp.updateProjectionMatrix();
		});
	fCamPersp.open();

	var fCamPos = gui.addFolder('Camera');
	fCamPos.add( controls, 'camPosX', -40.0, 40.0).onChange(function (value) {
		cameraPersp.position.x = controls.camPosX;
		cameraPersp.updateProjectionMatrix();
		});
	fCamPos.add( controls, 'camPosY', -40.0, 40.0).onChange(function (value) {
		cameraPersp.position.y = controls.camPosY;
		cameraPersp.updateProjectionMatrix();
		});
	fCamPos.add( controls, 'camPosZ', -40.0, 40.0).onChange(function (value) {
		cameraPersp.position.z = controls.camPosZ;
		cameraPersp.updateProjectionMatrix();
		});
	fCamPos.open();
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
