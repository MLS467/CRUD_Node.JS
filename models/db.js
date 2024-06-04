const Sequelize = require('sequelize'); // EXPORTANDO O MODULO DO SEQUELIZE COM S MAIUSCULO


const sequelize = new Sequelize('pw_node', 'root', '', { // FAZENDO A INSTANCIA DO SEQUECE S MINUSCULO
    host: '127.0.0.1', // SERVIDOR
    dialect: 'mysql', // DIALETO
    logging: false, // PARA NÃO APARECER UM MSG GIGANTE NO TERMINAL
    define: { // CONFIGURAÇÃO NO BANCO
        charset: 'utf8', // USAR CARACTERES ESPECIAIS
        collate: 'utf8_general_ci', // PADRÃO DO BD
        timestamp: true // ADD HORA E DATA NA INSERÇÃO DE DADOS E ATUALIZAÇÃO
    }
})

sequelize.authenticate() // AUTENTICAR A CONEXAO PROMISSE
    .then(() => { console.log('Conexão realizada') })
    .catch((err) => { console.log('Não foi possível se conectar ' + err) });

module.exports = { Sequelize, sequelize } // EXPORTAR OS DOIS PARA CRIAR A TABELA





















