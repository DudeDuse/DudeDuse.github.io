import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//initializing Three.js for the header
function initHeaderScene() {
    const container = document.getElementById('threejs-header');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000); //100 is height thing
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    renderer.setClearColor(0x7893e0, 1); 
    
    
        //lighting
    const light = new THREE.DirectionalLight(0xbcf5fe, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0x9dc8fd, 1);
    scene.add(ambientLight);

    //loading the model
    const loader = new GLTFLoader();
    loader.load(
        'files/titlepixel-Mesh3/title.gltf',
        (gltf) => {
            const model = gltf.scene;
            model.position.set(0, -50, -70); // Adjust position
            model.scale.set(0.5, 0.5, 0.5);
            model.rotation.set(0, Math.PI, 0);
            scene.add(model);

            //wiggling effect
            const clock = new THREE.Clock();
            function animate() {
                requestAnimationFrame(animate);

                const elapsedTime = clock.getElapsedTime();
                model.position.y = -50 + Math.sin(elapsedTime * 1) * 10; //up down of wiggle
                model.position.x = 50 + Math.cos(elapsedTime * 1) * 10; //left right
                renderer.render(scene, camera);
            }
            animate();
        },
        undefined,
        (error) => {
            console.error('An error occurred loading the model:', error);
        }
    );

    //parallax effect
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;
        camera.position.z = 5 + scrollY * 0.2; //multiplier for parallax speed
    });

    //camera position
    camera.position.z = 5;

    //for resizing
    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
}

initHeaderScene();

