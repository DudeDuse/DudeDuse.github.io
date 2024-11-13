import * as THREE from 'three';
/*new gltf stuff*/
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
//new
//const renderer = new THREE.WebGLRenderer({antialias: true});
//renderer.setPixelRatio(window.devicePixelRatio);
//

renderer.setSize( window.innerWidth, window.innerHeight ); //api for rendering/processing
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
    renderer.setClearColor(0x00ffff, 1); 
    renderer.gammaOutput = true;

//new
/*renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;*/


//light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
scene.add(ambientLight);



/*new gltf stuff -- orbit controls let's user move it around*/
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

let model; //define global variable to store model

    loader.load(
        // Resource URL
        'mugtest/mug.gltf',
        // Called when the resource is loaded
         function ( gltf ) {
         	model = gltf.scene
             scene.add( model );
             camera.position.z = 300;
         },

         // Called when loading is in progresses
         function ( xhr ) {
             console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

         },

         // Called when loading has errors
         function ( error ) {
             console.log( 'An error happened' );
         }
     );




/*const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/

//camera.position.z = 5;

function animate() {

	requestAnimationFrame(animate);
	//model.rotation.x += 0.01;
	model.rotation.y += 0.01;

	renderer.render( scene, camera );

}

//animate();