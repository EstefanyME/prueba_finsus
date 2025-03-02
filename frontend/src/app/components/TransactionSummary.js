'use client';
import React, { useState } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';

const TransactionSummary = () => {
  const [rfc, setRfc] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    if (!rfc) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/transactions/user-summary/${rfc}`);
      setSummary(response.data);
    } catch (err) {
      setError('Error al obtener el resumen de transacciones');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Retiros totales de usuario</h1>
      <div className="flex gap-2 h-[28px]">
        <input
          type="text"
          placeholder="Ingrese RFC"
          value={rfc}
          onChange={(e) => setRfc(e.target.value)}
          className="border p-2 rounded"
        />
        <CustomButton icon="search" onClick={fetchSummary} iconOnly/>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {summary && (
        <div className="bg-white p-4 rounded-lg shadow-md text-black">
          <p><strong>Retiros Totales:</strong> {summary.retirosTotales}</p>
          <p><strong>Monto Total Retirado:</strong> ${summary.montoTotalRetirado}</p>
          <p><strong>Monto Total en Comisiones:</strong> ${summary.montoTotalComisiones}</p>
          <p><strong>Monto Total:</strong> ${summary.montoTotal}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionSummary;
