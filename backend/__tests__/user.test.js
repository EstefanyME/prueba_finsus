const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('User Controller', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('GET /api/users', () => {
    it('debe retornar una lista de usuarios', async () => {
      await User.create([
        { rfc: 'FFAL920101IT1', nombre: 'Maria', apellidos: 'Pedrosa Roldan', status: 'ACTIVE' },
        { rfc: 'FFAL920101IT2', nombre: 'Fernando', apellidos: 'Sandoval Miranda', status: 'LOCKED' },
      ]);

      const res = await request(app).get('/api/users');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(2);
    });

    it('debe filtrar usuarios por RFC', async () => {
      await User.create({ rfc: 'FFAL920101IT1', nombre: 'Maria', apellidos: 'Pedrosa Roldan', status: 'ACTIVE' });

      const res = await request(app).get('/api/users?rfc=FFAL920101IT1');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].rfc).toBe('FFAL920101IT1');
    });

    it('debe manejar errores correctamente', async () => {
      jest.spyOn(User, 'find').mockImplementation(() => {
        throw new Error('Error de base de datos');
      });

      const res = await request(app).get('/api/users');
      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toBe('Error al obtener los usuarios');
    });
  });

  describe('GET /api/users/:id', () => {
    it('debe retornar un usuario por ID', async () => {
      const user = await User.create({ rfc: 'FFAL920101IT1', nombre: 'Maria', apellidos: 'Pedrosa Roldan', status: 'ACTIVE' });

      const res = await request(app).get(`/api/users/${user._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.rfc).toBe('FFAL920101IT1');
    });

    it('debe retornar un error si el usuario no existe', async () => {
      const res = await request(app).get('/api/users/507f1f77bcf86cd799439011');
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Usuario no encontrado');
    });
  });
  describe('POST /api/users', () => {
    it('debe crear un nuevo usuario', async () => {
      const newUser = { rfc: 'FFAL920101IT1', nombre: 'Maria', apellidos: 'Pedrosa Roldan', status: 'ACTIVE' };

      const res = await request(app).post('/api/users').send(newUser);
      expect(res.statusCode).toEqual(201);
      expect(res.body.rfc).toBe('FFAL920101IT1');
    });

    it('debe manejar errores al crear un usuario', async () => {
        const newUser = { rfc: 'FFAL920101IT1' };
    
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('Error al crear el usuario');
      });
  });

  describe('PUT /api/users/:id', () => {
    it('debe actualizar un usuario existente', async () => {
      const user = await User.create({ rfc: 'FFAL920101IT1', nombre: 'Maria', apellidos: 'Pedrosa Roldan', status: 'ACTIVE' });

      const res = await request(app)
        .put(`/api/users/${user._id}`)
        .send({ nombre: 'Maria Updated' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.nombre).toBe('Maria Updated');
    });

    it('debe retornar un error si el usuario no existe', async () => {
      const res = await request(app)
        .put('/api/users/507f1f77bcf86cd799439011')
        .send({ nombre: 'Maria Updated' });

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Usuario no encontrado');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('debe eliminar un usuario existente', async () => {
      const user = await User.create({ rfc: 'FFAL920101IT1', nombre: 'Maria', apellidos: 'Pedrosa Roldan', status: 'ACTIVE' });

      const res = await request(app).delete(`/api/users/${user._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Usuario eliminado correctamente');
    });

    it('debe retornar un error si el usuario no existe', async () => {
      const res = await request(app).delete('/api/users/507f1f77bcf86cd799439011');
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Usuario no encontrado');
    });
  });
});