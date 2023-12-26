const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2512e81548c4c516c9b23e040d719482&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=2512e81548c4c516c9b23e040d719482&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getMovies(url) {
  const api = await fetch(url);
  const data = await api.json();
  console.log(data.results);
  showMovie(data.results);
}

function showMovie(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <div class="movie-info" >
  <h3>${title}</h3>
  <span class="${movieRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
  <h3>Overview</h3>
  ${overview}
</div>
`;

    // movieEl.insertAdjacentHTML("afterbegin", markup);
    main.appendChild(movieEl);
  });
}

function movieRate(vote) {
  if (vote <= 4) {
    return "red";
  }
  if (vote <= 7) {
    return "orange";
  }
  if (vote > 7) {
    return "green";
  }
}
getMovies(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
