import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff, 0);
renderer.setSize(window.innerWidth, window.innerHeight);

document.querySelector('.render-element').appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1, 
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-5, 10, 10);
orbit.update();

// Enable || Disable interaction with model
orbit.enabled = false;
orbit.enableDamping = true;


// Adding ambient light to the scene
const ambientLight = new THREE.AmbientLight(0x030E1A);
ambientLight.intensity = 8;
scene.add( ambientLight );


// Adding Directional Light to scene
const directionalLight = new THREE.DirectionalLight(0x030E1A);
directionalLight.intensity = 300;
directionalLight.position.set(1, 0, .5);
scene.add( directionalLight );



// configuring earth sphere for scene
const sphereGeometry = new THREE.SphereGeometry(4, 64, 64);

const color_map = new THREE.TextureLoader().load('assets/color_map.webp');
const normal_map = new THREE.TextureLoader().load('assets/normal_map.webp');
const ao_map = new THREE.TextureLoader().load('assets/occlusion_map.webp');
const sphereMaterial = new THREE.MeshStandardMaterial({ map: color_map, normalMap: normal_map, aoMap: ao_map });

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.scale.set(2,2,2);
sphere.rotation.z=-11;
scene.add(sphere);

sphere.position.set(0, 1, 0);


renderer.render(scene, camera);

let dampingY = 0.0005;
let dampingX = 0.0005;
function animate(time) {
    // sphere.rotation.y = -(time/2000);
    sphere.rotation.y = -(pageDist * dampingY);
    sphere.rotation.x = (pageDist * dampingX);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);