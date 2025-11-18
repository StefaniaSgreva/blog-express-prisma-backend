const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const AuthError = require('../exceptions/AuthError');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

async function register(req, res, next) {
  try {
    const sanitizedData = matchedData(req);
    sanitizedData.password = await bcrypt.hash(sanitizedData.password, 10);

    const user = await prisma.user.create({
      data: {
        ...sanitizedData,
        role: "user", // forza sempre user
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    const token = jsonwebtoken.sign(user, JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return next(new AuthError('User not found'));

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return next(new AuthError('Invalid password'));

    const token = jsonwebtoken.sign(user, JWT_SECRET, { expiresIn: '1h' });

    // Rimuovi password dalla risposta
    delete user.password;

    res.json({ user, token });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
