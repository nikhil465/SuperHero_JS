const publicKey = '7b9aa3bad9c569434c84bc0e2d02dcb8';
const privateKey = 'd0bebbe18cf526ba5f2ec3819a6d6743128c27f3';
const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';

// Function to get superhero details by ID
async function fetchSuperheroDetails(superheroId) {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey);

    const url = `${baseURL}/${superheroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results[0];
    } catch (error) {
        console.error('Error fetching superhero details:', error);
        return null;
    }
}

// Function to render favorite superheroes on the page
async function renderFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<li class="list-group-item">You have no favorite superheroes yet.</li>';
        return;
    }

    favoritesList.innerHTML = '';

    for (const superheroId of favorites) {
        const superhero = await fetchSuperheroDetails(superheroId);

        if (!superhero) {
            continue;
        }

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
            <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}" class="img-thumbnail mr-2" style="width: 80px;">
            <span>${superhero.name}</span>
            <button class="btn btn-danger removeFavoriteBtn" data-id="${superhero.id}">Remove</button>
        `;

        favoritesList.appendChild(listItem);
    }
}

// Function to remove a superhero from favorites
function removeFromFavorites(superheroId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter((id) => id !== superheroId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    //renderFavorites();
}

// Attach event listener
document.addEventListener('DOMContentLoaded', () => {
    const favoritesList = document.getElementById('favoritesList');

    // Remove favorite button event listener
    favoritesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('removeFavoriteBtn')) {
            const superheroId = event.target.getAttribute('data-id');
            removeFromFavorites(superheroId);
            renderFavorites(); // Re-render the favorites list after removing a superhero
        }
    });

    // Initial rendering of the favorites list
    renderFavorites();
});
