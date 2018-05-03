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
    let thisAmount = 0;
    switch(this.getPriceCode()) {
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

  getFrequentRenterPoints(daysRented) {
    if (this.getPriceCode() === Movie.NEW_RELEASE && daysRented > 1) return 2;
    else return 1;
  }
}

Movie.CHILDREDN = 2;
Movie.REGULAR = 0;
Movie.NEW_RELEASE = 1;

export default Movie;