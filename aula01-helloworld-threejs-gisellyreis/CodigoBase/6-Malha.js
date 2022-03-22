// Desenhando uma malha de triangulos em Three.js

import * as THREE from '../resources/threejs/build/three.module.js';

function main() {

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(500, 500);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	var scene = new THREE.Scene();

	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	var numVertices = 6;
	var dx = 1.6/(numVertices-1);

	const positions = [];
	const indices	= [];

	for (var x = -0.8 ; x <= 0.8; x+= dx)  
		for (var y = -0.8 ; y <= 0.8 ; y+= dx) 
			positions.push( x,  y, 0.0 );
	
	var countFaces=0;
	for (var i = 0 ; i < numVertices-1 ; i++) 
		for (var j = 0 ; j < numVertices-1 ; j++) {

			indices.push( i*numVertices+j, (i+1)*numVertices+j, (i+1)*numVertices+j+1 ); 
			countFaces++;
		
			indices.push( i*numVertices+j, (i+1)*numVertices+(j+1), i*numVertices+(j+1) ); 
			countFaces++;
			}

	const triangleGeometry = new THREE.BufferGeometry();

	triangleGeometry.setIndex( indices );
	triangleGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );

	var triangleMaterial = new THREE.MeshBasicMaterial({ 
		// vertexColors:THREE.VertexColors,
		wireframe:true
		}); 
	
	var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 

	scene.add( triangleMesh );	
		
	renderer.clear();
	renderer.render(scene, camera);
	};

main();
