const axios = require('axios');
const UserResolver = require('../src/resolvers/user')
const SERVER_URL = "http://localhost:3000"

describe('User APIs', () => {
  beforeEach(async done => {
    await axios.get(`${SERVER_URL}/reset-db`);
    done();
  });
  
  afterEach(async done => {
    done();
  });

  test('Create user', async () => {
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

  test('Verify user', async () => {
    const userData = {
      email: "smskumar515@gmail.com",
      phone: "+91 9092701806",
      password: "smsk1999",
    }
    try {
      const resp = await axios.post(`${SERVER_URL}/signup`, userData)
      expect(resp.data.status).toBe(200)
      expect(resp.data.data.email).toBe("smskumar515@gmail.com")
      expect(resp.data.data.emailVerified).toBe(false);
      const verifyData = {
        email: resp.data.data.email,
        code: resp.data.data.code,
      }
      const resp1 = await axios.post(`${SERVER_URL}/verify-email`, verifyData)
      expect(resp1.data.status).toBe(200)
      expect(resp1.data.data.email).toBe("smskumar515@gmail.com")
      expect(resp1.data.data.emailVerified).toBe(true)
      expect(resp1.data.data.code).toBe('');
    } catch (error) {
      console.log(error)
      expect(true).toBeFalsy()
    }
  })
})