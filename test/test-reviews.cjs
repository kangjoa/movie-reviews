const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');

chai.use(chaiHttp);

// tell mocha you want to test Reviews (this string is taco)
describe('Reviews', () => {
  let createdReview;

  // Create a review object before each test
  beforeEach((done) => {
    Review.create({
      title: 'Super Sweet Review',
      'movie-title': 'La La Land',
      description: 'A great review of a lovely movie.',
    })
      .then((review) => {
        createdReview = review;
        done();
      })
      .catch((err) => done(err));
  });

  // Delete the created review after each test
  afterEach((done) => {
    if (createdReview) {
      Review.deleteOne({ _id: createdReview._id })
        .then(() => done())
        .catch((err) => done(err));
    } else {
      done();
    }
  });

  // make taco name for the test
  it('should index ALL reviews on / GET', (done) => {
    // use chai-http to make a request to your server
    chai
      .request(server)
      // send a GET request to root route
      .get('/')
      // wait for response
      .end((err, res) => {
        // check that the response status is = 200 (success)
        res.should.have.status(200);
        // check that the response is a type html
        res.should.be.html;
        // end this test and move onto the next.
        done();
      });
  });

  // TEST NEW
  it('should display new form on /reviews/new GET', (done) => {
    chai
      .request(server)
      .get(`/reviews/new`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  // TEST SHOW
  it('should show a SINGLE review on /reviews/<id> GET', (done) => {
    chai
      .request(server)
      .get(`/reviews/${createdReview._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {
    chai
      .request(server)
      .get(`/reviews/${createdReview._id}/edit`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  // TEST CREATE
  it('should create a SINGLE review on /reviews POST', (done) => {
    chai
      .request(server)
      .post('/reviews')
      .send(createdReview)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  // TEST UPDATE
  it('should update a SINGLE review on /reviews/<id> PUT', (done) => {
    chai
      .request(server)
      .put(`/reviews/${createdReview._id}?_method=PUT`)
      .send({ title: 'Updating the title' })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  // TEST DELETE
  it('should delete a SINGLE review on /reviews/<id> DELETE', (done) => {
    chai
      .request(server)
      .delete(`/reviews/${createdReview._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
});
