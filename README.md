# Superhero Hunter App Readme

## Introduction
Superhero Hunter App is a web application that allows users to search for their favorite superheroes and view their details. Users can also add superheroes to their favorites list for easy access later. The application utilizes the Marvel API to fetch superhero data.

## Features
- Search for superheroes by name.
- View superhero details, including biography, comics, events, series, and stories.
- Add superheroes to the favorites list.
- View and manage the list of favorite superheroes.

## Technologies Used
- HTML5
- CSS3 (Bootstrap 4.5.2)
- JavaScript (ES6)
- CryptoJS (for generating the required API hash)

## Pages

### 1. index.html
This is the main page of the Superhero Hunter App. It provides a search bar to search for superheroes and displays the search results as cards with superhero names and images. Users can add superheroes to their favorites list from this page.

### 2. superhero.html
This page displays detailed information about a specific superhero. It shows the superhero's name, biography, comics, events, series, and stories. Users can navigate to this page by clicking on a superhero's name or image from the search results on the index.html page.

### 3. favorites.html
This page displays the list of favorite superheroes that the user has added. It provides a simple list of superheroes with their names and images, along with the option to remove superheroes from the favorites list.

## How to Use
1. Clone the repository to your local machine.
2. Open the index.html file in your web browser.
3. Use the search bar to search for superheroes by name.
4. Click on a superhero's name or image to view their detailed information on the superhero.html page.
5. To add a superhero to your favorites, click the "Add to Favorites" button on the superhero card on the index.html page.
6. To view and manage your favorite superheroes, click the "My Favorites" button on the index.html page to navigate to the favorites.html page.

## Note
To run the application, you must have an active internet connection since it fetches superhero data from the Marvel API.

## API Credentials
The application uses the Marvel API to fetch superhero data. The required public and private keys are provided in the app.js, superhero.js, and favorites.js files. These keys are used to generate the hash required for accessing the API.

## Disclaimer
This project is for educational purposes only and uses data from the Marvel API, which may have usage limitations and terms of use set by Marvel. Please refer to Marvel's API documentation and terms of use for more information.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
