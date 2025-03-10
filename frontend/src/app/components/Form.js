'use client';
import React, { useState } from 'react';
import CustomButton from './CustomButton';

const Form = ({ onCreateTransaction, onClose }) => {
  const [formData, setFormData] = useState({
    rfc: '',
    fechaRetiro: '',
    monto: '',
    comision: '',
    status: 'PENDING',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTransaction(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
      <h2 className="text-xl font-semibold mb-4">Crear Transacción</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">RFC</label>
          <input
            type="text"
            name="rfc"
            value={formData.rfc}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Retiro</label>
          <input
            type="date"
            name="fechaRetiro"
            value={formData.fechaRetiro}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monto</label>
          <input
            type="number"
            name="monto"
            value={formData.monto}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Comisión (%)</label>
          <input
            type="number"
            name="comision"
            value={formData.comision}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="PENDING">Pendiente</option>
            <option value="COMPLETED">Completado</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <CustomButton
            type="button"
            onClick={onClose}
            label="Cancelar"
            variant="secondary"
          />
          <CustomButton type="submit" label="Guardar" />
        </div>
      </form>
    </div>
  );
};

export default Form;