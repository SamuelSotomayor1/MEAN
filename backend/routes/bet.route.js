const express = require("express");
const router = express.Router();
const BetController = require("../controllers/bet.controller");

router.get("/", BetController.getBets);
router.post("/", BetController.createBet);
router.put("/:id", BetController.updateBet);
router.delete("/:id", BetController.deleteBet);

module.exports = router;