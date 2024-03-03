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

//auto creation of the model files thumnails
function constructThumbsPanel(modelFiles, left_container, loadFunction) {
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
            loadFunction(this, 'models/' + file);
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

export {showProgressBar,constructThumbsPanel}