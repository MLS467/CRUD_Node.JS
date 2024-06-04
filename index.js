const express = require('express');
const app = express();
const table = require('./models/Usuario');
const bodyParser = require('body-parser');
const hbs = require("express-handlebars");
const session = require('express-session');
const PORT = process.env.PORT || 3000;

// CONFIGURAÇÃO DO HANDLEBARS
app.engine('hbs', hbs.engine({ // engine é o motor
    extname: 'hbs', // configurando a extensão do handlebars
    defaultLayout: 'main' // definindo o layout padrão das páginas
})); app.set('view engine', 'hbs');

//FAZENDO O MIDDLEWARE DO BODYPARSE PARA PEGAR VALORES DO POST
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public")); //  PARA USAR SEUS CSS OU BOOTSTRAP INCORPORADOS
// DEVE APONTAR A PASTA QUE OS ARQUIVOS QUE SERÃO USADOS COMO STATICOS

//CONFIGURAÇÃO DAS SESSIONS
app.use(session({
    secret: "chave",   // Nome da hash que vai salvar as session (NÃO MUITO IMPORTANTE)
    resave: false,  // Não força a sessão ser salva toda vez
    saveUninitialized: true // padrão
}))


// ROTAS //

app.get('/', (req, res) => {
    let msgErros = req.session.erros;
    let msgSucesso = req.session.success;
    req.session.destroy();

    // if (req.session.erros) {
    //     let msgErros = req.session.erros;
    //     req.session.destroy();
    //     return res.render('index', { actCad: true, raiz: true, erros: msgErros })
    // }

    // if (req.session.success) {
    //     let msgSucesso = req.session.success;
    //     req.session.destroy();
    //     return res.render('index', { actCad: true, raiz: true, sucesso: msgSucesso })
    // }

    res.render('index', { actCad: true, raiz: true, erros: msgErros, sucesso: msgSucesso }) // passando parametros como no php dentro do html
})

app.get("/user", (req, res) => {
    res.render("user", { actUser: true });
})

app.get("/editar", (req, res) => {
    res.render("editar");
})

app.post("/cad", (req, res) => {
    // PEGAR TODOS OS CAMPOS E FAZER AS VALIDAÇÕES PARA INSERIR NO BANCO DE DADOS
    let nome = req.body.nome.trim();
    let email = req.body.email.trim();
    // VETOR DE ERROS
    let erros = [];

    console.log(req.body.email)
    if (nome.length == 0 || typeof nome == undefined || nome == null) {
        erros.push({ mensagem: "Preencha o campo Nome" });
    }

    if ((/^[\d]+$/gi.test(nome))) {
        erros.push({ mensagem: "Só letras e espaços" });
    }

    nome = nome.replace(/[!,'<>\.\*\_\d]*/gi, "");
    console.log(nome);

    nome = nome.trim();

    if (email.length == 0 || typeof email == undefined || email == null) {
        erros.push({ mensagem: "Preencha o campo email" });
    }

    if (!(/^(?=.*[a-zA-Z])(?!.*\d{8,})[\w.+_-]+@[a-zA-Z\d\-.]+\.[a-zA-Z]{2,}$/.test(email))) {
        erros.push({ mensagem: "Formato de email inválido" });
    }

    if (erros.length > 0) {
        req.session.erros = erros;
        req.session.success = false;
        return res.redirect("/");
    }


    // INSERINDO DADOS NA TABELA
    table.create({
        nome: nome,
        email: email.toLowerCase()
    })
        .then(() => {
            req.session.success = true;
            console.log("Dados inseridos com sucesso");
            return res.redirect("/");
        })
        .catch((err) => { console.log("Ops, houve um erro ->" + err) });


})

app.listen(PORT, () => { console.log(`Servidor rodando em http://localhost:${PORT}`) });