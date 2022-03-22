import * as THREE from '../resources/threejs/build/three.module.js';

function main() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	var camera = new THREE.OrthographicCamera( -1.5, 1.5, 1.5, -1.5, -1.0, 1.0 );
	scene.add( camera );

	var numVertices = 5;
	var dx = 1.5/(numVertices-1);

	const positions = [];
	const indexes = [];

	for (var x = -0.8; x <= 0.8; x+= dx) {
		for (var y = -0.8; y <= 0.8; y += dx)
			positions.push(x, y, 0.0);
	}

	
	var countFaces = 0;
	for (var i = 0; i < numVertices-1; i++) {
		for (var j = 0; j < numVertices-1; j++) {
			indexes.push(i*numVertices+j, (i+1)*numVertices+j, (i+1)*numVertices+j+1);
			countFaces++;
			
			
			indexes.push(i*numVertices+j, (i+1)*numVertices+(j+1), i*numVertices+(j+1));
			countFaces++;

			indexes.push(i*numVertices+j, i*numVertices+(j+1), (i+1)*numVertices+j);
			countFaces++;
		}
	}
	
	
	const geometry = new THREE.BufferGeometry();

	geometry.setIndex(indexes);
	geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

	var material = new THREE.MeshBasicMaterial({
		// vertexColors:THREE.VertexColors,
		wireframe:true
	});

	var triangle = new THREE.Mesh(geometry, material);

	scene.add(triangle);

	
	renderer.clear();
	renderer.render(scene, camera);
};

main();