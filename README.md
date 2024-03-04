# 3D Model Viewer
## Introduction 
The 3D model viewer is just a javascript website to display the models of my son. My son Mohammed Osama created lots of 3D models using Fusion 360. He asked me to create a website for him to show up his works. I used Three.js library to load the models and show them on the html site. I mainly used javascript didn't use JQuery as the site is very simple. 
## How it is implemented
The site contains a folder with the obj models. I used javascript to load those models to the site and then rendered those models using Three.js library. 
## Challenges
### Sync problem in model loading.
The model takes an essential time to load especially with extensive mesh. The site has the ability to load multiple models. With many thumb images, one image for each model, you can click on the model thumb image to load it in the display area. User can click quickly and swap between models. The user can be fast enough so the current loading of the model is interrupted by a new loading of another model resulting in partially loading parts of each model !!
The scenario happens becasue apparently the browser gives the new model to a new thread, but becasue both of them are loading into the same displaly area, the problem happens. 
To solve this problem, I used mutex lock learned from Opearting Systems course. The flag is raised when a thread starts to load the model, when another thread wants to load at the same time, it can't as the flag is still raised. the second theread can only load its model only if the flag is down. the code is shown here as a reference. 
```JavaScript
        let loadingModel = false; // Variable to track whether a model is currently being loaded

        function loadModel(div, modelPath) {
            // Set loadingModel flag to true to indicate that a model is being loaded
            loadingModel = true;
            // Load the OBJ file
            const loader = new THREE.OBJLoader();
            loader.load(modelPath, function (object) {
                // Remove progress bar
                objViewer.removeChild(progressBar);
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
                // Reset loadingModel flag to false after the model is loaded
                loadingModel = false;
            });
        }
```
loadingModel represents the flag. The new thread can start loading only if the flag is false.
### Modularity
I used some parts of the code from chatGPT, thanks to chatGPT as it helps me a lot !!. The problem is, the created code has a function that calls another function which in turn calls another function. The last function in this deep 3 levels should appear in in the first level, not in the third level. Becasue the third function has code that related to 3D model viewing with Three.js library which should appear in the main js file. 
To solve this problem, I put the third function in the first level, then i separted the second and third fucntions into separte js file. then I manually passed the first level function (thrid in this case) as a parmeter to the other two functions. 
```JavaScript
 constructThumbsPanel(data, thum_container,controls,loadModel);

```
In the above example, loadModel is the first level function, it was the third level before passing it a prameter throug the second level function constructThumbsPanel. 
