const axios = require('axios');
const UserResolver = require('../src/resolvers/user')
const SERVER_URL = "http://localhost:3000"

beforeAll(async done => {
  await axios.get(`${SERVER_URL}/reset-db`);
  done();
});

afterAll(async done => {
  done();
});

describe('User APIs', () => {
  test('Create User', async () => {
    const userData = {
      email: "smskumar515@gmail.com",
      phone: "+91 9092701806",
      password: "smsk1999",
    }
    try {
      const resp = await axios.post(`${SERVER_URL}/signup`, userData)
      expect(resp.data.status).toBe(200)
      expect(resp.data.data.email).toBe("smskumar515@gmail.com")
    } catch (error) {
      console.log(error)
      expect(true).toBeFalsy()
    }
  })
})