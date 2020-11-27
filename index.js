const express = require("express");
const app = express();
let ejs = require('ejs');

//Uso do express como view engine
app.set('view engine', 'ejs');



app.get("/",(req,res)=>{
    res.render("index")//Não precisa do caminho porque o ejs vai direto na pasta view.
});

app.listen(8080,()=>{
    console.log("Servidor OK")//Configuração para o console.
})