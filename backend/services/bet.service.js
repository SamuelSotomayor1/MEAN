const mongoose = require("mongoose");
const {
  createNewBet,
  deleteBetById,
  existsBet,
  getAllBets,
  updateBetById
} = require("../repositories/bet.repo");

const { BetSchema, UpdateBetSchema } = require("../utils/betValidators");

const getAllBetsService = async () => {
  const data = await getAllBets();

  if (data.length === 0) {
    const error = new Error("No se han encontrado apuestas");
    error.statusCode = 404;
    throw error;
  }

  return data;
};

const createBetService = async (req) => {
  const parsed = BetSchema.safeParse(req.body);

  if (!parsed.success) {
    const error = new Error("Error de validación");
    error.statusCode = 400;
    error.details = parsed.error.issues.map(issue => issue.message);
    throw error;
  }

  const newBet = await createNewBet(parsed.data);
  return newBet;
};

const updateBetService = async (req) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("ID inválida");
    error.statusCode = 400;
    throw error;
  }

  const exists = await existsBet(id);
  if (!exists) {
    const error = new Error("Apuesta no encontrada");
    error.statusCode = 404;
    throw error;
  }

  const parsed = UpdateBetSchema.safeParse(req.body);
  if (!parsed.success) {
    const error = new Error("Error de validación");
    error.statusCode = 400;
    error.details = parsed.error.issues.map(issue => issue.message);
    throw error;
  }

  return await updateBetById(id, parsed.data);
};

const deleteBetService = async (req) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("ID inválida");
    error.statusCode = 400;
    throw error;
  }

  const exists = await existsBet(id);
  if (!exists) {
    const error = new Error("Apuesta no encontrada");
    error.statusCode = 404;
    throw error;
  }

  return await deleteBetById(id);
};

module.exports = {
  getAllBetsService,
  createBetService,
  updateBetService,
  deleteBetService
};