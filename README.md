# Little Movie Explorer 🍂 (React Movie API Explorer)

## Description
This is a lightweight React web application built with Vite that uses Axios to fetch and display movie data from the TMDB API. Based on the "API Demo Project" lesson plan, this application allows users to view popular movies and search for specific titles within a cozy, relaxing interface.

## Live Demo
This project is currently deployed and hosted on Vercel. You can view and interact with the live application here:
[React Movie API Explorer - Live Demo](https://react-movie-api-explorer.vercel.app/)

## Features
This project implements the core API functionalities and all specific rubric requirements for Assignment 4:
* **Live Search:** Includes a working search functionality and form to query the database.
* **Empty State Handling:** Shows a custom empty state message (e.g., “No results for ‘xyz’”) when a search returns nothing.
* **Movie Detail View:** Features a clickable modal that displays the movie's overview description directly from the API data.
* **Pagination Integration:** Includes a "Load more" button that utilizes TMDB’s `page` parameter to fetch additional movies.
* **Mobile Accessibility:** Built with smart CSS Grid modifications to automatically resize and organize the movie cards for mobile screens.

## Technologies Used
* React (scaffolded via Vite)
* Axios (for fetching data and aborting requests)
* The Movie Database (TMDB) API
* Vanilla CSS (CSS Grid)

## Local Setup
To run this project on your own machine:
1. Clone this repository to your local environment.
2. Run `npm install axios` to ensure dependencies are installed.
3. Log in to your TMDB account and request an API Read Access Token.
4. Create a `.env` file in the root folder of the project. 
5. Secure your token inside the `.env` file using this exact format: `VITE_TMDB_TOKEN=your_token_here`.
6. Start the local development server (typically using `npm run dev`).
