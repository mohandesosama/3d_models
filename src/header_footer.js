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
    //this part of the code is added becasue index page is put outside
    //the page folder which contains all pages.
    var header_page_path = indexPage() ? 'pages/header.html' : 'header.html';
    var footer_page_path = indexPage() ? 'pages/footer.html' : 'footer.html';

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
        });
    });
    //check if you are calling from the index page or other pages. 
    indexPage() ? addCSS('css/header_footer.css') : addCSS('../css/header_footer.css');
}
function indexPage() {
    // Get the path of the current URL
    var path = window.location.pathname;

    return path.endsWith("index.html") ? true:false;
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


