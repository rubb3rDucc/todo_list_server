describe('api testing', function () {
    it('get api test', async function ({ supertest }) {
        await supertest
            .request("https://petstore.swagger.io/v2")
            .get("/pet/findByStatus?status=available")
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                expect(response._body.length).to.be.greaterThan(0);
            });
    });
});

describe('test', function () {
    it('get all todos', async function ({ supertest }) {
        await supertest
        .request("http://localhost:3000/todo/byUserId")
            .expect(200)
    })
});
