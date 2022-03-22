// Iluminação 

import * as THREE 			from '../resources/threejs/build/three.module.js';
import { GUI } 				from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } 		from '../resources/threejs/examples/jsm/loaders/OBJLoader.js';

var scene 			= null;
var renderer		= null;
var camera 			= null;
var orbitControls	= null;


function main() {

	scene = new THREE.Scene(); 
	
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	const maxDim = Math.max(window.innerWidth, window.innerHeight) * 0.5;
	renderer.setSize(maxDim, maxDim);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(60.0, 1.0, 0.1, 30.0);
	
	// Controle de Camera Orbital
	orbitControls 	= new OrbitControls(camera, renderer.domElement);

	//cria luz ambiente
	var ambientLight = new THREE.AmbientLight(0xffffff);
	ambientLight.name='ambient';
	scene.add(ambientLight);
	
	// Luz principal
	var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.name = 'directional';
	scene.add(directionalLight);


	buildScene();
	
	renderer.clear();
	render();
}

function render() {
    orbitControls.update();

	renderer.render(scene, camera);
	requestAnimationFrame(render);
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

	var objectLoader = new OBJLoader();
	objectLoader.load("../resources/Models/bunny.obj", function(obj) {
		
		const textureLoader = new THREE.TextureLoader();
		const texture 		= textureLoader.load("../resources/Textures/brick_diffuse.jpg");
		
		const phongMat		= new THREE.MeshPhongMaterial({  
			map: texture
		});
		
		/* obj.children.forEach(function (child) {
			child.material = phongMat;
		});  */

		//console.log(obj);
		
		obj.name 		= "bunny";
		scene.add(obj);

		const box = new THREE.Box3().setFromObject(obj);
	
		camera.position.x = -0.15;
		camera.position.y = 0.1;
		camera.position.z = 5.0;
		camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
		
		const farPlane = Math.max(	(box.max.x - box.min.x),
									(box.max.y - box.min.y),
									(box.max.z - box.min.z) );
		camera.near = 0.1;
		camera.far = farPlane*10.0;
		camera.updateProjectionMatrix();

		// Global Axis
		var globalAxis = new THREE.AxesHelper(farPlane);
		scene.add( globalAxis );

		
		orbitControls.update();
	});
	
	
}

		
main();
