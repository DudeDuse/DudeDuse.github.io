import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//function -- initialize a scene
function initScene(containerId, modelUrl, initialPosition, isWiggling = false, orientationFix = [0, 0, 0]) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(document.getElementById(containerId).clientWidth, document.getElementById(containerId).clientHeight);
    document.getElementById(containerId).appendChild(renderer.domElement);

    //disable controls to keep it static
    let controls = null;
    if (containerId !== 'header-scene') { //header!!
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
    }

    //lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xA4A4A4, 1);
    scene.add(ambientLight);

    //clock for animations
    const clock = new THREE.Clock();

    //loading the model
    const loader = new GLTFLoader();
    loader.load(
        modelUrl,
        (gltf) => {
            const model = gltf.scene;
            model.position.set(...initialPosition); // Adjust model position as needed
            model.scale.set(0.8, 0.8, 0.8); // Adjust model scale as needed
            model.rotation.set(...orientationFix);
            scene.add(model);

            //animation loop
            function animate() {
                requestAnimationFrame(animate);

                if (isWiggling) {
                    const elapsedTime = clock.getElapsedTime();
                    model.position.y = initialPosition[1] + Math.sin(elapsedTime * 4) * 40; // Wiggling effect on the Y-axis
                    model.position.x = initialPosition[0] + Math.cos(elapsedTime * 2) * 20; // Wiggling effect on the X-axis
                } else {
                    model.rotation.y += 0.01; // Rotation for non-header models
                }

                if (controls) controls.update();
                renderer.render(scene, camera);
            }
            animate();
        },
        undefined,
        (error) => {
            console.error('An error occurred loading the model:', error);
        }
    );

    //initial camera position
    camera.position.z = 150;
}

//initializing the header scene with SIN
initScene('header-scene', 'title-Mesh2/title.gltf', [100, -500, -500], true, [0, Math.PI, 0]); //orientationFix was just to flip this one over

//initializing body scene with rotation
initScene('body-scene', 'computer-Mesh/computer.gltf', [0, 0, -100], false);

//resizing
window.addEventListener('resize', () => {
    document.querySelectorAll('canvas').forEach((canvas) => {
        const container = canvas.parentElement;
        const renderer = canvas.renderer;
        const camera = canvas.camera;
        if (renderer && camera) {
            renderer.setSize(container.clientWidth, container.clientHeight);
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
        }
    });
});

