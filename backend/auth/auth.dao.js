const mongoose = require("mongoose");
const authSchema = require('./auth.model');

authSchema.statics = {
  // Crear usuario
  create: async function (data) {
    const user = new this(data);
    return await user.save(); // ✅ sin callback
  },

  // Login (buscar usuario)
  login: async function (query) {
    return await this.find(query); // ✅ sin callback
  }
};

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;