// Mapeamento de Texturas 

import * as THREE           from '../resources/threejs/build/three.module.js';
import { OrbitControls }    from '../resources/threejs/examples/jsm/controls/OrbitControls.js';
import { GUI }              from '../resources/threejs/examples/jsm/libs/dat.gui.module.js'

var renderer        = null;
var scene           = null;
var camera          = null;
var control         = null;
var params          = null;
var cameraControl   = null;
var malhaPlaneta    = null;
var planetaMat      = [];

const planetas =    {   MERCURIO    : 0,
                        VENUS       : 1,
                        TERRA       : 2,
                        MARTE       : 3,
                        JUPITER     : 4,
                        SATURNO     : 5,
                        URANO       : 6,
                        NETUNO      : 7,
                        SOL         : 8,
                        LUA         : 9,
                    }

var texturas    =   [   "../resources/Textures/mercurymap.jpg",
                        "../resources/Textures/venusmap.jpg",
                        "../resources/Textures/earthmap4k.jpg",
                        "../resources/Textures/marsmap2k.jpg",
                        "../resources/Textures/jupitermap.jpg",
                        "../resources/Textures/saturnmap.jpg",
                        "../resources/Textures/neptunemap.jpg",
                        "../resources/Textures/uranusmap.jpg",
                        "../resources/Textures/sunmap.jpg",
                        "../resources/Textures/moonmap2k.jpg"
                    ]

var gui             = new GUI();

function main() {

    var clock = new THREE.Clock();

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 40;
    camera.lookAt(scene.position);
    cameraControl = new OrbitControls(camera, renderer.domElement);

    createPlanetsMaterial();
    initGUI();

    // cria esfera dos planetas
    var sphereGeometry  = new THREE.SphereGeometry(15, 60, 60);
    malhaPlaneta        = new THREE.Mesh(sphereGeometry, planetaMat[planetas.MERCURIO]);
    malhaPlaneta.name   = "planeta";
    scene.add(malhaPlaneta);

    // Luz ambiente
    var ambientLight    = new THREE.AmbientLight(0x111111);
    ambientLight.name   = 'ambient';
    scene.add(ambientLight);

    // Luz do sol
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set( 3, 3, 3 ).normalize();
    directionalLight.name = 'directional';
    scene.add(directionalLight);

    render();
}

function createPlanetsMaterial() {

    var planetasTexturas = [];
    
    var textureLoader   = new THREE.TextureLoader();

    for (var i = planetas.MERCURIO ; i <= planetas.LUA ; i++)
        planetasTexturas[i] = textureLoader.load(texturas[i]);

    for (i = planetas.MERCURIO ; i <= planetas.LUA ; i++)
        planetaMat[i]   = new THREE.MeshPhongMaterial( { map : planetasTexturas[i]});
}

function render() {

    cameraControl.update();

	malhaPlaneta.rotation.y+=0.0005;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

function initGUI() {    
    params =    {   planeta : "Mercurio"
                };

    gui.add( params, 'planeta', [   "Mercurio", 
                                    "Venus", 
                                    "Terra", 
                                    "Marte",
                                    "Jupiter",
                                    "Saturno",
                                    "Netuno",
                                    "Urano",
                                    "Lua", 
                                    "Sol" ] ).onChange(mudaPlaneta);
    gui.open();
};

function mudaPlaneta() {
    var obj = scene.getObjectByName("planeta");

    switch (params.planeta) {
        case "Mercurio" :   obj.material = planetaMat[planetas.MERCURIO];
                            break;

        case "Venus"    :   obj.material = planetaMat[planetas.VENUS];
                            break;

        case "Terra"    :   obj.material = planetaMat[planetas.TERRA];
                            break;

        case "Marte"    :   obj.material = planetaMat[planetas.MARTE];
                            break;

        case "Jupiter"  :   obj.material = planetaMat[planetas.JUPITER];
                            break;

        case "Saturno"  :   obj.material = planetaMat[planetas.SATURNO];
                            break;

        case "Urano"    :   obj.material = planetaMat[planetas.URANO];
                            break;

        case "Netuno"   :   obj.material = planetaMat[planetas.NETUNO];
                            break;

        case "Sol"      :   obj.material = planetaMat[planetas.SOL];
                            break;

        case "Lua"      :   obj.material = planetaMat[planetas.LUA];
                            break;
        };
};

main();
