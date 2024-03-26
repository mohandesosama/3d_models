var obj_viewer = document.getElementById('viewer');
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
function createControlsButton(ctrls) {
    var button = document.getElementById('controlsButton');

    // If button is not created, create it
    if (!button) {
        button = document.createElement('button');
        button.setAttribute('id', 'controlsButton');
        button.textContent = 'Click to control the model';
        button.addEventListener('click', function () {
            hideButton(ctrls);
        });
        obj_viewer.appendChild(button);

        // Remove event listeners that modify cursor style
        obj_viewer.removeEventListener('mousedown', setCursorGrabbing);
        obj_viewer.removeEventListener('mouseup', setCursorGrab);
        obj_viewer.removeEventListener('mouseenter', setCursorGrab);
        obj_viewer.removeEventListener('mouseleave', setCursorAuto);

        // Set cursor style back to default
        obj_viewer.style.cursor = 'auto';

        ctrls.enabled = false;
    }
}
function hideButton(ctrls) {
    var obj_viewer = document.getElementById('viewer');
    var button = document.getElementById('controlsButton');

    // If button exists, remove it
    if (button) {
        //remove the button so the user can interact with the 3d model
        button.remove();
        //change the cursor to grab style.
        obj_viewer.addEventListener('mousedown', setCursorGrabbing);
        obj_viewer.addEventListener('mouseup', setCursorGrab);
        obj_viewer.addEventListener('mouseenter', setCursorGrab);
        obj_viewer.addEventListener('mouseleave', setCursorAuto);
        //orbit controls are enabled for the user to rotate/zoom the 3d model
        ctrls.enabled = true;
    }
}
// Event listener functions
function setCursorGrabbing() {
    obj_viewer.style.cursor = 'grabbing';
}

function setCursorGrab() {
    obj_viewer.style.cursor = 'grab';
}

function setCursorAuto() {
    obj_viewer.style.cursor = 'auto';
}
//auto creation of the model files thumnails
function constructThumbsPanel(modelFiles, left_container, ctrls, loadFunction) {
    const download_link = document.getElementById('download-link');

    // adding the model thumbnails
    modelFiles.forEach(function (file) {
        const modelDiv = document.createElement('div');
        //modelDiv.textContent = "Click to view the model";
        // if i want to view specific model from the list of model, id of it showld be defined.
        modelDiv.id = 'models/' + file;
        modelDiv.classList.add('model-img-div');
        //for the image inside the div, we shall click on it
        const imageSrc = 'models/' + file.replace('.obj','.png');
        const img = document.createElement('img');
        img.src=imageSrc;
        img.alt="Model thumbnail";
        img.classList.add("model-img");
        modelDiv.appendChild(img);

        modelDiv.addEventListener('click', function () {
            loadFunction(this, 'models/' + file);
            createControlsButton(ctrls);
            //display the download link, as the user can download it now
            download_link.style.display = 'block';
            //save the link (file path) so we will use it when we click on the link
            download_link.setAttribute('link', 'models/' + file); //create custom attribute.
            //set the cursor
        });
        left_container.appendChild(modelDiv);
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
export {showProgressBar,constructThumbsPanel}