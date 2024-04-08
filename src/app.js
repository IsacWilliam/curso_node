//const express = require('express');
import express from 'express';

const app = express();

app.get("/", function(req, res){
    res.send("Hello World!")
});

app.get("/user/:nome", function(req, res){
    res.send({
        nome: req.params.nome
    })
});


app.listen(8080, function(){
    console.log("Servidor rodando")
})
