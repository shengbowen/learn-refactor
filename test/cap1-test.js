import assert from 'assert';
import Movie from '../src/chapter1/movie';
import Rental from '../src/chapter1/rental.js';
import Customer from '../src/chapter1/customer.js';

describe('chapter1  tests', () => {
// GET /api/fetch

  describe('Customer statement', () => {
    it('statement must be return the expect string', (done) => {

      const movie1 = new Movie('The Avengers 3', Movie.NEW_RELEASE);
      const movie2 = new Movie('Frozen', Movie.CHILDREDN);
      const movie3 = new Movie('Avatar', Movie.REGULAR);

      const rental1 = new Rental(movie1, 2);
      const rental2 = new Rental(movie2, 3);
      const rental3 = new Rental(movie3, 1);

      const customer = new Customer('jack');
      customer.addRental(rental1).addRental(rental2).addRental(rental3);
      const result = customer.statement();
      const exString = `Rental Recored for jack\n\tThe Avengers 3\t6\n\tFrozen\t1.5\n\tAvatar\t2\nAmount owed is 9.5\nYou earned 4 frequent renter points`;
      assert(result === exString)
      done();
    });
  })

});
