// Carregando uma malha de triangulos em Three.js

import * as THREE from '../resources/threejs/build/three.module.js';
import {OBJLoader} from '../resources/threejs/examples/jsm/loaders/OBJLoader.js';

var mesh;
var mesh2;
var mesh3;
var mesh4;
var sistema = null;
var renderer;
var scene;
var camera;

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

	camera = new THREE.OrthographicCamera( -3.0, 3.0, 2.0, -2.0, -2.0, 2.0 );
	
	scene.add( camera );
	
	buildScene();

	render();
	}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {

	if (mesh && mesh2) 
		requestAnimationFrame(animate);	
		
	else 
		requestAnimationFrame(render);	
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function buildScene() {

    sistema = new THREE.Object3D();
    sistema.name = "Sistema";
    // Load Mesh
	const loader = new OBJLoader();

	loader.load('../resources/Models/dragon.obj', function (obj) {
        var material = new THREE.MeshBasicMaterial({color: 0xAAAAFF, wireframe: true});
    
        obj.children.forEach(function (child) {
            child.material = material;
            });
    
        mesh = obj;
        mesh.position.set(2.0, 0.0, 0.0);
        scene.add(mesh);
    
        const axis = new THREE.AxesHelper();
        mesh.add(axis);	

        sistema.add(mesh);
    })

    loader.load('../resources/Models/dragon.obj', function (obj) {
        var material = new THREE.MeshBasicMaterial({color: 0xAA00FF, wireframe: true});
    
        obj.children.forEach(function (child) {
            child.material = material;
            });
    
        mesh2 = obj;
        mesh2.position.set(-2.0, 0.0, 0.0);
        scene.add(mesh2);
    
        const axis = new THREE.AxesHelper();
        mesh2.add(axis);
        
        sistema.add(mesh2);
    })

    loader.load('../resources/Models/dragon.obj', function (obj) {
        var material = new THREE.MeshBasicMaterial({color: 0xAA00FF, wireframe: true});
    
        obj.children.forEach(function (child) {
            child.material = material;
            });
    
        mesh3 = obj;
		mesh3.position.set(0.0, 0.0, -1.0);
        scene.add(mesh3);


        const axis = new THREE.AxesHelper();
        mesh3.add(axis);

        sistema.add(mesh3);
    })

    loader.load('../resources/Models/dragon.obj', function (obj) {
        var material = new THREE.MeshBasicMaterial({color: 0xAAAAFF, wireframe: true});
    
        obj.children.forEach(function (child) {
            child.material = material;
            });
    
        mesh4 = obj;
		mesh4.position.set(0.0, 0.0, 1.0);
        scene.add(mesh4);


        const axis = new THREE.AxesHelper();
        mesh4.add(axis);

        sistema.add(mesh4);
    })

    const globalAxis = new THREE.AxesHelper();
    scene.add(globalAxis);
    scene.add(sistema);
}


/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function animate(time) {

	mesh.rotation.y = time * 0.001;
	mesh2.rotation.y = time * 0.001;
	mesh3.rotation.y = time * 0.001;
	mesh4.rotation.y = time * 0.001;

	sistema.rotation.y = time * 0.001;


	renderer.render(scene, camera);
	requestAnimationFrame(animate);		
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
