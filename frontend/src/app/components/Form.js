import React, { useState } from 'react';
import CustomButton from './CustomButton';

const Form = ({ onCreateTransaction, onClose }) => {
  const [newTransaction, setNewTransaction] = useState({
    rfc: '',
    fechaRetiro: '',
    monto: 0,
    comision: 0,
    status: 'PENDING',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTransaction(newTransaction);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Crear Transacción</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">RFC</label>
          <input
            type="text"
            name="rfc"
            value={newTransaction.rfc}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Retiro</label>
          <input
            type="date"
            name="fechaRetiro"
            value={newTransaction.fechaRetiro}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monto</label>
          <input
            type="number"
            name="monto"
            value={newTransaction.monto}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Comisión</label>
          <input
            type="number"
            name="comision"
            value={newTransaction.comision}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="status"
            value={newTransaction.status}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="PENDING">Pendiente</option>
            <option value="COMPLETED">Completado</option>
            <option value="FAILED">Fallido</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <CustomButton label="Cancelar" onClick={onClose} />
          <CustomButton type="submit" label="Crear" />
        </div>
      </form>
    </div>
  );
};

export default Form;