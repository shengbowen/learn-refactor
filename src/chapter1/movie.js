import { RegularPrice, NewReleasePrice, ChildrensPrice } from "./priceStrategy";

class Movie {
  constructor(title, priceCode) {
    this.title = title;
    this.setPriceCode(priceCode);
  }

  setPriceCode(priceCode) {
    switch(priceCode) {
      case Movie.REGULAR:
        this._priceStrategy = new RegularPrice();
        break;
      case Movie.NEW_RELEASE:
        this._priceStrategy = new NewReleasePrice();
        break;
      case Movie.CHILDREDN:
        this._priceStrategy = new ChildrensPrice();
        break;
      default:
        throw new Error('incorrect price code!');
    }
  }

  getPriceCode() {
    return this._priceStrategy.getPriceCode();
  }

  getCharge(daysRented) {
    return this._priceStrategy.getCharge(daysRented);
  }

  getFrequentRenterPoints(daysRented) {
    return this._priceStrategy.getFrequentRenterPoints(daysRented);
  }
}

Movie.CHILDREDN = 2;
Movie.REGULAR = 0;
Movie.NEW_RELEASE = 1;

export default Movie;