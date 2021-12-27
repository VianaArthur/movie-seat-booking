const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectedMovie = document.getElementById('movie');
const movieCover = document.querySelector('.movie-image');

const loadData = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    selectedSeats.forEach((index) => seats[index].classList.add('selected'));
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    selectedMovie.selectedIndex = selectedMovieIndex;
  }

  const selectedMovieImg = localStorage.getItem('selectedMovieImg');
  if (selectedMovieImg !== null) {
    movieCover.style.backgroundImage = `url(images/${selectedMovieImg}.jpg)`;
  }
};

loadData();

let ticketPrice = +selectedMovie.value;

// Update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // save to local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = 'R$ ' + selectedSeatsCount * ticketPrice;
};

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice, movieImg) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
  localStorage.setItem('selectedMovieImg', movieImg);
};

// Movie select event
selectedMovie.addEventListener('change', (e) => {
  const selectedOptionId = e.target[e.target.selectedIndex].id;

  // change the movie image
  document.querySelector(
    '.movie-image'
  ).style.backgroundImage = `url(images/${selectedOptionId}.jpg)`;

  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value, selectedOptionId);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

updateSelectedCount();
