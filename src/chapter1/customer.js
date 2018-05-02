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
      const rental = this.rentals[i];
      const { movie, daysRented } = rental;

      frequentRenterPoints += rental.getFrequentRenterPoints();

      result += `\t${movie.title}\t${rental.getCharge()}\n`;
      totalAmount += rental.getCharge()
    }

    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentRenterPoints} frequent renter points`;
    // console.log(result);
    return result;
  }
}

export default Customer;