const User = require('../models/User');

exports.getUsers = async (req, res) => {
    const { rfc, nombre, apellidos, status } = req.query;
    
    const filter = {};
    if (rfc) filter.rfc = rfc;
    if (nombre) filter.nombre = new RegExp(nombre, 'i');
    if (apellidos) filter.apellidos = new RegExp(apellidos, 'i');
    if (status) filter.status = status;
    
    try {
        const users = await User.find(filter);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: 'Error al crear el usuario', error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar el usuario', error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: err.message });
    }
};
