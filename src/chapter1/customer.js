import Movie from './movie';

class Customer {
  constructor(name) {
    this.name = name;
    this.rentals = [];
  }

  addRental(rental) {
    this.rentals.push(rental);
    return this;
  }

  statement() {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = `Rental Recored for ${this.name}\n`;
    for (let i = 0, len = this.rentals.length; i < len; i++) {
      const { movie, daysRented } = this.rentals[i]
      let thisAmount = this.amountFor(movie, daysRented);

      frequentRenterPoints++;

      if (movie.priceCode === Movie.NEW_RELEASE && daysRented > 1) frequentRenterPoints++;

      result += `\t${movie.title}\t${thisAmount}\n`;
      totalAmount += thisAmount
    }

    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentRenterPoints} frequent renter points`;
    // console.log(result);
    return result;
  }

  amountFor(movie, daysRented) {
    let thisAmount = 0;
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
}

export default Customer;