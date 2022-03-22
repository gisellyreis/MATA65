import * as THREE from '../resources/threejs/build/three.module.js';

var scene 		= null;
var renderer	= null;
var camera 		= null;


function main() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
    renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
    scene.add(camera);

    buildScene();

    renderer.clear();
    requestAnimationFrame(animate);

}

function buildScene() {

    // Sistema 1
    var sistema = new THREE.Object3D();
    sistema.name = "Sistema";

    // Sistema 2
    var sistema2 = new THREE.Object3D();
    sistema2.name = "Sistema2";


    // Sol
    var sAxis = new THREE.AxesHelper(0.5);
    var sphereGeo = new THREE.SphereGeometry(0.4, 15, 15);
    var sphereMat = new THREE.MeshBasicMaterial({color: 0xffaa00, wireframe: true});
    var sun = new THREE.Mesh(sphereGeo, sphereMat);
    sun.name = "Sol";
    sun.add(sAxis);

    // Terra
    var tAxis = new THREE.AxesHelper(0.15);
    sphereGeo = new THREE.SphereGeometry(0.1, 10, 10);
    sphereMat = new THREE.MeshBasicMaterial({color: 0x00aa, wireframe: true});
    var earth = new THREE.Mesh(sphereGeo, sphereMat);
    earth.name = "Terra";
    earth.add(tAxis);

    // Lua
    var lAxis = new THREE.AxesHelper(0.04);
    sphereGeo = new THREE.SphereGeometry(0.03, 8, 8);
    sphereMat = new THREE.MeshBasicMaterial({color: 0xc0c0c0, wireframe: true});
    var moon = new THREE.Mesh(sphereGeo, sphereMat);
    moon.name = "Lua";
    moon.add(lAxis);

    moon.matrixAutoUpdate = false;
    moon.matrixWorld.identity();

    earth.matrixAutoUpdate = false;
    earth.matrixWorld.identity();

    sun.matrixAutoUpdate = false;
    sun.matrixWorld.identity();

    sistema.matrixAutoUpdate = false;
    sistema.matrixWorld.identity();
    
    sistema.add(moon);
    sistema.add(earth);
    
    sistema2.add(sistema);
    
    scene.add(sun);
    scene.add(sistema);
    scene.add(sistema2);

}

function animate(time) {

    let rotSun = 0.005;         // Rtação do Sol ao redor de seu eixo em radiandos
    let rotTerra 	= 0.09;		// Rotação da Terra ao redor de seu eixo em radianos
	let rotLua 		= 0.01;		// Rotação da Lua ao redor da Terra em radianos

    //let pTerra 	= new THREE.Vector3(0.15, 0.15, 0.0);
    let pLua 	= new THREE.Vector3(0.0, 0.4, 0.0);

    var trans = new THREE.Matrix4();
    var trans2 = new THREE.Matrix4();
    var rot = new THREE.Matrix4();
    var rotTrans = new THREE.Matrix4();
    var rotTrans2 = new THREE.Matrix4();

    trans.makeTranslation(0.5, 0.8, 0);
    trans2.makeTranslation(0, 0.5, 0);
    rot.makeRotationZ(Math.PI * time * 0.0001);
    rotTrans.multiply(rot);
    rotTrans.multiply(trans);
    
    rotTrans.multiply(rot);
    rotTrans2.multiply(trans2);


    var obj;

    obj = scene.getObjectByName("Sol");
    obj.rotateZ(rotSun);
    obj.updateMatrix();

    obj = scene.getObjectByName("Terra");
    obj.rotateY(rotTerra);
    //obj.position.copy(pTerra);
    obj.updateMatrix();

    obj = scene.getObjectByName("Lua");
    obj.rotateX(rotLua);
    obj.position.copy(pLua);
    obj.updateMatrix();

    obj = scene.getObjectByName("Sistema");
    obj.matrix.copy(rotTrans);

    obj = scene.getObjectByName("Sistema2");
    obj.matrix.copy(rotTrans2);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}

main();