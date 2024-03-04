// Function to show progress bar
export function showProgressBar(oViewer) {
    // Create a progress bar element
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.textContent = 'Loading...';

    // Append progress bar to the div
    oViewer.appendChild(progressBar);

    // Return reference to the progress bar element
    return progressBar;
}
export function createControlsButton(ctrls) {
    var button = document.getElementById('controlsButton');
    
    // If button is not created, create it
    if (!button) {
      button = document.createElement('button');
      button.setAttribute('id', 'controlsButton');
      button.textContent = 'Click to control the model';
      button.addEventListener('click', function() {
        hideButton(ctrls);
      });
      var obj_viewer = document.getElementById('viewer');
      obj_viewer.appendChild(button);
      obj_viewer.style.cursor = 'auto';
      ctrls.enabled=false;
    }
  }
  function hideButton(ctrls) {
    var obj_viewer=document.getElementById('viewer');
    var button = document.getElementById('controlsButton');
    
    // If button exists, remove it
    if (button) {
      button.remove();

      ctrls.enabled=true;
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
      
    }
  }
  
//auto creation of the model files thumnails
export function constructThumbsPanel(modelFiles, left_container,ctrls, loadFunction) {
    const download_link=document.getElementById('download-link')
    // adding the model thumbnails
    modelFiles.forEach(function (file) {
        const modelDiv = document.createElement('div');
        modelDiv.textContent = "Click to view the model";
        // if i want to view specific model from the list of model, id of it showld be defined.
        modelDiv.id = 'models/' + file;
        modelDiv.classList.add('model-img');
        modelDiv.addEventListener('click', function () {
            loadFunction(this, 'models/' + file);
            createControlsButton(ctrls);
            download_link.style.display='block';
            download_link.setAttribute('link', 'models/' + file); //create custom attribute.
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