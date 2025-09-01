const { createUser, findUserByEmail, findUserByUsername, findUserById } from ('../modules/user.js');
const bcryp = require('bcrypt');
const Joi = require('Joi');
const { generateToken } = require('../utils/jwt');

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(5).require(),
  role: Joi.string().valid('patient', 'admin').required();
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(409).json({ error: error.details[0].message });

    const { username, password, role } = req.body;
    const user = await createUser(username, password, role);
    const token = generateToken({ id: user.id, username: user.username, role: user.role });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};


const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(404).json({ error: error.details[0].message });

    const { username, email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, username: user.username, role: user.role });
    res.json({ token });

  } catch (error) {
    return res.status(500).json({ error: 'Login Failed' });
  }
};

module.exports = { register, login };
