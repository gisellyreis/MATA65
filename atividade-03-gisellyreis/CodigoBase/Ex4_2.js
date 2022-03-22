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
var phongMat		= null;
var clock;

var gui 			= new GUI();

function main() {

	clock = new THREE.Clock();
	scene = new THREE.Scene(); 
	
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	const maxDim = Math.max(window.innerWidth, window.innerHeight) * 0.7;
	renderer.setSize(maxDim, maxDim);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(60.0, 1.0, 0.1, 30.0);

	var textureLoader 	= new THREE.TextureLoader();
	var texture 		= textureLoader.load("../resources/Textures/Wood.jpg");


	
	// Controle de Camera Orbital
	orbitControls 	= new OrbitControls(camera, renderer.domElement);

	initMaterials(texture);
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

function initMaterials(texture) {
	phongMat		= new THREE.MeshPhongMaterial		(  	 {  map: texture, color: 0xffcbdb,
																specular 	: 0xffffff,
																reflectivity: 0.5,
																shininess 	: 500.0 
															});	
}

function buildScene() {

	 // cria Mapeamento de Ambiente
	 const path          = "../resources/Textures/Cubemaps/";
	 const textCubeMap   =    [  path + "posx.jpg", 
								 path + "negx.jpg",
								 path + "posy.jpg", 
								 path + "negy.jpg",
								 path + "posz.jpg", 
								 path + "negz.jpg"
							 ];
 
	 const textureCube   = new THREE.CubeTextureLoader().load( textCubeMap );
	 scene.background    = textureCube;

	const teapot 	= new TeapotGeometry();
	const mesh 		= new THREE.Mesh( teapot, phongMat );
	mesh.name 		= "teapot";

	scene.add(mesh);

	// Bounding Box	
	var box 		= new THREE.Box3();
	box.setFromObject(mesh);

	// Adjust Camera Position and LookAt	
	var maxCoord 	= Math.max(box.max.x,box.max.y,box.max.z);
	camera.position.set( 300, 100, 400 );

	/* camera.position.x 	= 
	camera.position.y 	= 
	camera.position.z 	= maxCoord; */
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


	const ptLight 			= new THREE.PointLight( 0xFFFFFF, 1.0 );
	ptLight.name 			= "pntLight";
	ptLight.position.set( 0.0, 0.0,  maxCoord*4);
	ptLight.visible 		= true;
	scene.add( ptLight );
	const ptLightHelper 	= new THREE.PointLightHelper( ptLight, 4.0 );
	ptLightHelper.name 		= "pntLightHlpr";
	ptLightHelper.visible 	= false;
	scene.add( ptLightHelper );

	const ptLight2 			= new THREE.PointLight( 0xFFFFFF, 1.0 );
	ptLight2.name 			= "pntLight2";
	ptLight2.position.set( 200.0, 0.0,  maxCoord*4);
	ptLight2.visible 		= false;
	scene.add( ptLight2 );
	const ptLight2Helper 	= new THREE.PointLightHelper( ptLight2, 4.0 );
	ptLight2Helper.name 		= "pntLight2Hlpr";
	ptLight2Helper.visible 	= false;
	scene.add( ptLight2Helper );

	const ptLight3 			= new THREE.PointLight( 0xFFFFFF, 1.0 );
	ptLight3.name 			= "pntLight3";
	ptLight3.position.set( -maxCoord*2, 0.0, 0.0);
	ptLight3.visible 		= false;
	scene.add( ptLight3 );
	const ptLight3Helper 	= new THREE.PointLightHelper( ptLight3, 4.0 );
	ptLight3Helper.name 		= "pntLight3Hlpr";
	ptLight3Helper.visible 	= false;
	scene.add( ptLight3Helper );


	curLight				= ptLight;
}

function initGUI() {	
	params = 	{	luzOn		: true,
					questao		: "D",
				};

	gui.add( params, 'luzOn').onChange(function()	{ 	curLight.visible = params.luzOn;
														if (curLightHlpr) 
															curLightHlpr.visible = params.luzOn;
													});

	gui.add( params, 'questao', [  
									"D", 
									"E",
									"F" ] ).onChange(changeLight);
	gui.open();
};

function changeLight() { 

	var lightHelper;

	if (params.luzOn) {
		curLight.visible = false;
		if (curLightHlpr) 
			curLightHlpr.visible = false;
		}

	switch (params.questao) {
		case "D" 		: 	curLight 		= scene.getObjectByName("pntLight");
								curLightHlpr 	= scene.getObjectByName("pntLightHlpr");
								break;

		case "E" 		: 	curLight 		= scene.getObjectByName("pntLight2");
								curLightHlpr 	= scene.getObjectByName("pntLight2Hlpr");
								break;
		
		case "F" 		: 	curLight 		= scene.getObjectByName("pntLight3");
								curLightHlpr 	= scene.getObjectByName("pntLight3Hlpr");
								break;

		}

	if (params.luzOn) {
		curLight.visible = true;
		if (curLightHlpr) 
			curLightHlpr.visible = true;
		}
}
		
main();
