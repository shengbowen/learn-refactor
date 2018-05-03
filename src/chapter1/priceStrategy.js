import Movie from "./movie";

class Price {
  getPriceCode() {
    throw new Error('getPriceCode must be rewrite');
  }

  getCharge(daysRented) {
    throw new Error('getPriceCode must be rewrite');
  }

  getFrequentRenterPoints(daysRented) {
    return 1;
  }
}

class ChildrensPrice extends Price {
  getPriceCode() {
    return Movie.CHILDREDN;
  }

  getCharge(daysRented) {
    let thisAmount = 1.5;
    if (daysRented > 3) thisAmount += (daysRented - 3) * 1.5;
    return thisAmount;
  }
}

class NewReleasePrice extends Price {
  getPriceCode() {
    return Movie.NEW_RELEASE;
  }

  getCharge(daysRented) {
    return daysRented * 3;
  }

  getFrequentRenterPoints(daysRented) {
    if (this.getPriceCode() === Movie.NEW_RELEASE && daysRented > 1) return 2;
    return 1;
  }
}

class RegularPrice extends Price {
  getPriceCode() {
    return Movie.REGULAR;
  }

  getCharge(daysRented) {
    let thisAmount = 2;
    if (daysRented > 2) thisAmount += (daysRented - 2) * 1.5;
    return thisAmount;
  }
}

export {
  NewReleasePrice,
  ChildrensPrice,
  RegularPrice
}