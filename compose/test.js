const app = require('./app')
const server = app.listen();
const request = require('supertest').agent(server);

describe('Compose', () => {
    after(() => {
        server.close();
        process.exit(0);
    })

    describe('When GET /', () => {
        it('should say "Hello World"', (done) => {
            request
                .get('/')
                .expect(200)
                .expect('Hello World', done)
        });

        it('should set X-Response-Time', (done) => {
            request
                .get('/')
                .expect('X-Response-Time', /ms$/)
                .expect(200, done)
        })
    })

    describe('when not GET /', () => {
        it('should 404', (done) => {
            request
                .get('/adf')
                .expect(404, done);
        })
    })
})