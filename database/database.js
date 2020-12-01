const Sequelize = require('sequelize');

const connection = new Sequelize('quiznodejs','root','@Jp159753789',{
    host:'localhost',
    dialect:'mysql'
});//Depois de configurar exportar para utilizar em outros módulos.

module.exports = connection;