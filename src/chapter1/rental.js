import Movie from './movie';

class Rental {
  constructor(movie, daysRented) {
    this.movie = movie;
    this.daysRented = daysRented;
  }

  getCharge() {
    return this.movie.getCharge(this.daysRented);
  }

  getFrequentRenterPoints() {
    const { movie, daysRented } = this;
    if (movie.priceCode === Movie.NEW_RELEASE && daysRented > 1) return 2;
    else return 1;
  }
}

export default Rental;