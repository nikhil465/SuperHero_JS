const publicKey = '7b9aa3bad9c569434c84bc0e2d02dcb8';
const privateKey = 'd0bebbe18cf526ba5f2ec3819a6d6743128c27f3';
const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';

function getHash(ts) {
    return CryptoJS.MD5(ts + privateKey + publicKey);
}

// Function to fetch a specific superhero's details
async function fetchSuperheroDetails(superheroId) {
    const ts = new Date().getTime();
    const hash = getHash(ts);

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

// Function to render superhero details on the page
function renderSuperheroDetails(superhero) {
    const superheroImage = document.getElementById('superheroImage');
    const superheroName = document.getElementById('superheroName');
    const superheroBio = document.getElementById('superheroBio');
    const comicsList = document.getElementById('comicsList');
    const eventsList = document.getElementById('eventsList');
    const seriesList = document.getElementById('seriesList');
    const storiesList = document.getElementById('storiesList');

    superheroImage.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    superheroName.textContent = superhero.name;
    superheroBio.textContent = superhero.description || 'No bio available.';

    comicsList.innerHTML = superhero.comics.items.map((comic) => `<li>${comic.name}</li>`).join('');
    eventsList.innerHTML = superhero.events.items.map((event) => `<li>${event.name}</li>`).join('');
    seriesList.innerHTML = superhero.series.items.map((series) => `<li>${series.name}</li>`).join('');
    storiesList.innerHTML = superhero.stories.items.map((story) => `<li>${story.name}</li>`).join('');
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const superheroId = params.get('id');

    if (!superheroId) {
        console.error('Superhero ID not provided.');
        return;
    }

    const superhero = await fetchSuperheroDetails(superheroId);

    if (!superhero) {
        console.error('Error fetching superhero details.');
        return;
    }

    renderSuperheroDetails(superhero);
});
