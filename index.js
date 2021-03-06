const express = require("express");
const app = express();
let ejs = require('ejs');
const bodyParser = require('body-parser')
const Pergunta = require("./database/Pergunta")//Importação do model da tabela.
//Database
const connection = require('./database/database')
const Resposta = require("./database/Resposta")

/**********Connection**********/
connection.authenticate()
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

app.get("/",(req,res)=> {
    Pergunta.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then(pergunta =>{
        res.render("index",{
            pergunta:pergunta
        });
   });
   
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar")//Não precisa do caminho porque o ejs vai direto na pasta view.
});

app.post("/salvarpergunta",(req,res)=>{
    
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");//apos salvar redireciona para a pg principal
    });
});


app.get("/pergunta/:id",(req,res)=>{
    let id = req.params.id;
    Pergunta.findOne({
        where:{id:id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render("pergunta",{
                pergunta:pergunta
            });
        }else{
            res.redirect("/")
        }
    })
})


app.post("/responder",(req,res)=>{
var corpo = req.body.corpo;
var perguntaId = req.body.pergunta;
Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
}).then(()=>{
    res.redirect("/pergunta/"+perguntaId)
})
});


//Servidor
app.listen(8080,()=>{
    console.log("Servidor OK")//Configuração para o console.
})
