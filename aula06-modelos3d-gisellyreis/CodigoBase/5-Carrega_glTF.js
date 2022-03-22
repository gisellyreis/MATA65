// Carregando uma malha de triangulos em Three.js

import * as THREE 		from '../resources/threejs/build/three.module.js';
import { GLTFLoader } 	from '../resources/threejs/examples/jsm/loaders/GLTFLoader.js';

var mesh;
var renderer;
var scene;
var camera;
var root;

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	const maxWinDim = Math.min(window.innerWidth, window.innerHeight)
	renderer.setSize(maxWinDim*0.7, maxWinDim*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -7.0, 7.0, 14.0, -0.0, -7.0, 7.0 );
	
	scene.add( camera );
	
	// Load Mesh
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('../resources/Models/glTF/tie/scene.gltf', loadMesh);

	render();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(mesh) {

	root = mesh.scene;

	scene.add(root);
	setMaterial(root);

	const helper = new THREE.BoxHelper();
	helper.setFromObject(root);

	helper.geometry.computeBoundingBox();

	var max = helper.geometry.boundingBox.max;
	var min = helper.geometry.boundingBox.min;

	const maxDim 	= Math.max 	(	(max.x - min.x),
									(max.y - min.y),
									(max.z - min.z) 
								);

	camera.top 		= 
	camera.left		=
	camera.near		= maxDim*1.2;

	camera.bottom 	= 
	camera.right	=
	camera.far 		= -maxDim*1.2;

	camera.updateProjectionMatrix();

	const axis = new THREE.AxesHelper(maxDim*1.2);
	scene.add(axis);
	renderer.render(scene, camera);
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {

	if (root) 
		requestAnimationFrame(animate);		
	else 
		requestAnimationFrame(render);	
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function animate(time) {

	root.rotation.y = time * 0.001;

	renderer.render(scene, camera);

	requestAnimationFrame(animate);		
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function setMaterial(obj, isLast = true) {

	const lastNdx = obj.children.length - 1;

	obj.material = new THREE.MeshBasicMaterial(	{ 	color : 0xFFFFFF,
													wireframe:  true 
												} );

	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		setMaterial(child, isLast);
										  	} );
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
