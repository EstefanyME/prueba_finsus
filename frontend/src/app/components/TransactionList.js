'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';
import Form from './Form';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ rfc: '', folio: '', status: '', startDate: '', endDate: '' });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/transactions', {
        params: filters,
      });
      setTransactions(response.data);
    } catch (error) {
      alert('Error al obtener transacciones');
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTransaction = async (newTransaction) => {
    try {
      const response = await axios.post('http://localhost:3000/api/transactions', newTransaction);
      setTransactions((prevTransactions) => [...prevTransactions, response.data]);
      closeModal();
    } catch (error) {
      console.error('Error al crear la transacción:', error);
      alert('Error al crear la transacción');
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await axios.delete(`http://localhost:3000/api/transactions/${transactionId}`);
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction._id !== transactionId)
      );
    } catch (error) {
      console.error('Error al eliminar la transacción:', error);
      alert('Error al eliminar la transacción');
    }
  };

  const handleUpdateTransaction = async (transactionId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/transactions/${transactionId}/status`, { status: newStatus });
      fetchTransactions();
    } catch (error) {
      console.error('Error al actualizar la transacción:', error);
      alert('Error al actualizar la transacción');
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Listado de Transacciones</h1>
        <CustomButton icon="add" onClick={openModal} iconOnly />
      </div>

      <div className="bg-white p-2 rounded-lg shadow flex flex-wrap gap-2 text-black">
        <input
          type="text"
          name="rfc"
          placeholder="RFC"
          value={filters.rfc}
          onChange={handleFilterChange}
          className="border p-2 rounded border-gray-200"
        />
        <input
          type="text"
          name="folio"
          placeholder="Folio"
          value={filters.folio}
          onChange={handleFilterChange}
          className="border p-2 rounded border-gray-200"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border p-2 rounded border-gray-200"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border p-2 rounded border-gray-200"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border p-2 rounded border-gray-200"
        >
          <option value="">Estado</option>
          <option value="PENDING">Pendiente</option>
          <option value="COMPLETED">Completado</option>
          <option value="CANCELLED">Cancelado</option>
        </select>
        <CustomButton icon="filter_alt" onClick={fetchTransactions} iconOnly />
      </div>

      <div className="overflow-y-auto z-0 max-h-[350px] border border-gray-200 rounded-lg shadow-md">
        <table className="w-full bg-white text-black">
          <thead className="sticky top-0 bg-white z-10">
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
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="border-t border-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">{transaction.rfc}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{transaction.folio}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{transaction.fechaRetiro}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{transaction.status}</td>
                <td className="px-6 py-4 text-sm text-gray-800">${transaction.monto}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{transaction.comision}%</td>
                <td className="flex gap-2 px-6 py-4 text-sm text-gray-800">
                  <CustomButton
                    icon="delete"
                    onClick={() => handleDeleteTransaction(transaction._id)}
                    iconOnly
                  />
                  <CustomButton
                    icon="edit"
                    onClick={() => handleUpdateTransaction(transaction._id, 'COMPLETED')}
                    iconOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center">
          <Form onCreateTransaction={handleCreateTransaction} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default TransactionList;