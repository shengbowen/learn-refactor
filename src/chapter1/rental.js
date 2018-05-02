import Movie from './movie';

class Rental {
  constructor(movie, daysRented) {
    this.movie = movie;
    this.daysRented = daysRented;
  }

  getCharge() {
    let thisAmount = 0;
    const { movie, daysRented } = this;
    switch(movie.priceCode) {
      case Movie.REGULAR:
        thisAmount += 2;
        if (daysRented > 2) thisAmount += (daysRented - 2) * 1.5;
        break;
      case Movie.NEW_RELEASE:
        thisAmount += daysRented * 3;
        break;
      case Movie.CHILDREDN:
        thisAmount += 1.5;
        if (daysRented > 3) thisAmount += (daysRented - 3) * 1.5;
        break;
    }
    return thisAmount;
  }

  getFrequentRenterPoints() {
    const { movie, daysRented } = this;
    if (movie.priceCode === Movie.NEW_RELEASE && daysRented > 1) return 2;
    else return 1;
  }
}

export default Rental;