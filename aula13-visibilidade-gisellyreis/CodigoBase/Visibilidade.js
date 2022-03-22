// Controle de camera com GUI.

import * as THREE 			from '../resources/threejs//build/three.module.js';
import { GUI } 				from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'
import { OBJLoader } 		from '../resources/threejs/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } 		from '../resources/threejs/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

var scene 			= null;
var renderer		= null;
var camera 			= null;
var mesh			= null;
var orbitControls	= null;
var clock;
var farPlane		= 200.0;
var nearPlane		= 0.1;
var zBuffer 		= true;
var faceCull		= "FrontFace";
var guiChanged		= false;
var params;

var gui 			= new GUI();

function main() {
	
	clock = new THREE.Clock();
	
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 	45.0, 
											window.innerWidth/window.innerHeight, 
											nearPlane, 
											farPlane );

	// Controle de Camera Orbital
	orbitControls = new OrbitControls(camera, renderer.domElement);
	orbitControls.autoRotate = false;
	
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('../resources/Models/city/scene.gltf', loadMesh);

	initGUI();
	
	renderer.clear();
	render();
};

function loadMesh(loadedMesh) {
		
	const root = loadedMesh.scene;
	root.name = "city";
	scene.add(root);
	setMaterial(root);
	
	const helper = new THREE.BoxHelper();
	helper.setFromObject(root);

	helper.geometry.computeBoundingBox();

	const max = helper.geometry.boundingBox.max;
	const min = helper.geometry.boundingBox.min;
	
	camera.position.x = max.x;
	camera.position.y = max.y;
	camera.position.z = max.z;
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	// farPlane = Math.max(	(max.x - min.x),
	// 						(max.y - min.y),
	// 						(max.z - min.z) );
	camera.near = nearPlane;
	camera.far = farPlane*10.0;
	camera.updateProjectionMatrix();

	orbitControls.update();
	
	//Add point light Source
	var pointLight1 = new THREE.PointLight(new THREE.Color(1.0, 1.0, 1.0));
	pointLight1.distance = 0.0;
	pointLight1.position.set(	max.x*1.2, 
								max.y*1.2, 
								max.z*1.2);
	scene.add(pointLight1);
	
	// Global Axis
	var globalAxis = new THREE.AxesHelper	( Math.max(	(max.x - min.x),
														(max.y - min.y),
														(max.z - min.z)
				  									  )
											);
	scene.add( globalAxis );
};


function initGUI() {
	
	params = 	{	zBuffer		: true,
					faceCulling	: "FrontFace"
				};

	gui.add( params, 'zBuffer').onChange(function(){
				guiChanged = true;
    			});
	gui.add( params, 'faceCulling', [ "FrontFace", "BackFace", "DoubleSide" ] ).onChange(function(){
				guiChanged = true;
    			});

	gui.open();
		
};

function render() {
	var delta = clock.getDelta();
    orbitControls.update(delta);

    if (guiChanged) {

		guiChanged = false;
		
		if (zBuffer !== params.zBuffer) 
			zBuffer = params.zBuffer;
			
		if (faceCull !== params.faceCulling) 
			faceCull = params.faceCulling;
			
		updateMaterial(scene.getObjectByName("city"));
		}

	renderer.render(scene, camera);
	requestAnimationFrame(render);
};

function setMaterial(obj, isLast = true) {
	const lastNdx = obj.children.length - 1;

	switch (obj.name) {
		case 'mesh_0' 	: 	obj.material = new THREE.MeshPhongMaterial({ color : 0xff0000 });
							break;
		case 'mesh_1' 	: 	obj.material = new THREE.MeshPhongMaterial({ color : 0x00ff00 });
							break;
		case 'mesh_2' 	: 	obj.material = new THREE.MeshPhongMaterial({ color : 0x0000ff });
							break;
		default			: 	obj.material = new THREE.MeshPhongMaterial({ color : 0xffffff });
							break;
		}

	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		setMaterial(child, isLast);
										  	} );
};

function updateMaterial(obj, isLast = true) {
	const lastNdx = obj.children.length - 1;

	if (obj.type == 'Mesh') {

		obj.material.depthTest = zBuffer;

		switch( faceCull ) {
			case "FrontFace"	: 	obj.material.side = THREE.FrontSide; 
									break;
			case "BackFace"		: 	obj.material.side = THREE.BackSide; 
									break;
			case "DoubleSide"	: 	obj.material.side = THREE.DoubleSide; 
									break;
			}
		}
	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		updateMaterial(child, isLast);
										  	} );
}

main();
