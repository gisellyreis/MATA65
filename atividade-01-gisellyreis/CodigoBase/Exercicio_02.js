import * as THREE from '../resources/threejs/build/three.module.js';

function main() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	var camera = new THREE.OrthographicCamera( -1.5, 1.5, 1.5, -1.5, -1.0, 1.0 );
	scene.add( camera );

    const positions = [];
    const indexes = [];

    positions.push( 0.5,  0.3, 0.0);
    positions.push(-0.8, -0.5, 0.0);
    positions.push( 0.5, -0.5, 0.0);

    indexes.push(0,1,2);

    const geometry = new THREE.BufferGeometry();

    geometry.setIndex(indexes);

    const colors = new Float32Array([
        1.0, 0.0, 1.0,
        1.0, 1.0, 0.0,
        0.0, 1.0, 1.0,
    ]);

    const bufAttColor = new Float32Array(colors);

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(bufAttColor, 3));

    var material = new THREE.MeshBasicMaterial({
        //color: 0xff0000,
        vertexColors:THREE.VertexColors,
		wireframe: false
    });

    var triangle = new THREE.Mesh(geometry, material);

    scene.add(triangle);
	
	renderer.clear();
	renderer.render(scene, camera);
};

main();