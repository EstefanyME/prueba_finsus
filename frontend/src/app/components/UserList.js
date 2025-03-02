"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomButton from "./CustomButton";
import FormUser from "./FormUser";

const UserList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:3000/api/users/${userId}`)
      .then(() => {
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction._id !== userId)
        );
      })
      .catch((error) => console.error(error));
  };

  const handleEditUser = (userId) => {
    console.log("Editar usuario con ID:", userId);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Listado de Usuarios</h1>
        <CustomButton icon="add" onClick={handleAddUser} iconOnly />
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
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Acciones
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
                  onClick={() => handleDeleteUser(transaction._id)}
                  iconOnly
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FormUser
            onClose={handleCloseModal}
            onSave={(newUser) => {
              axios
                .post("http://localhost:3000/api/users", newUser)
                .then((response) => {
                  setTransactions((prevTransactions) => [...prevTransactions, response.data]);
                  handleCloseModal();
                })
                .catch((error) => console.error(error));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;