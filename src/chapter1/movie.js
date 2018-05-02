class Movie {
  constructor(title, priceCode) {
    this.title = title;
    this.priceCode = priceCode;
  }

  getCharge(daysRented) {
    let thisAmount = 0;
    switch(this.priceCode) {
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
}

Movie.CHILDREDN = 2;
Movie.REGULAR = 0;
Movie.NEW_RELEASE = 1;

export default Movie;