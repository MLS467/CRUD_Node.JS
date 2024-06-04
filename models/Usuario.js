const db = require('./db'); // IMPORTANDO O MÓDULO DA CONEXÃO

const Usuario = db.sequelize.define('usuario', { // DEFININDO A TABELA
    id: {
        type: db.Sequelize.INTEGER, // TIPO INTEIRO USANDO SEQUELIZE
        primaryKey: true, // CHAVE PRIMARIA
        allowNull: false, // NOT NULL
        autoIncrement: true // SERIAL
    },

    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

Usuario.sync() // FAZER A SINCRONIZAÇÃO COM O BANCO É UMA PROMISSE

module.exports = Usuario; // EXPORTANDO A TABELA USUÁRIO













