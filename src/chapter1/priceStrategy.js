import Movie from "./movie";

class Price {
  getPriceCode() {
    throw new Error('getPriceCode must be rewrite');
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