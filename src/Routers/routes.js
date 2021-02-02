const express = require('express');
const router = express.Router();
const homeController = require("../Controllers/homeController");
const contatoController = require("../Controllers/contatoController");

//rotas da home
router.get('/', homeController.paginaInicial); 
router.post('/', homeController.trataPost);

//Rotas de contato
router.get('/contato', contatoController.paginaInicial);

module.exports = router;

  
  
  
  