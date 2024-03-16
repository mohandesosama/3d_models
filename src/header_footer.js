// Function to fetch partials from HTML files
function fetchPartial(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(new Error('Failed to fetch partial: ' + xhr.status), null);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Function to render header, footer, and other content
function renderPageContent() {
    var current_path_header;
    var current_path_footer;
    if (indexPage())
    {
        current_path_header='pages/header.html';
        current_path_footer="pages/footer.html"
    }
    else
    {
        current_path_header='header.html';
        current_path_footer="footer.html"
    }
    // Fetch header partial
    fetchPartial(current_path_header, function (error, headerHtml) {
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
        fetchPartial(current_path_footer, function (error, footerHtml) {
            if (error) {
                console.error('Error fetching footer partial:', error);
                return;
            }
            // Register footer partial
            Handlebars.registerPartial('footer', footerHtml);

            // Render footer template
            var footerTemplate = Handlebars.compile('<footer>{{> footer}}</footer>');
            document.querySelector('footer').innerHTML = footerTemplate();
        });
    });
    if(indexPage())
    {
        addCSS('css/header_footer.css');
    }
    else
    {
        addCSS('../css/header_footer.css');
    }
}
function indexPage(){
    // Get the path of the current URL
    var path = window.location.pathname;

    // Check if the path ends with "index.html"
    if (path.endsWith("index.html")) {
        return true;
    } else {
        return false;
    }
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


