const User = require('../models/User');

exports.getUsers = async (req, res) => {
    const { rfc, nombre, apellidos, status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    try {
        const users = await User.find(filter);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
    }
};
