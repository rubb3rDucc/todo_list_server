describe('test', function () {
    it('gets all todos', async function ({ supertest }) {
        await supertest
            .request("http://localhost:3000/")
            .get('todo/byUserId')
            .send({ userId: '231' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                expect(response._body.length).to.be.greaterThan(0);
            });
    })
});
