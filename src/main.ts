import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

// Use MeshStandardMaterial for more realistic lighting
const material = new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.45, roughness: 0.65 });

const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Add a point light to the scene
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
pointLight.distance = 1000; // Set the distance of the light
pointLight.power = 1000; // Set the power of the light
scene.add(pointLight);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
