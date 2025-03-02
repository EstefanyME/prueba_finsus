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

const request = require('supertest');
const app = require('../app');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

beforeEach(async () => {
  await User.create({ rfc: 'FFAL920101IT1', nombre: 'Maria', apellidos: 'Pedrosa Roldan', status: 'ACTIVE' });
  await Transaction.create([
    { rfc: 'FFAL920101IT1', folio: 'AAF23401', fechaRetiro: '2024-03-01', monto: 100, comision: 10, status: 'COMPLETED' },
    { rfc: 'FFAL920101IT1', folio: 'AAF23402', fechaRetiro: '2024-03-02', monto: 200, comision: 20, status: 'COMPLETED' },
  ]);
});

afterEach(async () => {
  await User.deleteMany();
  await Transaction.deleteMany();
});

describe('GET /api/transactions/user-summary/:rfc', () => {
  it('debe devolver el resumen de transacciones del usuario', async () => {
    const res = await request(app).get('/api/transactions/user-summary/FFAL920101IT1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      retirosTotales: 2,
      montoTotalRetirado: 300,
      montoTotalComisiones: 30,
      montoTotal: 330,
    });
  });

  it('debe devolver 0 si el usuario no tiene transacciones', async () => {
    const res = await request(app).get('/api/transactions/user-summary/FFAL920101IT2');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      retirosTotales: 0,
      montoTotalRetirado: 0,
      montoTotalComisiones: 0,
      montoTotal: 0,
    });
  });
});

it('debe manejar errores correctamente', async () => {
  jest.spyOn(Transaction, 'find').mockImplementation(() => {
    throw new Error('Error de base de datos');
  });

  const res = await request(app).get('/api/transactions/user-summary/FFAL920101IT1');
  expect(res.statusCode).toEqual(500);
  expect(res.body.message).toBe('Error al obtener el resumen de transacciones');
});