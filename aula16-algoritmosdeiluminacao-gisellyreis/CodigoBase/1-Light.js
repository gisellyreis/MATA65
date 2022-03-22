// Iluminação 

import * as THREE 			from '../resources/threejs/build/three.module.js';
import { GUI } 				from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';
import { TeapotGeometry } 	from '../resources/threejs/examples/jsm/geometries/TeapotGeometry.js';

var scene 			= null;
var renderer		= null;
var camera 			= null;
var orbitControls	= null;
var curLight 		= null;
var curLightHlpr 	= null;
var params			= null;
var ambLight 		= null;
var flatMat			= null;
var gouraudMat		= null;
var phongMat		= null;
var pbrMat			= null;
var normalMat		= null;
var clock;

var gui 			= new GUI();

function main() {

	clock = new THREE.Clock();
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	const maxDim = Math.max(window.innerWidth, window.innerHeight) * 0.5;
	renderer.setSize(maxDim, maxDim);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(60.0, 1.0, 0.1, 30.0);
	
	// Controle de Camera Orbital
	orbitControls 	= new OrbitControls(camera, renderer.domElement);

	initMaterials();
	buildScene();
	initGUI();
			
	renderer.clear();
	render();
}

function render() {
	var delta = clock.getDelta();
    orbitControls.update(delta);

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function initMaterials() {
	flatMat			= new THREE.MeshStandardMaterial	(	{ 	color 		: 0x708090, 
																flatShading : true 
															} );
	gouraudMat		= new THREE.MeshLambertMaterial		( 	{	color 		: 0x708090 } );

	phongMat		= new THREE.MeshPhongMaterial		(  	{	color 		: 0x708090,
																specular 	: 0xFFFFFF,
																reflectivity: 1.0,
																shininess 	: 50.0 
															});

	pbrMat			= new THREE.MeshPhysicalMaterial	(  	{	color 				: 0x708090,
																metalness			: 0.7,
																roughness			: 0.6,
																clearcoat 			: 0.5,
																clearcoatRoughness 	: 0.1
															} );

	normalMat		= new THREE.MeshNormalMaterial();	
}

function buildScene() {

	const teapot 	= new TeapotGeometry( 15, 18 );
	const mesh 		= new THREE.Mesh( teapot, flatMat );
	mesh.name 		= "teapot";

	scene.add(mesh);

	// Bounding Box	
	var box 		= new THREE.Box3();
	box.setFromObject(mesh);

	// Adjust Camera Position and LookAt	
	var maxCoord 	= Math.max(box.max.x,box.max.y,box.max.z);
	
	camera.position.x 	= 
	camera.position.y 	= 
	camera.position.z 	= maxCoord;
	camera.far 			= new THREE.Vector3(	maxCoord*5, 
												maxCoord*5, 
												maxCoord*5).length();

	camera.lookAt(new THREE.Vector3(	(box.max.x + box.min.x)/2.0,
										(box.max.y + box.min.y)/2.0,
										(box.max.z + box.min.z)/2.0));
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxesHelper(maxCoord*1.3);
	scene.add( globalAxis );

	// Ground
	var groundMesh = new THREE.Mesh(	new THREE.PlaneBufferGeometry(maxCoord*200.0, maxCoord*200.0, 50, 50), 
										new THREE.MeshPhongMaterial({color: 0x556B2F}, 0.5));

	groundMesh.name 				= "ground";
	groundMesh.material.side 		= THREE.DoubleSide;
	groundMesh.material.flatShading	= true;
	groundMesh.rotation.x 			= -Math.PI / 2;
	groundMesh.position.y 			= box.min.y * 1.1;

	scene.add(groundMesh);
	
	const ambLight 			= new THREE.AmbientLight( 0xFFFFFF, 1.0 ); 
	ambLight.name 			= "ambLight";
	ambLight.visible 		= true;
	scene.add( ambLight );

	const dirLight 			= new THREE.DirectionalLight( 0xFFFFFF, 1.0 ); 
	dirLight.name 			= "dirLight";
	dirLight.visible 		= false;
	dirLight.position.set( 0.0, maxCoord*2, 0.0 );
	scene.add( dirLight );
	const dirLightHelper 	= new THREE.DirectionalLightHelper( dirLight, 4.0 );
	dirLightHelper.name 	= "dirLightHlpr";
	dirLightHelper.visible 	= false;
	scene.add( dirLightHelper );

	const ptLight 			= new THREE.PointLight( 0xFFFFFF, 1.0 );
	ptLight.name 			= "pntLight";
	ptLight.position.set( 0.0, 0.0, maxCoord*2);
	ptLight.visible 		= false;
	scene.add( ptLight );
	const ptLightHelper 	= new THREE.PointLightHelper( ptLight, 4.0 );
	ptLightHelper.name 		= "pntLightHlpr";
	ptLightHelper.visible 	= false;
	scene.add( ptLightHelper );

	const sptLight 			= new THREE.SpotLight( 0xFFFFFF, 1.0, maxCoord*5, Math.PI/6 );
	sptLight.name 			= "sptLight";
	sptLight.position.set( maxCoord*2, 0.0, 0.0 );
	sptLight.visible 		= false;
	scene.add( sptLight );
	const spotLightHelper 	= new THREE.SpotLightHelper( sptLight );
	spotLightHelper.name 	= "sptLightHlpr";
	spotLightHelper.visible = false;
	scene.add( spotLightHelper );

	curLight				= ambLight;
}

function initGUI() {	
	params = 	{	luzOn		: true,
					tipoLuz		: "Ambiente",
					ShadeAlg	: "Flat"
				};

	gui.add( params, 'luzOn').onChange(function()	{ 	curLight.visible = params.luzOn;
														if (curLightHlpr) 
															curLightHlpr.visible = params.luzOn;
													});
	gui.add( params, 'tipoLuz', [ 	"Ambiente", 
									"Direcional", 
									"Pontual", 
									"Spot" ] ).onChange(changeLight);

	gui.add( params, 'ShadeAlg', [ 	"Flat", 
									"Gouraud", 
									"Phong", 
									"PBR",
									"Normal" ] ).onChange(changeMaterial); 
	gui.open();
};

function changeLight() { 

	var lightHelper;

	if (params.luzOn) {
		curLight.visible = false;
		if (curLightHlpr) 
			curLightHlpr.visible = false;
		}

	switch (params.tipoLuz) {
		case "Ambiente" 	: 	curLight 		= scene.getObjectByName("ambLight");
								curLightHlpr 	= null;
								break;

		case "Direcional" 	: 	curLight 		= scene.getObjectByName("dirLight");
								curLightHlpr 	= scene.getObjectByName("dirLightHlpr");
								break;

		case "Pontual" 		: 	curLight 		= scene.getObjectByName("pntLight");
								curLightHlpr 	= scene.getObjectByName("pntLightHlpr");
								break;

		case "Spot" 		: 	curLight 		= scene.getObjectByName("sptLight");
								curLightHlpr 	= scene.getObjectByName("sptLightHlpr");
								break;
		}

	if (params.luzOn) {
		curLight.visible = true;
		if (curLightHlpr) 
			curLightHlpr.visible = true;
		}
}

function changeMaterial() { 

	var obj = scene.getObjectByName("teapot");

	switch (params.ShadeAlg) {
		case "Flat" 	: 	obj.material 				= flatMat;
							obj.material.flatShading	= true;
							break;

		case "Gouraud" 	: 	obj.material 				= gouraudMat;
							obj.material.flatShading	= false;
							break;

		case "Phong" 	: 	obj.material 				= phongMat;
							obj.material.flatShading	= false;
							break;

		case "PBR" 		: 	obj.material 				= pbrMat;
							obj.material.flatShading	= false;
							break;
		case "Normal" 	: 	obj.material 				= normalMat;
							obj.material.flatShading	= false;
							break;
		};
};
		
main();
