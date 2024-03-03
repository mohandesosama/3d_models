// Function to show progress bar
function showProgressBar(oViewer) {
    // Create a progress bar element
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.textContent = 'Loading...';

    // Append progress bar to the div
    oViewer.appendChild(progressBar);

    // Return reference to the progress bar element
    return progressBar;
}
function enableCotnrolsAndHideLablel(status,ctrls,obj_viewer){
    ctrls.enabled = status;
    //change teh mouse cursor accordingly
    if(status)
        {
            obj_viewer.addEventListener('mousedown', () => {
            obj_viewer.style.cursor = 'grabbing';
        });

        obj_viewer.addEventListener('mouseup', () => {
            obj_viewer.style.cursor = 'grab';
        });

        obj_viewer.addEventListener('mouseenter', () => {
            obj_viewer.style.cursor = 'grab';
        });

        obj_viewer.addEventListener('mouseleave', () => {
            obj_viewer.style.cursor = 'auto';
        });
        // Hide the label after the first click
        document.getElementById('label').style.display = 'none';
    }
    else{
        document.getElementById('label').style.display = 'block';
        obj_viewer.style.cursor = 'auto';
    }
}
//auto creation of the model files thumnails
function constructThumbsPanel(modelFiles, left_container,obj_viewer,ctrls, loadFunction) {
    // adding the model thumbnails
    modelFiles.forEach(function (file) {
        const modelDiv = document.createElement('div');
        modelDiv.textContent = "Click to view the model";
        // if i want to view specific model from the list of model, id of it showld be defined.
        modelDiv.id = 'models/' + file;
        modelDiv.classList.add('model-img');
        modelDiv.addEventListener('click', function () {
            loadFunction(this, 'models/' + file);
            enableCotnrolsAndHideLablel(false,ctrls,obj_viewer);
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

export {showProgressBar,constructThumbsPanel, enableCotnrolsAndHideLablel}