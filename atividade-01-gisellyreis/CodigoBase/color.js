import * as THREE from '../resources/threejs/build/three.module.js';

function main() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	var camera = new THREE.OrthographicCamera( -1.5, 1.5, 1.5, -1.5, -1.5, 1.5 );
	scene.add( camera );

// *************************************************
// Geometria com apenas informações dos vértices 
// *************************************************	
	const vertices = new Float32Array(	[ 	-1.0,  0.5, 0.0, 
											-0.5, -0.5, 0.0,
											 0.0,  0.5, 0.0,
											 0.5, -0.5, 0.0,
											 1.0,  0.5, 0.0 
										] ); 

	var geometry = new THREE.BufferGeometry();

	geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
	
	var line = new THREE.Line(geometry);
	scene.add( line );	
	
// *************************************************
// Geometria com informações dos vértices e cores 
// *************************************************	

	var geoColor = new THREE.BufferGeometry(); 

	const bufAttrPos = new Float32Array	(	[	-1.0,  0.75, 0.0, 
												-0.5, -0.25, 0.0,
												 0.0,  0.75, 0.0,
												 0.5, -0.25, 0.0, 
												 1.0,  0.75, 0.0 
											] );

	geoColor.setAttribute( 'position', new THREE.Float32BufferAttribute( bufAttrPos, 3 ) );

	var matColor = new THREE.LineBasicMaterial({color:0xff0000});

	var lineColor = new THREE.Line(geoColor, matColor);
	
	scene.add( lineColor );	
	
// **************************************************************
// Geometria com informações dos vértices e uma cor por vértice 
// **************************************************************	
	const colorPerVert = new Float32Array	(	[	1.0, 0.0, 0.0, 
													0.0, 1.0, 0.0,
												 	1.0, 1.0, 1.0,
												 	0.0, 0.0, 1.0, 
												 	1.0, 0.0, 1.0 
											] );

	const bufAttrColor = new Float32Array(colorPerVert);

	var geoColorPerVert = new THREE.BufferGeometry(); 

	geoColorPerVert.setAttribute( 'position', new THREE.Float32BufferAttribute( bufAttrPos, 3 ) );
	geoColorPerVert.setAttribute( 'color', new THREE.Float32BufferAttribute( bufAttrColor, 3 ) );

	var matColorPerVert = new THREE.LineBasicMaterial( { 	
								linewidth: 2.0,
								vertexColors: true } 
								);
	
	var lineColorPerVert = new THREE.Line(geoColorPerVert, matColorPerVert);
	lineColorPerVert.translateY(-0.5);
	
	scene.add( lineColorPerVert );	
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	renderer.clear();
	renderer.render(scene, camera);
};

main();