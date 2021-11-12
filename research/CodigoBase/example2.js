import * as THREE from '../resources/threejs/build/three.module.js';
import { OrbitControls }	from '../resources/threejs/examples/jsm/controls/OrbitControls.js';

var scene 		= null;
var renderer	= null;
var camera 		= null;
var controls = null;

var sphere;
var sphere2;
var sphere3;

var raycaster = null;
var clickMouse = null; 
var moveMouse = null;
var obj = null;
var movein = false;

function main() {
    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //camera.position.set(-35, 70, 70);
    camera.position.z = 70;
    camera.lookAt(new THREE.Vector3(0,0,0));

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);


    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);

    // controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 1000;


    raycaster = new THREE.Raycaster();
    clickMouse = new THREE.Vector2();  
    moveMouse = new THREE.Vector2();   


    buildScene();

    renderer.clear();
    requestAnimationFrame(animate);

}

function buildScene() {
    const geometry = new THREE.SphereGeometry(10,10,10);
    const material = new THREE.MeshNormalMaterial({wireframe: true});
    sphere = new THREE.Mesh(geometry, material);
    sphere.name = 'sphere1';
    scene.add(sphere);

    const geometry2 = new THREE.SphereGeometry(10,10,10);
    const material2 = new THREE.MeshNormalMaterial({wireframe: true});
    sphere2 = new THREE.Mesh(geometry2, material2);
    sphere2.position.x = 40;
    sphere2.name = 'sphere2';
    scene.add(sphere2);

    const geometry3 = new THREE.SphereGeometry(10,10,10);
    const material3 = new THREE.MeshNormalMaterial({wireframe: true});
    sphere3 = new THREE.Mesh(geometry3, material3);
    sphere3.position.x = -40;
    sphere3.name = 'sphere3';
    scene.add(sphere3);


    // interaction
    window.addEventListener('click', event => { 
        // THREE RAYCASTER
        clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
        var found = intersect(clickMouse);
        if (found.length == 0) {
            $(".card").empty();
            $(".popup").hide();
        }
        else {
            //console.log(found[0].object);
            obj = found[0].object;
            $(".card").empty();
            $(".popup").append("<div class='card' style='width: 18rem;'><div class='card-body'><h5 class='card-title'>"+ obj.name +"</h5><h6 class='card-subtitle mb-2 text-muted'></h6><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p></div></div>");
            $(".popup").show();
        }
        
    })


   /*  window.addEventListener('mousemove', event => { 
        if (!movein) {
            // THREE RAYCASTER
            moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
            var found = intersect(moveMouse);
            if (!(found[0] == 'undefined' || found.length < 1)) {
                obj = found[0].object;
                obj.scale.set(5,5,5);
                //console.log(obj);
            }
            movein = true;
        }
        else {
            // THREE RAYCASTER
            moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
            var found = intersect(moveMouse);
            if (!(found[0] == 'undefined' || found.length < 1)) {
                obj = found[0].object;
                obj.scale.set(1,1,1);
            }
            movein = false;
        }
        
    }) */
    
}

function intersect(pos) {
    raycaster.setFromCamera(pos, camera);
    return raycaster.intersectObjects(scene.children);
}

function animate(time) {

    sphere.rotation.x += 0.02;
    sphere.rotation.y += 0.02;

    sphere2.rotation.x += 0.02;
    sphere2.rotation.y += 0.02;

    sphere3.rotation.x += 0.02;
    sphere3.rotation.y += 0.02;
   
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}

main();