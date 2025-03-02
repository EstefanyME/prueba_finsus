import React, { useState } from "react";
import CustomButton from "./CustomButton";

const FormUser = ({ onClose, onSave }) => {
  const [newUser, setNewUser] = useState({
    rfc: "",
    nombre: "",
    apellidos: "",
    status: "ACTIVE",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newUser);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
      <h2 className="text-xl font-semibold mb-4">Agregar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">RFC</label>
          <input
            type="text"
            name="rfc"
            value={newUser.rfc}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={newUser.nombre}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={newUser.apellidos}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ACTIVE">Activo</option>
            <option value="LOCKED">Bloqueado</option>
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

export default FormUser;