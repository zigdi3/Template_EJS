/*const HomeModel = require ('../models/homeModel.js');

HomeModel.create({
titulo: 'Novo titulo',
descricao: 'novo model para testes'
}).then(dados => console.log(dados))
.catch(e => console.log(e));

*/
exports.paginaInicial = (req,res) => {
res.render('index');

};

exports.trataPost  = (req,res ) =>{
  res.send(req.body);
  return;
};

//module.exports = {paginaInicial:paginaInicial};