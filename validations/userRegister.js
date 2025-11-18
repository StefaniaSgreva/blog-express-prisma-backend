const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
  name: {
    in: ["body"],
    notEmpty: {
      options: {
        ignore_whitespace: true,
      },
      errorMessage: "Il nome è obbligatorio",
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: "Il nome inserito non è valido",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "L'email inserita non è valida",
    },
    notEmpty: {
      errorMessage: "L'email è obbligatoria",
    },
    custom: {
      options: async (value) => {
        // Controlla se esiste già un utente con la stessa email
        const alreadyExists = await prisma.user.findUnique({
          where: {
            email: value, // qui devi usare 'value' passato dalla validazione
          },
        });

        if (alreadyExists) {
          // Se l'email esiste già, rifiuta la validazione
          return Promise.reject("L'email inserita esiste già");
        }

        return true;
      },
    },
  },
  password: {
    in: ["body"],
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
    },
    errorMessage:
      "La password deve essere lunga almeno 8 caratteri, contenere almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale",
  }
};
