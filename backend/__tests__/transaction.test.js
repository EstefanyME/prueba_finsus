const request = require('supertest');
const app = require('../app');

describe('GET /api/transactions', () => {
    it('debe retornar una lista de transacciones', async () => {
      const res = await request(app).get('/api/transactions');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    }, 10000);
  });

describe('POST /api/transactions', () => {
  it('debe crear una nueva transacción', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .send({
        rfc: 'FFAL920101IT2',
        fechaRetiro: '2024-03-01',
        monto: 100,
        comision: 10,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('folio');
  });
});