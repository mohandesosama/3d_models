// Function to fetch partials from HTML files
function fetchPartial(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null, xhr.responseText); // Call the callback function with the responseText
            } else {
                callback(new Error('Failed to fetch partial: ' + xhr.status), null); // Call the callback function with an error
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Function to render header, footer, and other content
function renderPageContent() {
    //this part of the code is added because the index page is put outside
    //the page folder which contains all pages.
    var header_page_path = isIndexPage() ? './pages/header.html' : './header.html';
    var footer_page_path = isIndexPage() ? './pages/footer.html' : './header.html';

    // Fetch header partial
    fetchPartial(header_page_path, function (error, headerHtml) {
        if (error) {
            console.error('Error fetching header partial:', error);
            return;
        }
        // Register header partial
        Handlebars.registerPartial('header', headerHtml);

        // Render header template
        var headerTemplate = Handlebars.compile('<header>{{> header}}</header>');
        document.querySelector('header').innerHTML = headerTemplate();

        // Fetch footer partial
        fetchPartial(footer_page_path, function (error, footerHtml) {
            if (error) {
                console.error('Error fetching footer partial:', error);
                return;
            }
            // Register footer partial
            Handlebars.registerPartial('footer', footerHtml);

            // Render footer template
            var footerTemplate = Handlebars.compile('<footer>{{> footer}}</footer>');
            document.querySelector('footer').innerHTML = footerTemplate();

            // After rendering header and footer, render the user content
            renderUserContent();
            //check if you are calling from the index page or other pages. 
            isIndexPage() ? addCSS('css/header_footer.css') : addCSS('../css/header_footer.css');
        });
    });
}

// Function to render user content
function renderUserContent() {
    const user_email = localStorage.getItem("email");
    const userElement = document.getElementById("user_email");
    const loginLink = document.getElementById("loginLink");

    if (userElement) {
        if (user_email === "" || user_email === null) {
            userElement.innerText = "Welcome guest";
            if (loginLink) {
                loginLink.innerText = "Login";
                loginLink.href = "./pages/login.html"; // Set the href attribute to the login page
            }
        } else {
            userElement.innerText = user_email;
            if (loginLink) {
                loginLink.innerText = "Logout";
                loginLink.onclick = logout; // Add a JavaScript function call for logout
            }
        }
    } else {
        console.error("User element not found");
    }
}

// Logout function
function logout() {
    localStorage.clear();
    window.location.href = "./index.html"; // Redirect to the main page
}


function isIndexPage() {
    // Get the path of the current URL
    var path = window.location.pathname;
    console.log(path)
    // Check if the path corresponds to the root directory
    return path === '/' || path.endsWith("index.html") || path.endsWith("3d_models/");
}


//instaead of adding a line at the beginning of each new page
// Function to add CSS style
function addCSS(cssFile) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssFile;
    document.head.appendChild(link);
}

// Render header, footer, and other content
renderPageContent();
