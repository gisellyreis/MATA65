import * as THREE from '../resources/threejs/build/three.module.js';
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

var scene 		= null;
var renderer	= null;
var camera 		= null;
var controls 	= null;
var raycaster = null;
var clickMouse = null; 
var moveMouse = null;
var draggable = null;

function main() {
    // camera
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
    camera.position.set(-35, 70, 100);
    camera.lookAt(new THREE.Vector3(0,0,0));

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // WINDOW RESIZE HANDLING
    window.addEventListener('resize', onWindowResize);

    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);

    // controls
    controls = new OrbitControls(camera, renderer.domElement);

    // lights
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.20);
    scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-30, 50, -30);
    scene.add(dirLight);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.left = -70;
    dirLight.shadow.camera.right = 70;
    dirLight.shadow.camera.top = 70;
    dirLight.shadow.camera.bottom = -70;


    //
    raycaster = new THREE.Raycaster();
    clickMouse = new THREE.Vector2();  
    moveMouse = new THREE.Vector2();   
    draggable = new THREE.Object3D;

    buildScene();

    renderer.clear();
    requestAnimationFrame(animate);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function buildScene() {
    // floor
    var pos = { x: 0, y: -1, z: 3 };
    var scale = { x: 100, y: 2, z: 100 };

    var blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(),
        new THREE.MeshPhongMaterial({ color: 0xf9c834 }));
    blockPlane.position.set(pos.x, pos.y, pos.z);
    blockPlane.scale.set(scale.x, scale.y, scale.z);
    blockPlane.castShadow = true;
    blockPlane.receiveShadow = true;
    scene.add(blockPlane);
    blockPlane.userData.ground = true

    
    // box
    var scale = { x: 6, y: 6, z: 6 }
    var pos = { x: 15, y: scale.y / 2, z: 15 }
  
    var box = new THREE.Mesh(new THREE.BoxBufferGeometry(), 
        new THREE.MeshPhongMaterial({ color: 0xDC143C }));
    box.position.set(pos.x, pos.y, pos.z);
    box.scale.set(scale.x, scale.y, scale.z);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box)
    box.userData.draggable = true
    box.userData.name = 'BOX'
    box.name = 'BOX'
   // console.log(box);


    // sphere
    var radius = 4;
    var pos = { x: 15, y: radius, z: -15 };
  
    var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, 32, 32), 
        new THREE.MeshPhongMaterial({ color: 0x43a1f4 }))
    sphere.position.set(pos.x, pos.y, pos.z)
    sphere.castShadow = true
    sphere.receiveShadow = true
    scene.add(sphere)
    sphere.userData.draggable = true
    sphere.userData.name = 'SPHERE'
    sphere.name = 'SPHERE'


    // cylinder
    var radius = 4;
    var height = 6
    var pos = { x: -15, y: height / 2, z: 15 };

    // threejs
    var cylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius, radius, height, 32), new THREE.MeshPhongMaterial({ color: 0x90ee90 }))
    cylinder.position.set(pos.x, pos.y, pos.z)
    cylinder.castShadow = true
    cylinder.receiveShadow = true
    scene.add(cylinder)

    cylinder.userData.draggable = true
    cylinder.userData.name = 'CYLINDER'
    cylinder.name = 'CYLINDER'


    // interaction
    window.addEventListener('click', event => {
        if (draggable != null) {
          console.log(`dropping draggable ${draggable.userData.name}`)
          draggable = null;
          return;
        }
      
        // THREE RAYCASTER
        clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
        var found = intersect(clickMouse);
        if (found.length > 0) {
          if (found[0].object.userData.draggable) {
            draggable = found[0].object
            console.log(`found draggable ${draggable.userData.name}`)
          }
        }
    })

    window.addEventListener('mousemove', event => {
        moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

}

function intersect(pos) {
    raycaster.setFromCamera(pos, camera);
    return raycaster.intersectObjects(scene.children);
}

function dragObject() {
    if (draggable != null) {
      var found = intersect(moveMouse);
      if (found.length > 0) {
        for (let i = 0; i < found.length; i++) {
          if (!found[i].object.userData.ground)
            continue
          
          var target = found[i].point;
          draggable.position.x = target.x
          draggable.position.z = target.z
        }
      }
    }
}

function animate(time) {
    dragObject();
   
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}

main();