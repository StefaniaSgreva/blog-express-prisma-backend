/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
  title: {
    trim: true,
    escape: true,
    notEmpty: {
      options: { ignore_whitespace: true },
      errorMessage: "Il titolo è obbligatorio"
    },
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: "Il titolo deve contenere da 3 a 100 caratteri"
    }
  },
  slug: {
    trim: true,
    toLowerCase: true,
    notEmpty: {
      options: { ignore_whitespace: true },
      errorMessage: "Lo slug è obbligatorio"
    },
    isSlug: {
      errorMessage: "Lo Slug deve essere uno slug valido"
    },
    isLength: { 
      options: { max: 255 },
      errorMessage: "Lo slug può contenere massimo 255 caratteri"
    }
  },
  content: {
    trim: true,
    notEmpty: {
      options: { ignore_whitespace: true },
      errorMessage: "Il contenuto è obbligatorio"
    },
    isLength: {
      options: { min: 10 },
      errorMessage: "Il contenuto deve essere di almeno 10 caratteri"
    }
  },
  categoryId: {
    optional: true,
    isInt: {
      errorMessage: "Category ID deve essere un numero intero"
    },
    toInt: true
  },
  tags: {
    optional: true,
    isArray: {
      errorMessage: "Tags deve essere un array"
    }
  }
};
