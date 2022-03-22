import * as THREE from '../resources/threejs/build/three.module.js';

var scene 		= null;
var renderer	= null;
var camera 		= null;

function main() {

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
    renderer.setSize(window.innerHeight*0.7, window.innerHeight*0.7);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
    scene.add(camera);

    buildScene();

    renderer.clear();
    requestAnimationFrame(animate);

}

function buildScene() {

    var sphereGeo = new THREE.SphereGeometry(1.0, 10, 10);
    var sphereMat = new THREE.MeshBasicMaterial({wireframe: true});
    var solarSystem = new THREE.InstancedMesh( sphereGeo, sphereMat, 3);

    solarSystem.name = "SistemaSolar";
    solarSystem.needsUpdate = true;

    scene.add(solarSystem);

    const instanceColors = [ 0xffaa00, 0x00aa, 0xc0c0c0];

    for( let i =0; i< 3; i++) {
        solarSystem.setColorAt(i, new THREE.Color(instanceColors[i]));
    }
    
    console.log(solarSystem);
}

function animate(time) {

    var rotSol = 0.0009 * time;
    var rotTerra = 0.0007 * time;
    var rotLua = 0.0009 * time;

    var trans = new THREE.Matrix4();
    var aux = new THREE.Matrix4();

    var obj = scene.getObjectByName("SistemaSolar");

    // Sol
    trans.multiply(aux.makeScale(0.4, 0.4, 0.4));
    trans.multiply(aux.makeRotationZ(rotSol));
    obj.setMatrixAt(0, trans);

    // Terra
    trans.identity();
    trans.multiply(aux.makeTranslation(0.8, 0.0, 0.0));
    trans.multiply(aux.makeScale(0.1, 0.1, 0.1));
    trans.multiply(aux.makeRotationZ(rotTerra));

    //trans.multiply(aux.makeTranslation(8.0, 0.0, 0.0));
    trans.multiply(aux.makeRotationY(rotTerra));
    obj.setMatrixAt(1, trans);

    // Lua
    trans.identity();
    trans.multiply(aux.makeTranslation(0.8, 0.0, 0.0));
    trans.multiply(aux.makeScale(0.03, 0.03, 0.03));
    trans.multiply(aux.makeRotationZ(rotLua));

    trans.multiply(aux.makeTranslation(9.0, 0.0, 0.0));
    trans.multiply(aux.makeRotationZ(rotLua));
    obj.setMatrixAt(2, trans);

    
    obj.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}


main();