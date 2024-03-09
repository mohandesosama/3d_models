// Function to fetch partials from HTML files
function fetchPartial(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
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
    // Add Handlebars.js script tag, we need this script to handle header and footer. 
    addScript('https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js');

    // Fetch header partial
    fetchPartial('header.html', function(error, headerHtml) {
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
        fetchPartial('footer.html', function(error, footerHtml) {
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
    addCSS('css/header_footer.css');
}
// Function to add CSS style
function addCSS(cssFile) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssFile;
    document.head.appendChild(link);
}
// Function to add script tag
function addScript(scriptSrc) {
    var script = document.createElement('script');
    script.src = scriptSrc;
    document.head.appendChild(script);
}
// Render header, footer, and other content
renderPageContent();
