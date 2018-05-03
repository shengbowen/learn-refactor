import Movie from "./movie";

class Price {
  getPriceCode() {
    throw new Error('getPriceCode must be rewrite');
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
}

class ChildrensPrice extends Price {
  getPriceCode() {
    return Movie.CHILDREDN;
  }
}

class NewReleasePrice extends Price {
  getPriceCode() {
    return Movie.NEW_RELEASE;
  }
}

class RegularPrice extends Price {
  getPriceCode() {
    return Movie.REGULAR;
  }
}

export {
  NewReleasePrice,
  ChildrensPrice,
  RegularPrice
}