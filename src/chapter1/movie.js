class Movie {
  constructor(title, priceCode) {
    this.title = title;
    this.priceCode = priceCode;
  }
}

Movie.CHILDREDN = 2;
Movie.REGULAR = 0;
Movie.NEW_RELEASE = 1;

export default Movie;