const app = require('./app')
const server = app.listen()
const request = require('supertest').agent(server)

describe('Cookies Views',()=> {
    after(()=> {
        server.close()
      });


    [1, 2, 3].forEach( (i)=> {
        describe('on iteration #' + i, ()=> {
            it('should set the views as a cookies and as the body', (done) => {
                request
                    .get('/')
                    .expect(200)
                    .expect('Set-Cookie', new RegExp('view=' + i))
                    .expect(i + ' views', done)
            })
        })
    });
})

