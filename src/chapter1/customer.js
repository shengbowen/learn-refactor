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
    let result = `Rental Recored for ${this.name}\n`;
    for (let i = 0, len = this.rentals.length; i < len; i++) {
      const rental = this.rentals[i];
      const { movie, daysRented } = rental;

      result += `\t${movie.title}\t${rental.getCharge()}\n`;
    }

    result += `Amount owed is ${this.getTotalCharge()}\n`;
    result += `You earned ${this.getTotalFrequentRenterPoints()} frequent renter points`;
    return result;
  }

  getTotalCharge() {
    return this.rentals.reduce((acc, cur) => {
      return acc + cur.getCharge();
    }, 0)
  }

  getTotalFrequentRenterPoints() {
    return this.rentals.reduce((acc, cur) => acc + cur.getFrequentRenterPoints(), 0)
  }
}

export default Customer;