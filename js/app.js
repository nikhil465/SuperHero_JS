const publicKey = '7b9aa3bad9c569434c84bc0e2d02dcb8';
const privateKey = 'd0bebbe18cf526ba5f2ec3819a6d6743128c27f3';
const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey);

// Function to fetch superheroes from the Marvel API
async function fetchSuperheroes(searchQuery = '') {
    const url = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchQuery}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching superheroes:', error);
        return [];
    }
}

function isFavorite(superheroId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(superheroId);
}

function toggleFavoriteButton(button, superheroId) {
    if (isFavorite(superheroId)) {
        button.textContent = 'Remove from Favorites';
        button.classList.remove('btn-primary');
        button.classList.add('btn-danger');
    } else {
        button.textContent = 'Add to Favorites';
        button.classList.remove('btn-danger');
        button.classList.add('btn-primary');
    }
}

// Function to render superheroes on the home page
function renderSuperheroes(superheroes) {
    const superheroesContainer = document.getElementById('superheroesContainer');
    superheroesContainer.innerHTML = '';

    superheroes.forEach((superhero) => {
        const superheroCard = document.createElement('div');
        superheroCard.classList.add('col-md-4', 'mb-4');
        superheroCard.innerHTML = `
            <div class="card">
                <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" class="card-img-top" alt="${superhero.name}">
                <div class="card-body">
                    <h5 class="card-title">${superhero.name}</h5>
                </div>
            </div>
        `;

        const addFavoriteBtn = document.createElement('button');
        addFavoriteBtn.classList.add('btn', 'btn-primary', 'addFavoriteBtn');
        addFavoriteBtn.dataset.id = superhero.id;


        addFavoriteBtn.textContent = 'Add to Favorites';


        superheroCard.querySelector('.card-body').appendChild(addFavoriteBtn);

        superheroesContainer.appendChild(superheroCard);
    });
}

// Function to handle the search input and fetch superheroes
async function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim().toLowerCase();
    const superheroes = await fetchSuperheroes(searchQuery);
    renderSuperheroes(superheroes);
}

// Function to add a superhero to favorites
function addToFavorites(superheroId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(superheroId)) {
        favorites.push(superheroId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// Function to load favorites page
function loadFavoritesPage() {
    // Implement the favorites page as per your design
    // Retrieve the favorites from localStorage and display them
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);

    // Initial load of superheroes
    const superheroes = await fetchSuperheroes();
    renderSuperheroes(superheroes);

    superheroesContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('addFavoriteBtn')) {
            const superheroId = event.target.getAttribute('data-id');
            const button = event.target;
            if (isFavorite(superheroId)) {
                removeFromFavorites(superheroId);
            } else {
                addToFavorites(superheroId);
            }
            toggleFavoriteButton(button, superheroId);
        }
    });

    // Favorites button event listener
    const favoritesButton = document.getElementById('favoritesButton');
    favoritesButton.addEventListener('click', navigateToFavoritesPage);

    // Check and update favorite buttons on page load
    const superheroe = await fetchSuperheroes();
    superheroe.forEach((superhero) => {
        const superheroId = superhero.id;
        const button = document.querySelector(`[data-id="${superheroId}"]`);
        toggleFavoriteButton(button, superheroId);
    });

});


// Function to load the superhero page for a specific superhero
function loadSuperheroPage(superheroId) {
    window.location.href = `superhero.html?id=${superheroId}`;
}

function navigateToFavoritesPage() {
    window.location.href = 'favorites.html';
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', async () => {
    // ... (previously provided code)

    // Add favorite button event listener
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('addFavoriteBtn')) {
            const superheroId = event.target.getAttribute('data-id');
            addToFavorites(superheroId);
        }
    });

    // Superhero click event listener
    superheroesContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('card-img-top') || event.target.classList.contains('card-title')) {
            const superheroId = event.target.closest('.card').querySelector('.addFavoriteBtn').getAttribute('data-id');
            loadSuperheroPage(superheroId);
        }
    });

    const favoritesButton = document.getElementById('favoritesButton');
    favoritesButton.addEventListener('click', navigateToFavoritesPage);
});
