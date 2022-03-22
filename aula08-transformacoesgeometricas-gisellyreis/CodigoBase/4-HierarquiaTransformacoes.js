// Construindo Hieraquias de Objetos.

import * as THREE	from '../resources/threejs/build/three.module.js';
import { GUI } 		from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'

var renderer 	= null;
var scene 		= null;
var camera 		= null;

var controls 	= null;

var gui = new GUI();

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -10.0, 10.0 );
	scene.add( camera );

	initGUI();

	buildScene();

	requestAnimationFrame( animate );
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initGUI() {

	controls = 	{	worldRot : false,
					line1Rot : true,
					line2Rot : true,
					line3Rot : true,
					};

	gui.add( controls, 'worldRot');
	gui.add( controls, 'line1Rot');
	gui.add( controls, 'line2Rot');
	gui.add( controls, 'line3Rot');
	gui.open();
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {

	var groupWorld = new THREE.Object3D();
	groupWorld.name = "World"; 

	// groupWorld.add( new THREE.AxesHelper( 1.0 ) );
	
	// Box
	var groupBox = new THREE.Object3D();
	groupBox.name = "Box";
	
	var box = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );              
	var boxMat = new THREE.MeshBasicMaterial( {color: 0x0000ff,wireframe:true} );
	var cube = new THREE.Mesh( box, boxMat );
	groupBox.add( cube );
	var boxAxis = new THREE.AxesHelper( 0.3 );
	groupBox.add( boxAxis );

	groupBox.position.set(-0.7, 0.7, 0.0);
	groupBox.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/4); 
	groupWorld.add( groupBox );	
	
	// Sphere
	var groupSphere = new THREE.Object3D();
	groupSphere.name = "Sphere";
	
	var sphereGeometry = new THREE.SphereGeometry( 0.2, 10, 10 );                 
	var sphereMat = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe:true} );
	var sphere = new THREE.Mesh( sphereGeometry, sphereMat );
	groupSphere.add( sphere );	
	var sphereAxis = new THREE.AxesHelper( 0.4 );
	groupSphere.add( sphereAxis );
	groupSphere.position.set(0.0, 0.7, 0.0);
	groupWorld.add( groupSphere );	
	
	// Ring
	var groupRing = new THREE.Object3D();
	groupRing.name = "Ring";

	var ringGeometry = new THREE.TorusGeometry( 0.2, 0.1, 15, 20 );                 
	var ringMat = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe:true} );
	var ring = new THREE.Mesh( ringGeometry, ringMat );
	groupRing.add( ring );	
	var ringAxis = new THREE.AxesHelper( 0.4 );
	groupRing.add( ringAxis );
	groupRing.position.set(0.7, 0.7, 0.0);
	groupWorld.add( groupRing );	
	
	// Group Second Line
	var groupSecondLine = new THREE.Object3D();
	groupSecondLine.name = "SecondLine";
	
	var secondLineAxis = new THREE.AxesHelper( 0.4 );
	groupSecondLine.add( secondLineAxis );
	
	// TorusKnot
	var torusKnotGeometry = new THREE.TorusKnotGeometry( 0.2, 0.06, 60, 20, 3, 2 );                 
	var torusKnotMat = new THREE.MeshBasicMaterial( {color: 0x7070aa, wireframe:true} );
	var torusKnot = new THREE.Mesh( torusKnotGeometry, torusKnotMat );
	torusKnot.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/4); 
	groupSecondLine.add( torusKnot );
	
	// Cilinder
	var cilinderGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.5, 30);                 
	var cilinderMat = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} );
	var cilinder = new THREE.Mesh( cilinderGeometry, cilinderMat );
	cilinder.position.set(0.7, 0.0, 0.0);
	cilinder.rotateOnAxis(new THREE.Vector3(1, 0, 0).normalize(), -Math.PI/4); 
	groupSecondLine.add( cilinder );	
	
	// Icosahedron
	var icosahedronGeometry = new THREE.IcosahedronGeometry(0.2);                 
	var icosahedronMat = new THREE.MeshBasicMaterial( {color: 0x00ffff, wireframe:true} );
	var icosahedron = new THREE.Mesh( icosahedronGeometry, icosahedronMat );
	icosahedron.position.set(1.4, 0.0, 0.0);
	groupSecondLine.add( icosahedron );	
	
	groupSecondLine.position.set(-0.7, 0.0, 0.0);
	
	groupWorld.add( groupSecondLine );
	
	// Group Third Line
	var groupThirdLine = new THREE.Object3D();
	groupThirdLine.name = "ThirdLine";

	var thirdLineAxis = new THREE.AxesHelper( 0.5 );
	groupThirdLine.add( thirdLineAxis );
	
	// Plane
	var planeGeometry = new THREE.PlaneBufferGeometry(0.2, 0.5, 10, 10);                 
	var planeMat = new THREE.MeshBasicMaterial( {color: 0xff00ff, wireframe:true} );
	var plane = new THREE.Mesh( planeGeometry, planeMat );
	plane.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/4); 
	groupThirdLine.add( plane );	
	
	// Tetrahedron
	var tetrahedronGeometry = new THREE.TetrahedronGeometry(0.2);                 
	var tetrahedronMat = new THREE.MeshBasicMaterial( {color: 0x70aa70, wireframe:true} );
	var tetrahedron = new THREE.Mesh( tetrahedronGeometry, tetrahedronMat );
	tetrahedron.position.set( -0.7, 0.0, 0.0);
	tetrahedron.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/6); 
	groupThirdLine.add( tetrahedron );	
	
	// Dodecahedron
	var dodecahedronGeometry = new THREE.DodecahedronGeometry(0.2);                 
	var dodecahedronMat = new THREE.MeshBasicMaterial( {color: 0xaa7070, wireframe:true} );
	var dodecahedron = new THREE.Mesh( dodecahedronGeometry, dodecahedronMat );
	dodecahedron.position.set( -1.4, 0.0, 0.0);
	dodecahedron.rotateOnAxis(new THREE.Vector3(1.0, 1.0, 1.0).normalize(), -Math.PI/6); 
	groupThirdLine.add( dodecahedron );	
	
	groupThirdLine.position.set(0.7, -0.7, 0.0);
	
	groupWorld.add( groupThirdLine );

	scene.add(groupWorld);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function animate() {

var rotLine1 = 0.05;
var rotLine2 = 0.07;
var rotLine3 = 0.03;
var rotWorld = 0.01;

var objGroup;

	objGroup = scene.getObjectByName("Box");
	if (objGroup && controls.line1Rot) 
		objGroup.rotateX(rotLine1);

	objGroup = scene.getObjectByName("Sphere");
	if (objGroup && controls.line1Rot)
		objGroup.rotateX(rotLine1);

	objGroup = scene.getObjectByName("Ring");
	if (objGroup && controls.line1Rot)
		objGroup.rotateX(rotLine1);

	objGroup = scene.getObjectByName("SecondLine");
	if (objGroup && controls.line2Rot)
		objGroup.rotateX(rotLine2);

	objGroup = scene.getObjectByName("ThirdLine");
	if (objGroup && controls.line3Rot)
		objGroup.rotateX(rotLine3);

	objGroup = scene.getObjectByName("World");
	if (objGroup  && controls.worldRot)
		objGroup.rotateOnAxis(new THREE.Vector3(1.0, 1.0, 1.0).normalize(), rotWorld);

	renderer.render(scene, camera);
	
	requestAnimationFrame( animate );
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
