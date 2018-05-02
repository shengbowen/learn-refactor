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
      let thisAmount = this.rentals[i].getCharge();

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
}

export default Customer;