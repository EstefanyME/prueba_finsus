"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomButton from "./CustomButton";

const UserList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Listado de Usuarios</h1>
        <CustomButton icon="add" onClick={console.log("jn")} iconOnly />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              RFC
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Apellidos
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              status
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="border-t border-gray-100">
              <td className="px-6 py-4 text-sm text-gray-800">
                {transaction.rfc}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {transaction.nombre}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {transaction.apellidos}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {transaction.status}
              </td>
              <td className="flex gap-2 px-6 py-4 text-sm text-gray-800">
                <CustomButton
                  icon="delete"
                  onClick={console.log("jn")}
                  iconOnly
                />
                <CustomButton
                  icon="edit"
                  onClick={console.log("jn")}
                  iconOnly
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
