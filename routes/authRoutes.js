const express = require('express');
const { Router } = require('express');
const router = Router();
const authController = require("../controllers/authController");
const validate = require('../middlewares/schemaValidator'); // Middleware helper che esporta un array di funzioni (checkSchema + checkValidity)
const userRegister = require("../validations/userRegister");
const userLogin = require("../validations/userLogin");

router.post("/register", ...validate(userRegister), authController.register);
router.post("/login", ...validate(userLogin), authController.login);

module.exports = router;
