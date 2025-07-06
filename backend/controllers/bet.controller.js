
const {
  getAllBetsService,
  createBetService,
  updateBetService,
  deleteBetService
} = require("../services/bet.service");

class BetController {
  // Obtener todas las apuestas
  async getBets(req, res) {
    try {
      const bets = await getAllBetsService();
      res.status(200).json(bets);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Error del servidor" });
    }
  }

  // Crear una apuesta
  async createBet(req, res) {
    try {
      const newBet = await createBetService(req);
      res.status(201).json(newBet);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message || "Error del servidor",
        errors: error.details || []
      });
    }
  }

  // Actualizar apuesta
  async updateBet(req, res) {
    try {
      await updateBetService(req);
      res.status(204).end(); // No content
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message || "Error del servidor",
        errors: error.details || []
      });
    }
  }

  // Eliminar apuesta
  async deleteBet(req, res) {
    try {
      await deleteBetService(req);
      res.status(204).end(); // No content
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Error del servidor" });
    }
  }
}

module.exports = new BetController();