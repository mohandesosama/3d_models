// Variables to store the current model and its div container
let currentModel = null;
let currentDiv = null;
let loadingModel = false; // Variable to track whether a model is currently being loaded

 function loadModel(div, obj_viewer, obj_scene, modelPath) {
    // Function to show progress bar
    function showProgressBar() {
        // Create a progress bar element
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.textContent = 'Loading...';

        // Append progress bar to the div
        obj_viewer.appendChild(progressBar);

        // Return reference to the progress bar element
        return progressBar;
    }

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
        obj_viewer.removeChild(progressBar);

        // Remove any previously loaded model
        if (currentModel) {
            obj_scene.remove(currentModel);
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
        obj_scene.add(object);
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
            obj_viewer.removeChild(progressBar);
            // Reset loadingModel flag to false after an error occurs
            loadingModel = false;
        });
}

//auto creation of the model files thumnails
function updateModelList(modelFiles, left_container, obj_viewer, obj_scene) {
    //adding the up button
    const upButton = document.createElement('Button');
    upButton.textContent = "Up";
    upButton.id = 'scrollUp';
    left_container.appendChild(upButton);
    // adding the model thumbnails
    modelFiles.forEach(function (file) {
        const modelDiv = document.createElement('div');
        modelDiv.textContent = "Click to view the model";
        // if i want to view specific model from the list of model, id of it showld be defined.
        modelDiv.id = 'models/' + file;
        modelDiv.classList.add('model-img');
        modelDiv.addEventListener('click', function () {
            loadModel(this, obj_viewer, obj_scene, 'models/' + file);
        });
        left_container.appendChild(modelDiv);
    });

    //adding the down button
    const downButton = document.createElement('Button');
    downButton.textContent = "Down";
    downButton.id = 'scrollDown';
    left_container.appendChild(downButton);

    // Event listeners for scroll buttons
    upButton.addEventListener('click', () => {
        left_container.scrollTop -= 10; // Adjust scroll amount as needed
    });

    downButton.addEventListener('click', () => {
        left_container.scrollTop += 10; // Adjust scroll amount as needed
    });

    let isMouseDown = false;
    let startY;

    left_container.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startY = e.clientY;
    });

    left_container.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
    left_container.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const y = e.clientY - startY;
        left_container.scrollTop += y;
    });

}

export {loadModel,updateModelList}