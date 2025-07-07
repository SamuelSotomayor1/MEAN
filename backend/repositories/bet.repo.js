const Bet = require("../models/bet");

// Obtener todas las apuestas
const getAllBets = async () => {
  return await Bet.find().sort({ date: -1 });
};

// Crear nueva apuesta
const createNewBet = async (data) => {
  const { match, amountBet, amountWon, status, date} = data;

  const newBet = new Bet({
    match,
    amountBet,
    amountWon,
    status,
    date
  });

  return await newBet.save();
};

// Verificar si existe una apuesta por ID
const existsBet = async (id) => {
  const result = await Bet.exists({ _id: id });
  return Boolean(result);
};

// Actualizar apuesta por ID
const updateBetById = async (id, data) => {
  const { match, amountBet, amountWon, status} = data;

    const updatedBet = await Bet.updateOne(
    { _id: id },
    {
        $set: {
        match,
        amountBet,
        amountWon,
        status
        }
    }
    );

  return updatedBet;
};

// Eliminar apuesta por ID
const deleteBetById = async (id) => {
  return await Bet.deleteOne({ _id: id });
};

module.exports = {
  getAllBets,
  createNewBet,
  existsBet,
  updateBetById,
  deleteBetById
};