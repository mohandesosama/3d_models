import { showProgressBar, constructThumbsPanel }  from './src/model_viewer.js'
 //handle the header and footers


//add data to search query
document.querySelector('.search-form').addEventListener('submit', function(event) {
    var searchInput = document.getElementById('searchInput').value;
    document.getElementById('searchQuery').value = searchInput;
});


const objViewer = document.getElementById('viewer');
//create a download link, hide it now as no object is viewed yet.
const download_link = document.getElementById('download-link')
download_link.innerText = "Download this model"
download_link.style.display = 'none';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, objViewer.clientWidth / objViewer.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 10); // Set camera position
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(objViewer.clientWidth, objViewer.clientHeight); // Use viewer div width and height
renderer.setClearColor("#e5e5e5"); // Set background color to white

const thum_container = document.getElementById('left-container');

// Variables to store the current model and its div container
let currentModel = null;
let currentDiv = null;
let loadingModel = false; // Variable to track whether a model is currently being loaded

function loadModel(div, modelPath) {

    // If a model is already being loaded, return
    if (loadingModel) {
        console.log("A model is already being loaded. Please wait.");
        return;
    }
    // Set loadingModel flag to true to indicate that a model is being loaded
    loadingModel = true;

    // Show progress bar
    const progressBar = showProgressBar();

    // Simulate delay with setTimeout (5 seconds in this example)
    // Load the OBJ file
    const loader = new THREE.OBJLoader();
    loader.load(modelPath, function (object) {
        // Remove progress bar
        objViewer.removeChild(progressBar);

        // Remove any previously loaded model
        if (currentModel) {
            scene.remove(currentModel);
            currentModel = null;
        }

        // Set the current div
        currentDiv = div;

        // Remove any previously selected model div
        if (currentDiv) {
            currentDiv.style.backgroundColor = ''; // Reset background color
        }

        // Load the new model
        var material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.5, // Adjust as needed
            roughness: 0.5, // Adjust as needed
            transparent: false,
            opacity: 0.8, // Adjust as needed
            envMapIntensity: 1, // Adjust as needed
            reflectivity: 0.8 // Adjust as needed
        });
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
        scene.add(object);
        currentModel = object;

        // Highlight the selected model div
        const modelDivs = document.querySelectorAll('.model-img');
        for (let i = 0; i < modelDivs.length; i++) {
            // i manually check the id
            if (modelDivs[i].id === currentDiv.id) {
                modelDivs[i].style.backgroundColor = '#999999'; // Highlight selected model div
                currentDiv = modelDivs[i];
            } else {
                modelDivs[i].style.backgroundColor = ''; // Reset other model divs
            }
        }

        // Reset loadingModel flag to false after the model is loaded
        loadingModel = false;
    },

        // Progress callback function
        async function (xhr) {
            // Calculate progress percentage
            const progress = Math.round(xhr.loaded / xhr.total * 100);
            // Update progress bar text
            progressBar.textContent = `Loading... ${progress}%`;
        },
        // Error callback function
        function (error) {
            console.error('Error loading model:', error);
            // Remove progress bar if there's an error
            objViewer.removeChild(progressBar);
            // Reset loadingModel flag to false after an error occurs
            loadingModel = false;
        });
}



const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Add directional light to the scene
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1); // Adjust position as needed
scene.add(directionalLight);

var directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(1, 0, 1); // Adjust position as needed
scene.add(directionalLight1);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
controls.enablePan = false; // Disable panning
controls.enabled = false; //initially disabled
objViewer.style.cursor = 'auto'; //set the cursor to be normal cursor

// Fetch the list of model files from the server
// next we implement this part automatically.
const data = [
    'iPhone13_1.obj',
    'iPhone13_.obj',
    'iPhone13.obj',

    // Add more filenames as needed
];
constructThumbsPanel(data, thum_container, controls, loadModel);

objViewer.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    renderer.setSize(objViewer.clientWidth, objViewer.clientHeight);
    camera.aspect = objViewer.clientWidth / objViewer.clientHeight;
    camera.updateProjectionMatrix();
});

//createControlsButton(controls);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();