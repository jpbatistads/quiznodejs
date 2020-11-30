const express = require("express");
const app = express();
let ejs = require('ejs');
const bodyParser = require('body-parser')
const perguntaModel = require("./database/Pergunta")
//Database
const connection = require('./database/database')

/**********Connection**********/
.authenticate()
.then(()=>{
    console.log("Conexão ok")
})
.catch((msgErro)=>{
    console.log("msgErro")
})
/**********Connection**********/

//Uso do express como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));//Utilização de arquivos estáticos.
app.use(bodyParser.json());//permite lermos dados do formulário via json, muito usado com API.
app.use(bodyParser.urlencoded({extended:false}))//Decodifica os dados enviados pelo formulário.

/**********ROTAS**********/

app.get("/",(req,res)=>{
    res.render("index")//Não precisa do caminho porque o ejs vai direto na pasta view.
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar")//Não precisa do caminho porque o ejs vai direto na pasta view.
});

app.post("/salvarPerguntas",(req,res)=>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.send("Formulário Receido")//Apontar rota no frontend no action do formulário.
});






//Servidor
app.listen(8080,()=>{
    console.log("Servidor OK")//Configuração para o console.
})
