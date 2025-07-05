const User = require("./auth.dao");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "secretkey123456";

exports.createUser = async (req, res, next) => {
    try {
        const newUser = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        };

        // Espera a que se cree el usuario, sin callback
        const user = await User.create(newUser);

        const expiresIn = 24 * 60 * 60;

        const accessToken = jwt.sign(
            { email: user.email },
            SECRET_KEY,
            { expiresIn }
        );

        const dataUser = {
            email: user.email,
            accessToken,
            expiresIn
        };

        return res.status(201).json({ dataUser });
    } catch (err) {
        console.error('Error al crear usuario:', err);
        return res.status(500).json({ message: 'Error al crear usuario', error: err });
    }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: 'Usuario no encontrado' });
    }

    // Comparar contraseña enviada con la guardada (hasheada)
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(409).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn });

    // Responder con datos del usuario y token
    return res.status(200).json({
      email: user.email,
      accessToken,
      expiresIn,
    });
  } catch (error) {
    console.error('Error en loginUser:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};