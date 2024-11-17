import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//initializing three.js for the background
function initBackgroundScene() {
    const container = document.getElementById('threejs-bg');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(300, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    //loading the GLTF model
    const loader = new GLTFLoader();
    loader.load(
        'files/computer-Mesh/computer.gltf',
        (gltf) => {
            const model = gltf.scene;
            model.position.set(-150, 0, 0); //position
            model.scale.set(0.8, 0.8, 0.8); //scale
            scene.add(model);

            //animating rotation
            const clock = new THREE.Clock();
            function animate() {
                requestAnimationFrame(animate);

                const elapsedTime = clock.getElapsedTime();
                model.rotation.y = elapsedTime * 0.5; // rotate
                renderer.render(scene, camera);
            }
            animate();
        },
        undefined,
        (error) => {
            console.error('An error occurred loading the model:', error);
        }
    );

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;
        camera.position.z = 200 + scrollY * 0.05; //parallax effect
    });

    // Handle resizing
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    //initial camera position
    camera.position.z = 200;
}

initBackgroundScene();

