'use strict';

const startAddMovieButton = document.querySelector('header button');
const movieModal = document.querySelector('#add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = movieModal.querySelector('.btn--passive');
const addMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = movieModal.querySelectorAll('input');
const movieList = document.getElementById('movie-list');
const entryText = document.getElementById('entry-text');
const deleteModal = document.querySelector('#delete-modal');
let movies = [];


// Background UI
const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
  movies.length > 0
    ? entryText.style.display = 'none'
    : entryText.style.display = 'block';
};

const backdropHandler = () => {
  closeMovieModal();
  closeDeleteModal();
  clearInputs();
};


// Add movie
const showMovieModal = () => {
  movieModal.classList.add('visible');
  toggleBackdrop();
};

const closeMovieModal = () => {
  movieModal.classList.remove('visible');
};

const clearInputs = () => {
  for (const input of userInputs) {
    input.value = '';
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearInputs();
};

const renderMovieListItem = ({ id, title, image, rating }) => {
  const movieListItem = document.createElement('li');
  movieListItem.className = 'movie-element';
  movieListItem.id = id;
  movieListItem.innerHTML = `
    <div class='movie-element__image'>
      <img src='${image}' alt='${title}'>
    </div>
    <div class='movie-element__info'>
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  
  movieList.append(movieListItem);
  movieListItem.addEventListener('click', showDeleteModal.bind(null, id));
};

const addMovieHandler = (e) => {
  let title = userInputs[0].value;
  let image = userInputs[1].value;
  let rating = userInputs[2].value;
  const id = Math.random().toString();
  
  if (
    typeof title !== 'string' ||
    typeof image !== 'string' ||
    title === '' ||
    image === '' ||
    rating < 1 ||
    rating > 10
  ) {
    alert('Er, nope. Try again please');
  } else {
    const movie = {
      id,
      title,
      image,
      rating,
    };
    
    movies.push(movie);
    console.log(movies);

    closeMovieModal();
    toggleBackdrop();
    clearInputs();
    updateUI();
    renderMovieListItem(movie);
  }
};


// Delete movie
const closeDeleteModal = () => {
  deleteModal.classList.remove('visible');
  toggleBackdrop();
};

const showDeleteModal = (id) => {
  const confirmDeleteButton = deleteModal.querySelector('.btn--danger');
  const cancelDeleteButton = deleteModal.querySelector('.btn--passive');
  
  toggleBackdrop();
  deleteModal.classList.add('visible');
  
  confirmDeleteButton.onclick = () => deleteMovie(id);  // Use onclick vs addEventListener
                                                        // to avoid multiple listeners stacking up
  cancelDeleteButton.onclick = closeDeleteModal;
};

const deleteMovie = (id) => {
  const toKeep = movie => movie.id !== id;
  movies = movies.filter(toKeep);
  
  const movie = document.getElementById(id);
  movie.remove();
  
  closeDeleteModal();
  updateUI();
};


// Event listeners
startAddMovieButton.addEventListener('click', showMovieModal);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
backdrop.addEventListener('click', backdropHandler);
addMovieButton.addEventListener('click', addMovieHandler);
