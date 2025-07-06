const { z } = require("zod");

// Para crear una nueva apuesta
const BetSchema = z.object({
  match: z.string({ required_error: "El partido es obligatorio" }).min(1, "El partido no puede estar vacío"),
  amountBet: z.number({ required_error: "La cantidad apostada es obligatoria" }).positive("Debe ser mayor a 0"),
  amountWon: z.number().nonnegative("Debe ser 0 o mayor"),
  status: z.enum(['ganado', 'perdido', 'cashout'], {
    required_error: "El estado es obligatorio"
  }),
  notes: z.string().optional(),
  date: z.coerce.date().optional() // si quieres permitir que se pase una fecha personalizada
});

// Para actualizar una apuesta (todos los campos opcionales)
const UpdateBetSchema = z.object({
  match: z.string().min(1).optional(),
  amountBet: z.number().positive().optional(),
  amountWon: z.number().nonnegative().optional(),
  status: z.enum(['ganado', 'perdido', 'cashout']).optional(),
  notes: z.string().optional(),
  date: z.coerce.date().optional()
});

module.exports = {
  BetSchema,
  UpdateBetSchema
};