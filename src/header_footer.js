// Define partials
var headerPartial = `
<nav>
    <a href="#">3D Models</a>
    <a href="#">2D Sketches</a>
    <a href="#">School Projects</a>
    <a href="#">Freehand Drawings</a>
    <a href="#">Hobbies</a>
    <a href="#">Contacts</a>
    <form class="search-form" action="pages/search_results.html" method="GET">
        <input type="hidden" name="q" id="searchQuery">
        <input type="text" class="search-input" id="searchInput" autocomplete="false" placeholder="Search...">
        <button type="submit" class="search-button">Search</button>
    </form>
</nav>
`;
var footerPartial = `
&copy; 2024 Designed by: Osama Hosameldeen 
`;

// Register partials
Handlebars.registerPartial('header', headerPartial);
Handlebars.registerPartial('footer', footerPartial);

// Render templates
var headerTemplate = Handlebars.compile('<header>{{> header}}</header>');
var footerTemplate = Handlebars.compile('<footer>{{> footer}}</footer>');

document.querySelector('header').innerHTML = headerTemplate();
document.querySelector('footer').innerHTML = footerTemplate();