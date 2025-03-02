'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';
import Form from './Form';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error(error));
  }, []);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleCreateTransaction = async (newTransaction) => {
    try {
      const response = await axios.post('http://localhost:3000/api/transactions', newTransaction);
      setTransactions([...transactions, response.data]);
      closeModal();
    } catch (error) {
      console.error('Error al crear la transacción:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 text-black">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-semibold">Listado de Transacciones</h1>
        <CustomButton icon="add" onClick={openModal} iconOnly />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <Form
            onCreateTransaction={handleCreateTransaction}
            onClose={closeModal}
          />
        </div>
      )}
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">RFC</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Folio</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Fecha de retiro</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Monto</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Comision</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id} className="border-t border-gray-100">
              <td className="px-6 py-4 text-sm text-gray-800">{transaction.rfc}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{transaction.folio}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{transaction.fechaRetiro}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{transaction.status}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{transaction.monto}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{transaction.comision}</td>
              <td className="flex gap-2 px-6 py-4 text-sm text-gray-800">
                <CustomButton icon="delete" onClick={() => console.log("Eliminar")} iconOnly />
                <CustomButton icon="edit" onClick={() => console.log("Editar")} iconOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;