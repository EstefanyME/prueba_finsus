const Transaction = require('../models/Transaction');
const User = require('../models/User');

const generateFolio = async () => {
    const lastTransaction = await Transaction.findOne().sort({ folio: -1 });
    let lastNumber = 0;
    if( lastTransaction && lastTransaction.folio ){
        const lastFolio = lastTransaction.folio;
        lastNumber = parseInt(lastFolio.slice(3), 10);
    }
    const newNumber = lastNumber + 1;
    const newFolio = `AAF${newNumber.toString().padStart(5, '0')}`;
    return newFolio;
}

exports.getTransactions = async (req, res) => {
    const { startDate, endDate, rfc, folio, status } = req.query;
    const filter = { deleted: false };

    if( startDate && endDate ) {
        filter.fechaRetiro = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (rfc) filter.rfc = rfc;
    if (folio) filter.folio = folio;
    if (status) filter.status = status;

    const transactions = await Transaction.find(filter);
    res.json(transactions);
}

exports.createTransaction = async (req, res) => {
    const { rfc, fechaRetiro, status, monto, comision } = req.body;
    const user = await User.findOne({ rfc });
    if(!user || user.status === 'LOCKED') {
        return res.status(400).json({ message: 'Usuario no encontrado o bloqueado' });
    }
    const folio = await generateFolio();
    const transaction = new Transaction({ rfc, folio, fechaRetiro, status, monto, comision });
    await transaction.save();
    res.status(201).json(transaction);
}

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    await Transaction.findByIdAndUpdate(id, { deleted: 1 });
    res.status(204).send();
}

exports.updateTransactionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const transaction = await Transaction.findById(id);
    if ( transaction.status != 'PENDING' ) {
        return res.status(400).json({ message: 'Solo se pueden actualizar transacciones PENDING'})
    }
    transaction.status = status;
    await transaction.save();
    res.json(transaction);
}