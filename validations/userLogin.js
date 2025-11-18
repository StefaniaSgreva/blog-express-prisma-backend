const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
  email: {
    in: ["body"],
    notEmpty: {
      options: { ignore_whitespace: true },
      errorMessage: "L'email è obbligatoria"
    },
    isEmail: {
      errorMessage: "L'email inserita non è valida"
    }
  },
  password: {
    in: ["body"],
    notEmpty: {
      options: { ignore_whitespace: true },
      errorMessage: "La password è obbligatoria"
    }
  }
};
