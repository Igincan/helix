import * as THREE from "three";

// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("space-canvas")?.appendChild(renderer.domElement);

// Creating stars with a spherical distribution
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = 500 + Math.random() * 1500; // stars within a shell of radius 500 to 2000
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    starVertices.push(x, y, z);
}

starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotating the starfield for dynamic effect
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

animate();

// Adjusting camera and renderer on window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
