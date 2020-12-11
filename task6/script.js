// Global variables
const searchFormElement = document.getElementById('search-form');
const searchResultsList = document.getElementById('results-list');

/**
 * Creates a template that will contain information for each search result.
 *
 * @param {object} snippet The snippet property destructured from the searchResult object
 */
const createResultTemplate = ({ title, pageid, snippet }) => {
    const searchResultElement = document.createElement('li');
    searchResultElement.innerHTML = `
        <div class="search-result animate">
            <i class="fas fa-arrow-circle-right"></i>
            <h2><a href="https://en.wikipedia.org/?curid=${pageid}" target="_blank">${title}</a></h2>
            <p>${snippet}</p>
        </div>
    `;

    searchResultsList.appendChild(searchResultElement);
};

/**
 * Invokes the createResultTemplate for each search result
 *
 * @param {array} results An array of the search results
 */
const generateResultTemplates = (results) => {
    searchResultsList.innerHTML = '';

    if (!results.length) {
        searchResultsList.innerHTML = 'No results found.';
    }
    return results.forEach((result) => createResultTemplate(result));
};

/**
 * Fetches data from Wiki's API based on the value of the search input.
 * Generates a template for the search results based on the data received from the API.
 */
const fetchSearchData = async (event) => {
    event.preventDefault();
    searchResultsList.innerHTML =
        '<i class="fas fa-spinner fa-pulse"></i>Getting search results';

    try {
        const searchInputElement = document.getElementById('search-input');
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${searchInputElement.value}`;

        const response = await fetch(endpoint);

        if (response.ok) {
            const {
                query: { search: searchResults }
            } = await response.json();

            searchInputElement.value = '';

            const searchTitleElement = document.getElementById('search-title');
            searchTitleElement.innerText = searchInputElement.value;

            generateResultTemplates(searchResults);
        }
    } catch {
        searchResultsList.innerHTML =
            'Something went wrong. Please try again later.';
    }
};

searchFormElement.addEventListener('submit', fetchSearchData);
