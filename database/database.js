const Sequelize = require('sequelize');

const connection = new Sequelize('quiznodejs','root','suasenha',{
    host:'localhost',
    dialect:'mysql'
});//Depois de configurar exportar para utilizar em outros módulos.

module.exports = connection;